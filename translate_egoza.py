#!/usr/bin/env python3
"""
Translate EGOZA.pdf from English to Russian while preserving layout.
Uses pymupdf: redacts original text, inserts Russian translation in the same positions.
"""

import fitz  # pymupdf
import os

# ── Cyrillic-capable font paths ───────────────────────────────────────────────
FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD    = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

# ── Translation dictionary (English → Russian) ────────────────────────────────
# Keys must match the PDF span text EXACTLY (including spaces / punctuation).
TRANSLATIONS = {
    # ── Page 1 / 2  About Us ────────────────────────────────────────────────
    "ABOUT US": "О НАС",
    "ABOUT": "О",
    "US": "НАС",
    "Scan for more information": "Сканируйте для получения информации",
    "Scan for more information ": "Сканируйте для получения информации",

    "Our company is a leading manufacturer of high-quality EgozaTM razor wire and offers a wide range of razor wire barriers of various types and designs.":
        "Наша компания является ведущим производителем высококачественной колючей проволоки Egoza™ и предлагает широкий ассортимент барьеров из колючей проволоки различных типов и конструкций.",

    "Our company is a leading manufacturer of high-quality Egoza™ razor wire and offers a wide range of razor wire barriers of \nvarious types and designs. ":
        "Наша компания является ведущим производителем высококачественной колючей проволоки Egoza™ и предлагает широкий ассортимент барьеров из колючей проволоки различных типов и конструкций.",

    "Our company is a leading manufacturer of high-quality Egoza™ razor wire and offers a wide range of razor wire barriers of various types and designs.":
        "Наша компания является ведущим производителем высококачественной колючей проволоки Egoza™ и предлагает широкий ассортимент барьеров из колючей проволоки различных типов и конструкций.",

    "The company has a full cycle of razor wire barrier production - we produce all components for the manufacture of security barriers from razor wire. We produce several types of razor tape, based on which we produce 10 types of razor wire, differing in diameter and blade length.":
        "Компания имеет полный цикл производства барьеров из колючей проволоки — мы производим все компоненты для изготовления охранных барьеров из колючей проволоки. Мы производим несколько типов бритвенной ленты, на основе которой выпускаем 10 типов колючей проволоки, различающихся диаметром и длиной лезвия.",

    "Based on our razor wire, we mass-produce:":
        "На основе нашей колючей проволоки мы серийно производим:",

    "70 sizes of Egoza™ concertina barriers":
        "70 размеров концертинных барьеров Egoza™",

    "16 types of Egoza™ flat barriers":
        "16 типов плоских барьеров Egoza™",

    "6 types of Egoza™ razor mesh":
        "6 типов бритвенной сетки Egoza™",

    "6 types of Egoza™ single coil barriers":
        "6 типов однорядных барьеров Egoza™",

    "But the main advantage of our production is its scalability - thanks to the automated process of manufacturing components and protective barriers, we can produce razor wire and spiral barriers in almost any volumes required by the customer. In addition, the range of barriers is not limited to serially produced products - we can produce any type of razor wire and any type of barriers with the parameters required by the customer.":
        "Но главным преимуществом нашего производства является его масштабируемость — благодаря автоматизированному процессу изготовления компонентов и защитных барьеров, мы можем производить колючую проволоку и спиральные барьеры практически в любых объёмах, необходимых заказчику. Кроме того, ассортимент барьеров не ограничивается серийно выпускаемой продукцией — мы можем производить любой тип колючей проволоки и любой тип барьеров с параметрами, требуемыми заказчиком.",

    "For example, the maximum diameter of spiral barriers produced serially is 1700 mm, but if necessary, we can produce barriers with a diameter of up to 2500 mm if there is a need for such barriers. We can also produce razor wire based on a core of an even larger diameter - it can be up to 3.8 mm.":
        "Например, максимальный диаметр серийно производимых спиральных барьеров составляет 1700 мм, но при необходимости мы можем изготовить барьеры диаметром до 2500 мм. Мы также можем производить колючую проволоку на основе сердечника ещё большего диаметра — до 3,8 мм.",

    "Or another example - all razor wire is made of galvanized wire and galvanized steel, but upon request it is possible to manufacture such products from stainless steel. In other words, we are always open to cooperation and are ready to fulfill orders for the production of both standard and non-standard types of razor wire barriers.":
        "Или другой пример — вся колючая проволока изготавливается из оцинкованной проволоки и оцинкованной стали, но по запросу возможно изготовление такой продукции из нержавеющей стали. Иными словами, мы всегда открыты для сотрудничества и готовы выполнять заказы на производство как стандартных, так и нестандартных типов барьеров из колючей проволоки.",

    # ── Page 3  Trademark ────────────────────────────────────────────────────
    "EGOZA TRADEMARK": "ТОВАРНЫЙ ЗНАК EGOZA",

    "We sell and advertise our products under the well-known trademark Egoza. The owner of the rights to the trademark Egoza is the Ukrainian inventor and businessman Yuri V. Tkachenko, from whom we have all the permits allowing us to use the trademark Egoza in our commercial activities.":
        "Мы продаём и рекламируем нашу продукцию под известным товарным знаком Egoza. Правообладателем товарного знака Egoza является украинский изобретатель и предприниматель Юрий В. Ткаченко, от которого мы получили все разрешения, позволяющие использовать товарный знак Egoza в нашей коммерческой деятельности.",

    "The Egoza trademark is registered under the Madrid system in 99 countries worldwide. Full information about this trademark can be found on the official website www.wipo.int (World Intellectual Property Organization), using the links in the QR codes:":
        "Товарный знак Egoza зарегистрирован по Мадридской системе в 99 странах мира. Полную информацию об этом товарном знаке можно найти на официальном сайте www.wipo.int (Всемирная организация интеллектуальной собственности), перейдя по ссылкам в QR-кодах:",

    "THE EGOZA TRADEMARK IS REGISTERED UNDER THE MADRID SYSTEM IN 99 COUNTRIES WORLDWIDE":
        "ТОВАРНЫЙ ЗНАК EGOZA ЗАРЕГИСТРИРОВАН ПО МАДРИДСКОЙ СИСТЕМЕ В 99 СТРАНАХ МИРА",

    "The Egoza trademark is registered under the Madrid system (No. 1180273 Cyrillic and No. 1227050 Latin) in a total of 99 countries:":
        "Товарный знак Egoza зарегистрирован по Мадридской системе (№ 1180273 кириллица и № 1227050 латиница) в общей сложности в 99 странах:",

    "using the links in the QR codes:": "перейдя по ссылкам в QR-кодах:",

    # ── Page 4-5  Razor Wire ─────────────────────────────────────────────────
    "Egoza ™ Razor Wire": "Колючая проволока Egoza™",
    "Egoza™ Razor Wire": "Колючая проволока Egoza™",

    "Egoza™ razor wire is used for fencing an area in one or several threads, as well as for the manufacture of any type of razor wire barriers.":
        "Колючая проволока Egoza™ используется для ограждения территории в один или несколько рядов, а также для производства заградительных барьеров любого типа.",

    "EgozaTM razor wire is used for fencing an area in one or several threads, as well as for the manufacture of\nany type of razor wire barriers.":
        "Колючая проволока Egoza™ используется для ограждения территории в один или несколько рядов, а также для производства заградительных барьеров любого типа.",

    "EgozaTM razor wire is": "Колючая проволока Egoza™",
    "Egoza™ razor wire is": "Колючая проволока Egoza™",

    "used for fencing an area in one or several threads, as well as for the manufacture of":
        "используется для ограждения территории в один или несколько рядов, а также для производства",

    "any type of razor wire barriers.": "заградительных барьеров любого типа.",

    # Table headers – razor wire
    "Razor wire type": "Тип колючей проволоки",
    "Core diameter A, mm": "Диаметр сердечника A, мм",
    "Razor wire diameter B, mm": "Диаметр колючей проволоки B, мм",
    "Blade pitch C, mm": "Шаг лезвия C, мм",
    "Blade length D, mm": "Длина лезвия D, мм",
    "Blade thickness E, mm": "Толщина лезвия E, мм",

    # Info boxes
    "STEEL WIRE": "СТАЛЬНАЯ ПРОВОЛОКА",
    "Spring zinc coated wire EN 50189": "Пружинная проволока с цинковым покрытием EN 50189",
    "Hot dip zinc coating min 80-100 g/m2": "Горячее цинкование мин. 80–100 г/м²",
    "Hot dip zinc coating min 80 g/m2": "Горячее цинкование мин. 80 г/м²",
    "Hot dip zinc coating min 100 g/m2": "Горячее цинкование мин. 100 г/м²",
    "Tensile strength 1600 MPa": "Предел прочности на разрыв 1600 МПа",
    "RAZOR TAPE": "БРИТВЕННАЯ ЛЕНТА",
    "Zinc coated steel EN 10346": "Сталь с цинковым покрытием EN 10346",
    "Hot dip zinc coating per side min 140-290 g/m2": "Горячее цинкование с каждой стороны мин. 140–290 г/м²",
    "Hot dip zinc coating per side\nmin 140-290 g/m2": "Горячее цинкование с каждой стороны\nмин. 140–290 г/м²",

    # ── Page 6  Concertina overview ──────────────────────────────────────────
    "EGOZA ™ CONCERTINA BARRIER": "КОНЦЕРТИННЫЙ БАРЬЕР EGOZA™",
    "EGOZA™ CONCERTINA BARRIER": "КОНЦЕРТИННЫЙ БАРЬЕР EGOZA™",

    "Egoza™ concertina barrier is the most common and demanded type of razor wire barriers by consumers.":
        "Концертинный барьер Egoza™ является наиболее распространённым и востребованным потребителями типом барьеров из колючей проволоки.",

    "For this reason, the main type of product manufactured by our company is this type of barrier. We produce one of the widest ranges of concertina barriers in Europe - 70 types of concertina barriers and 10 different types of razor wire are mass-produced.":
        "По этой причине основным типом продукции, производимой нашей компанией, является данный тип барьера. Мы производим один из наиболее широких ассортиментов концертинных барьеров в Европе — серийно выпускается 70 типов концертинных барьеров и 10 различных видов колючей проволоки.",

    "The thickness of the razor wire core from which concertina barriers are made ranges from 1.8 to 3.2 mm, razor tape with a thickness of 0.45 to 0.55 mm and blade lengths of 10 to 22 mm can be used in the design of concertina barriers, and the concertina diameter ranges from 400 to 1700 mm.":
        "Толщина сердечника колючей проволоки, из которой изготавливаются концертинные барьеры, варьируется от 1,8 до 3,2 мм; в конструкции концертинных барьеров может использоваться бритвенная лента толщиной от 0,45 до 0,55 мм и длиной лезвия от 10 до 22 мм, а диаметр концертины составляет от 400 до 1700 мм.",

    "Five different groups of Egoza™ concertina barriers with different core diameters are mass-produced:":
        "Серийно производятся пять различных групп концертинных барьеров Egoza™ с разными диаметрами сердечника:",

    # Combined block (some PDF readers merge these two paragraphs into one block)
    "Five different groups of Egoza™ concertina barriers with different core diameters are mass-produced: In addition, a concertina barrier based on the same core diameter can be equipped with a razor wire with blades of different lengths. All razor wire and connecting clips included in the design of concertina barriers are made of rolled steel and steel wire with a high-quality zinc coating, ensuring a long service life of concertina barriers even in difficult natural conditions.":
        "Серийно производятся пять различных групп концертинных барьеров Egoza™ с разными диаметрами сердечника:\n\nКроме того, концертинный барьер на основе одинакового диаметра сердечника может быть оснащён колючей проволокой с лезвиями разной длины. Вся колючая проволока и соединительные скобы, входящие в конструкцию концертинных барьеров, изготавливаются из катаной стали и стальной проволоки с высококачественным цинковым покрытием, что обеспечивает длительный срок службы концертинных барьеров даже в сложных природных условиях.",

    "In addition, a concertina barrier based on the same core diameter can be equipped with a razor wire with  blades of different lengths. All razor wire and connecting clips included in the design of concertina barriers  are made of rolled steel and steel wire with a high-quality zinc coating, ensuring a long service life of  concertina barriers even in difficult natural conditions.":
        "Кроме того, концертинный барьер на основе одинакового диаметра сердечника может быть оснащён колючей проволокой с лезвиями разной длины. Вся колючая проволока и соединительные скобы, входящие в конструкцию концертинных барьеров, изготавливаются из катаной стали и стальной проволоки с высококачественным цинковым покрытием, что обеспечивает длительный срок службы концертинных барьеров даже в сложных природных условиях.",

    # Same text but with fi-ligature in "difficult" (as stored in original PDF)
    "In addition, a concertina barrier based on the same core diameter can be equipped with a razor wire with  blades of different lengths. All razor wire and connecting clips included in the design of concertina barriers  are made of rolled steel and steel wire with a high-quality zinc coating, ensuring a long service life of  concertina barriers even in difﬁcult natural conditions.":
        "Кроме того, концертинный барьер на основе одинакового диаметра сердечника может быть оснащён колючей проволокой с лезвиями разной длины. Вся колючая проволока и соединительные скобы, входящие в конструкцию концертинных барьеров, изготавливаются из катаной стали и стальной проволоки с высококачественным цинковым покрытием, что обеспечивает длительный срок службы концертинных барьеров даже в сложных природных условиях.",

    "In addition, a concertina barrier based on \nthe same core diameter can be equipped \nwith a razor wire with  blades of different \nlengths. All razor wire and connecting \nclips included in the design of concertina \nbarriers  are made of rolled steel and steel \nwire with a high-quality zinc coating, \nensuring a long service life of  concertina \nbarriers even in difficult natural \nconditions.":
        "Кроме того, концертинный барьер на основе одинакового диаметра сердечника может быть оснащён колючей проволокой с лезвиями разной длины. Вся колючая проволока и соединительные скобы, входящие в конструкцию концертинных барьеров, изготавливаются из катаной стали и стальной проволоки с высококачественным цинковым покрытием, что обеспечивает длительный срок службы концертинных барьеров даже в сложных природных условиях.",

    # ── Pages 7-16  Individual concertina specs ───────────────────────────────
    "EGOZA-1.8 CONCERTINA BARRIER": "КОНЦЕРТИННЫЙ БАРЬЕР EGOZA-1.8",
    "EGOZA-2.2CONCERTINA BARRIER": "КОНЦЕРТИННЫЙ БАРЬЕР EGOZA-2.2",
    "EGOZA-2.5CONCERTINA BARRIER": "КОНЦЕРТИННЫЙ БАРЬЕР EGOZA-2.5",
    "EGOZA-2.8CONCERTINA BARRIER": "КОНЦЕРТИННЫЙ БАРЬЕР EGOZA-2.8",
    "EGOZA-3.2CONCERTINA BARRIER": "КОНЦЕРТИННЫЙ БАРЬЕР EGOZA-3.2",

    # Repeated description per page (1.8 mm variant)
    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns of which are connected to  each other with clips. The Egoza concertina barrier is made of Egoza razor wire with a core diameter of 1.8  mm.":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 1,8 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns of which are connected to each other \nwith clips. The Egoza concertina barrier is made of Egoza razor wire with a core diameter of 1.8 mm. ":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 1,8 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns of which are connected to each other with clips. The Egoza concertina barrier is made of Egoza razor wire with a core diameter of 1.8 mm.":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 1,8 мм.",

    "T he Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns of which are connected to  each other with clips. The Egoza concertina barrier is made of Egoza razor wire with a core diameter of 1.8  mm.":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 1,8 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns \nof which are connected to each other with clips. The Egoza concertina barrier \nis made of Egoza razor wire with a core diameter of 1.8 mm.":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 1,8 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns of which are connected to each other \nwith clips. The Egoza concertina barrier is made of Egoza razor wire with a core diameter of 1.8  mm.":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 1,8 мм.",

    # Sidebar version (narrow column)
    "The Egoza™ concertina barrier is a \ncoil of Egoza razor wire, the adjacent \nturns of which are connected to each \nother with clips. The Egoza concertina \nbarrier is made of Egoza razor wire \nwith a core diameter of 1.8 mm.":
        "Концертинный барьер Egoza™ — спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Изготавливается из колючей проволоки Egoza с диаметром сердечника 1,8 мм.",

    # 2.2 mm
    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns of which are connected to  each other with clips. The Egoza concertina barrier is made of Egoza razor wire with a core diameter of 2.2  mm.":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,2 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns of which are connected to each other \nwith clips. The Egoza concertina barrier is made of Egoza razor wire with a core diameter of 2.2 mm.":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,2 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns of which are connected to each other with clips. The Egoza concertina barrier is made of Egoza razor wire with a core diameter of 2.2 mm.":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,2 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns of which are connected to each other with clips. The Egoza concertina barrier is made of Egoza razor wire with a core diameter of 2.2  mm.":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,2 мм.",

    "**The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns of which are connected to  each other with clips. The Egoza concertina barrier is made of Egoza razor wire with a core diameter of 2.2  mm.":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,2 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns \nof which are connected to each other with clips. The Egoza concertina barrier \nis made of Egoza razor wire with a core diameter of 2.2 mm.":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,2 мм.",

    "The Egoza™ concertina barrier is a \ncoil of Egoza razor wire, the \nadjacent turns of which are \nconnected to each other with clips. \nThe Egoza concertina barrier is \nmade of Egoza razor wire with a \ncore diameter of 2.2 mm.":
        "Концертинный барьер Egoza™ — спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Изготавливается из колючей проволоки Egoza с диаметром сердечника 2,2 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns \nof which are connected to  each other with clips. The Egoza concertina barrier \nis made of Egoza razor wire with a core diameter of 2.2  mm.":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,2 мм.",

    # 2.5 mm
    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns of which are connected to  each other with clips. The Egoza concertina barrier is made of Egoza razor wire with a core diameter of 2.5  mm.":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,5 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns of which are connected to each other \nwith clips. The Egoza concertina barrier is made of Egoza razor wire with a core diameter of 2.5 mm. ":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,5 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns of which are connected to each other with clips. The Egoza concertina barrier is made of Egoza razor wire with a core diameter of 2.5 mm.":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,5 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns \nof which are connected to each other with clips. The Egoza concertina barrier \nis made of Egoza razor wire with a core diameter of 2.5 mm.":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,5 мм.",

    "The Egoza™ concertina barrier is a \ncoil of Egoza razor wire, the adjacent \nturns of which are connected to each \nother with clips. The Egoza concertina \nbarrier is made of Egoza razor wire \nwith a core diameter of 2.5 mm.":
        "Концертинный барьер Egoza™ — спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Изготавливается из колючей проволоки Egoza с диаметром сердечника 2,5 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns \nof which are connected to  each other with clips. The Egoza concertina barrier \nis made of Egoza razor wire with a core diameter of 2.5  mm.":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,5 мм.",

    # 2.8 mm
    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns of which are connected to  each other with clips. The Egoza concertina barrier is made of Egoza razor wire with a core diameter of 2.8  mm.":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,8 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns of which are connected to each other \nwith clips. The Egoza concertina barrier is made of Egoza razor wire with a core diameter of 2.8 mm. ":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,8 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns of which are connected to each other with clips. The Egoza concertina barrier is made of Egoza razor wire with a core diameter of 2.8 mm.":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,8 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns \nof which are connected to each other with clips. The Egoza concertina barrier \nis made of Egoza razor wire with a core diameter of 2.8 mm.":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,8 мм.",

    "The Egoza™ concertina barrier is a \ncoil of Egoza razor wire, the adjacent \nturns of which are connected to each \nother with clips. The Egoza concertina \nbarrier is made of Egoza razor wire \nwith a core diameter of 1.8 mm.":
        "Концертинный барьер Egoza™ — спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Изготавливается из колючей проволоки Egoza с диаметром сердечника 2,8 мм.",

    # 3.2 mm
    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns of which are connected to  each other with clips. The Egoza concertina barrier is made of Egoza razor wire with a core diameter of 3.2  mm.":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 3,2 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns of which are connected to each other \nwith clips. The Egoza concertina barrier is made of Egoza razor wire with a core diameter of 3.2 mm. ":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 3,2 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns of which are connected to each other with clips. The Egoza concertina barrier is made of Egoza razor wire with a core diameter of 3.2 mm.":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 3,2 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the \nadjacent turns of which are connected to  each other with clips. The \nEgoza concertina barrier is made of Egoza razor wire with a core \ndiameter of 3.2 mm.":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 3,2 мм.",

    "The Egoza™ concertina barrier is a \ncoil of Egoza razor wire, the adjacent \nturns of which are connected to each \nother with clips. The Egoza concertina \nbarrier is made of Egoza razor wire \nwith a core diameter of 3.2 mm.":
        "Концертинный барьер Egoza™ — спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Изготавливается из колючей проволоки Egoza с диаметром сердечника 3,2 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns \nof which are connected to  each other with clips. The Egoza concertina barrier \nis made of Egoza razor wire with a core diameter of 3.2  mm.":
        "Концертинный барьер Egoza™ представляет собой спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Концертинный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 3,2 мм.",

    # Spec titles
    "Specification of Egoza-1.8 Concertina Barrier": "Спецификация концертинного барьера Egoza-1.8",
    "Specification of Egoza-2.2 Concertina Barrier": "Спецификация концертинного барьера Egoza-2.2",
    "Specification of Egoza-2.5 Concertina Barrier": "Спецификация концертинного барьера Egoza-2.5",
    "Specification of Egoza-2.8 Concertina Barrier": "Спецификация концертинного барьера Egoza-2.8",
    "Specification of Egoza-3.2 Concertina Barrier": "Спецификация концертинного барьера Egoza-3.2",
    "Specification of Egoza Razor Wire": "Спецификация колючей проволоки Egoza",

    # Concertina table headers
    "Concertina barrier type": "Тип концертинного барьера",
    "Coil  diameter D1, mm": "Диаметр витка D1, мм",
    "Coil diameter D1, mm": "Диаметр витка D1, мм",
    "Concertina diameter D2,\nmm": "Диаметр концертины D2,\nмм",
    "Concertina diameter  D2,\nmm": "Диаметр концертины D2,\nмм",
    "Concertina\ndiameter D2,\nmm": "Диаметр\nконцертины D2,\nмм",
    "Connecting\nclips N, pcs.": "Соединительные\nскобы N, шт.",
    "Connecting clips N, pcs.": "Соединительные скобы N, шт.",
    "Concertina\nlength L, m": "Длина\nконцертины L, м",
    "Concertina length L, m": "Длина концертины L, м",
    "Core  diameter\nd,  mm": "Диаметр\nсердечника d, мм",
    "Core diameter\nd, mm": "Диаметр сердечника\nd, мм",
    "Core  diameter d,  mm": "Диаметр сердечника d, мм",
    "Blade  thickness\nS,  mm": "Толщина лезвия\nS, мм",
    "Blade thickness\nS, mm": "Толщина лезвия\nS, мм",
    "Blade  thickness S,  mm": "Толщина лезвия S, мм",
    "barrier type": "тип барьера",
    "Concertina\nbarrier  type": "Тип\nконцертинного барьера",
    "Concertina\nbarrier type": "Тип\nконцертинного барьера",

    # ── Pages 17-18  Single Coil ─────────────────────────────────────────────
    "EGOZA SINGLE COIL BARRIER": "ОДНОРЯДНЫЙ БАРЬЕР EGOZA",

    "The Egoza™ single coil barrier is a more economical, yet effective, version of the concertina barrier, the  design of which does not include connecting clips. The Egoza single coil barrier is made of Egoza razor wire  with a core diameter of 2.2, 2.5 and 2.8 mm.":
        "Однорядный барьер Egoza™ является более экономичным, но не менее эффективным вариантом концертинного барьера, в конструкцию которого не входят соединительные скобы. Однорядный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,2, 2,5 и 2,8 мм.",

    "The Egoza™ single coil barrier is a more economical, yet effective, version of the concertina barrier, the design of \nwhich does not include connecting clips. The Egoza single coil barrier is made of Egoza razor wire  with a core \ndiameter of 2.2, 2.5 and 2.8 mm.":
        "Однорядный барьер Egoza™ является более экономичным, но не менее эффективным вариантом концертинного барьера, в конструкцию которого не входят соединительные скобы. Однорядный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,2, 2,5 и 2,8 мм.",

    "The Egoza™ single coil barrier is a more economical, yet effective, version of the concertina barrier, the design of which does not include connecting clips. The Egoza single coil barrier is made of Egoza razor wire with a core diameter of 2.2, 2.5 and 2.8 mm.":
        "Однорядный барьер Egoza™ является более экономичным, но не менее эффективным вариантом концертинного барьера, в конструкцию которого не входят соединительные скобы. Однорядный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,2, 2,5 и 2,8 мм.",

    "The Egoza™ single coil barrier is a more economical, yet effective, \nversion of the concertina barrier, the  design of which does not include \nconnecting clips. The Egoza single coil barrier is made of Egoza razor \nwire  with a core diameter of 2.2, 2.5 and 2.8 mm.":
        "Однорядный барьер Egoza™ является более экономичным, но не менее эффективным вариантом концертинного барьера, в конструкцию которого не входят соединительные скобы. Однорядный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,2, 2,5 и 2,8 мм.",

    "The Egoza™ single coil barrier is a more economical, yet effective, \nversion of the concertina barrier, the design of which does not include \nconnecting clips. The Egoza single coil barrier is made of Egoza razor \nwire  with a core diameter of 2.2, 2.5 and 2.8 mm.":
        "Однорядный барьер Egoza™ является более экономичным, но не менее эффективным вариантом концертинного барьера, в конструкцию которого не входят соединительные скобы. Однорядный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,2, 2,5 и 2,8 мм.",

    "The Egoza™ single coil barrier is a more economical, yet effective, version of the concertina barrier,  the  design of which does not include connecting clips. The Egoza single coil barrier is made of Egoza razor wire  with a core diameter of 2.2, 2.5 and 2.8 mm.":
        "Однорядный барьер Egoza™ является более экономичным, но не менее эффективным вариантом концертинного барьера, в конструкцию которого не входят соединительные скобы. Однорядный барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,2, 2,5 и 2,8 мм.",

    "Specification of Egoza Single Coil Barrier": "Спецификация однорядного барьера Egoza",

    # Single coil table headers
    "Single coil\nbarrier type": "Тип однорядного\nбарьера",
    "Single coil barrier type": "Тип однорядного барьера",
    "Number of\nturns N,  pcs.": "Количество\nвитков N, шт.",
    "Number of turns N,  pcs.": "Количество витков N, шт.",
    "Number of turns N, pcs.": "Количество витков N, шт.",
    "Barrier\ndiameter D2,\nmm": "Диаметр\nбарьера D2,\nмм",
    "Barrier diameter D2,\nmm": "Диаметр барьера D2,\nмм",
    "Barrier\nlength L, m": "Длина\nбарьера L, м",
    "Barrier length\nL, m": "Длина барьера\nL, м",
    "Barrier length L, m": "Длина барьера L, м",
    "Core  diameter\nd,  mm": "Диаметр\nсердечника d, мм",
    "Core diameter d,  mm": "Диаметр сердечника d, мм",

    # ── Pages 19-20  Flat Barrier ────────────────────────────────────────────
    "EGOZA FLAT BARRIER": "ПЛОСКИЙ БАРЬЕР EGOZA",

    "The Egoza™ flat barrier is an economical and compact version of the Egoza razor wire barrier for urban  conditions, which has a less aggressive appearance than the concertina barrier. The Egoza flat barrier is  made of Egoza razor wire with a core diameter of 2.2, 2.5, 2.8 and 3.2 mm.":
        "Плоский барьер Egoza™ является экономичным и компактным вариантом барьера из колючей проволоки Egoza для городских условий, который имеет менее агрессивный вид по сравнению с концертинным барьером. Плоский барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,2, 2,5, 2,8 и 3,2 мм.",

    "The Egoza™ flat barrier is an economical and compact version of the Egoza razor wire barrier for urban conditions, \nwhich has a less aggressive appearance than the concertina barrier. The Egoza flat barrier is  made of Egoza razor \nwire with a core diameter of 2.2, 2.5, 2.8 and 3.2 mm.":
        "Плоский барьер Egoza™ является экономичным и компактным вариантом барьера из колючей проволоки Egoza для городских условий, который имеет менее агрессивный вид по сравнению с концертинным барьером. Плоский барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,2, 2,5, 2,8 и 3,2 мм.",

    "The Egoza™ flat barrier is an economical and compact version of the Egoza razor wire barrier for urban conditions, which has a less aggressive appearance than the concertina barrier. The Egoza flat barrier is made of Egoza razor wire with a core diameter of 2.2, 2.5, 2.8 and 3.2 mm.":
        "Плоский барьер Egoza™ является экономичным и компактным вариантом барьера из колючей проволоки Egoza для городских условий, который имеет менее агрессивный вид по сравнению с концертинным барьером. Плоский барьер Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,2, 2,5, 2,8 и 3,2 мм.",

    "Specification of Egoza Flat Barrier": "Спецификация плоского барьера Egoza",

    # Flat barrier table headers
    "Flat barrier\ntype": "Тип плоского\nбарьера",
    "Flat barrier type": "Тип плоского барьера",
    "Barrier height\nH, m": "Высота барьера\nH, м",
    "Barrier height H, m": "Высота барьера H, м",
    "Barrier length L, m": "Длина барьера L, м",
    "Core diameter\nd,  mm": "Диаметр сердечника\nd, мм",
    "Core diameter d,  mm": "Диаметр сердечника d, мм",
    "Blade\nthickness S,\nmm": "Толщина\nлезвия S,\nмм",
    "Blade thickness S,\nmm": "Толщина лезвия S,\nмм",

    # ── Page 21  Razor Mesh ──────────────────────────────────────────────────
    "EGOZA RAZOR MESH": "БРИТВЕННАЯ СЕТКА EGOZA",

    "The Egoza™ razor mesh is a specially developed type of Egoza flat barrier, intended for the manufacture of  fences or to increase the protective properties of existing fences of any type. One of the advantages is the  ability to obtain a mesh of any length without joints. The Egoza razor mesh is made of Egoza razor wire with  a core diameter of 2.8 and mm.":
        "Бритвенная сетка Egoza™ является специально разработанным типом плоского барьера Egoza, предназначенным для изготовления заграждений или увеличения защитных свойств существующих заграждений любого типа. Одним из преимуществ является возможность получения сетки любой длины без стыков. Бритвенная сетка Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,8 мм.",

    "The Egoza™ razor mesh is a specially developed type of Egoza flat barrier, intended for the manufacture of fences or to increase the \nprotective properties of existing fences of any type. One of the advantages is the  ability to obtain a mesh of any length without joints. The \nEgoza razor mesh is made of Egoza razor wire with  a core diameter of 2.8 and mm.":
        "Бритвенная сетка Egoza™ является специально разработанным типом плоского барьера Egoza, предназначенным для изготовления заграждений или увеличения защитных свойств существующих заграждений любого типа. Одним из преимуществ является возможность получения сетки любой длины без стыков. Бритвенная сетка Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,8 мм.",

    "The Egoza™ razor mesh is a specially developed type of Egoza flat barrier, intended for the manufacture of fences or to increase the protective properties of existing fences of any type. One of the advantages is the ability to obtain a mesh of any length without joints. The Egoza razor mesh is made of Egoza razor wire with a core diameter of 2.8 and mm.":
        "Бритвенная сетка Egoza™ является специально разработанным типом плоского барьера Egoza, предназначенным для изготовления заграждений или увеличения защитных свойств существующих заграждений любого типа. Одним из преимуществ является возможность получения сетки любой длины без стыков. Бритвенная сетка Egoza изготавливается из колючей проволоки Egoza с диаметром сердечника 2,8 мм.",

    # Razor mesh table headers
    "Razor mesh\ntype": "Тип бритвенной\nсетки",
    "Razor mesh type": "Тип бритвенной сетки",
    "Barrier length\nL,  m": "Длина барьера\nL, м",
    "Barrier height\nH,  m": "Высота барьера\nH, м",
    "Barrier height H,  m": "Высота барьера H, м",
    "Core diameter\nd,  mm": "Диаметр сердечника\nd, мм",

    # ── Sidebar small-print repeats ──────────────────────────────────────────
    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns \nof which are connected to  each other with clips. The Egoza concertina barrier \nis made of Egoza razor wire with a core diameter of 1.8  mm.":
        "Концертинный барьер Egoza™ — спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Изготавливается из колючей проволоки Egoza с диаметром сердечника 1,8 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns\nof which are connected to  each other with clips. The Egoza concertina barrier \nis made of Egoza razor wire with a core diameter of 2.2  mm.":
        "Концертинный барьер Egoza™ — спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Изготавливается из колючей проволоки Egoza с диаметром сердечника 2,2 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns\nof which are connected to  each other with clips. The Egoza concertina barrier \nis made of Egoza razor wire with a core diameter of 2.5  mm.":
        "Концертинный барьер Egoza™ — спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Изготавливается из колючей проволоки Egoza с диаметром сердечника 2,5 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns\nof which are connected to  each other with clips. The Egoza concertina barrier \nis made of Egoza razor wire with a core diameter of 2.8  mm.":
        "Концертинный барьер Egoza™ — спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Изготавливается из колючей проволоки Egoza с диаметром сердечника 2,8 мм.",

    "The Egoza™ concertina barrier is a coil of Egoza razor wire, the adjacent turns\nof which are connected to  each other with clips. The Egoza concertina barrier \nis made of Egoza razor wire with a core diameter of 3.2  mm.":
        "Концертинный барьер Egoza™ — спираль колючей проволоки Egoza, смежные витки которой соединены скобами. Изготавливается из колючей проволоки Egoza с диаметром сердечника 3,2 мм.",

    "The Egoza™ single coil barrier is a more economical, yet effective, \nversion of the concertina barrier, the design of which does not include \nconnecting clips. The Egoza single coil barrier is made of Egoza razor \nwire  with a core diameter of 2.2, 2.5 and 2.8  mm.":
        "Однорядный барьер Egoza™ является более экономичным, но не менее эффективным вариантом концертинного барьера, в конструкцию которого не входят соединительные скобы. Изготавливается из колючей проволоки Egoza с диаметром сердечника 2,2, 2,5 и 2,8 мм.",

    "The Egoza™ razor mesh is a specially developed type of Egoza flat \nbarrier, intended for the manufacture of  fences or to increase the protective \nproperties of existing fences of any type. One of the advantages is the \nability to obtain a mesh of any length without joints. The Egoza razor mesh \nis made of Egoza razor wire with  a core diameter of 2.8 and mm.":
        "Бритвенная сетка Egoza™ — специально разработанный тип плоского барьера Egoza, предназначенный для изготовления заграждений или увеличения защитных свойств существующих заграждений любого типа. Одним из преимуществ является возможность получения сетки любой длины без стыков. Изготавливается из колючей проволоки Egoza с диаметром сердечника 2,8 мм.",
}

# ── Helper functions ──────────────────────────────────────────────────────────

def color_int_to_rgb(color_int):
    """Convert pymupdf packed int color to (r, g, b) floats 0-1."""
    r = ((color_int >> 16) & 0xFF) / 255.0
    g = ((color_int >> 8)  & 0xFF) / 255.0
    b = ( color_int        & 0xFF) / 255.0
    return (r, g, b)


def is_light_color(rgb):
    """Return True if the color is light (e.g. white text)."""
    r, g, b = rgb
    # luminance
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    return lum > 0.6


def get_fill_color(text_rgb, page, rect):
    """
    Estimate the background fill color by sampling pixels around the text bbox.
    Falls back to heuristic based on text color.
    """
    # Sample the pixmap outside the text rect for bg color
    try:
        expand = 4
        sample_rect = fitz.Rect(
            rect.x0 - expand, rect.y0 - expand,
            rect.x1 + expand, rect.y1 + expand,
        )
        # clip to page rect
        sample_rect = sample_rect & page.rect
        if sample_rect.is_empty:
            raise ValueError("empty sample rect")
        pix = page.get_pixmap(matrix=fitz.Matrix(1, 1), clip=sample_rect, alpha=False)
        # Sample corners to avoid the text itself
        pixels = []
        for sx in [0, pix.width - 1]:
            for sy in [0, pix.height - 1]:
                if 0 <= sx < pix.width and 0 <= sy < pix.height:
                    sample = pix.pixel(sx, sy)
                    pixels.append(sample[:3])
        if pixels:
            avg = tuple(sum(c[i] for c in pixels) / len(pixels) / 255.0 for i in range(3))
            return avg
    except Exception:
        pass
    # Fallback heuristic
    if is_light_color(text_rgb):
        return (0.102, 0.153, 0.267)   # dark navy blue
    else:
        return (1.0, 1.0, 1.0)         # white


def get_block_text(block):
    """Return concatenated text of all spans in a block."""
    lines_text = []
    for line in block.get("lines", []):
        line_text = "".join(span["text"] for span in line.get("spans", []))
        lines_text.append(line_text)
    return "\n".join(lines_text)


def normalize(s):
    """Strip, collapse whitespace, and replace typography ligatures for matching."""
    import re
    # Replace common OpenType ligatures with their component letters
    s = s.replace('\uFB00', 'ff')
    s = s.replace('\uFB01', 'fi')
    s = s.replace('\uFB02', 'fl')
    s = s.replace('\uFB03', 'ffi')
    s = s.replace('\uFB04', 'ffl')
    s = s.replace('\uFB05', 'st')
    s = s.replace('\uFB06', 'st')
    return re.sub(r'\s+', ' ', s.strip())


def find_translation(text):
    """Try to find a translation for the given text."""
    # Exact match
    if text in TRANSLATIONS:
        return TRANSLATIONS[text]
    # Stripped match
    stripped = text.strip()
    if stripped in TRANSLATIONS:
        return TRANSLATIONS[stripped]
    # Normalized match
    norm = normalize(text)
    for k, v in TRANSLATIONS.items():
        if normalize(k) == norm:
            return v
    return None


# ── Main processing ───────────────────────────────────────────────────────────

INPUT_PDF  = "EGOZA.pdf"
OUTPUT_PDF = "EGOZA_RU.pdf"

doc = fitz.open(INPUT_PDF)
print(f"Opened '{INPUT_PDF}' — {len(doc)} pages")

total_replaced = 0

for page_num, page in enumerate(doc):
    page_replaced = 0
    blocks = page.get_text("dict")["blocks"]

    # ── Collect spans to replace ──────────────────────────────────────────
    replacements = []   # list of (fitz.Rect, translated_text, font_size, text_color)

    for block in blocks:
        if block.get("type") != 0:
            continue  # skip image blocks

        # Try block-level translation first
        block_text = get_block_text(block)
        block_translation = find_translation(block_text)

        if block_translation:
            # Use the first span's properties for styling
            first_span = block["lines"][0]["spans"][0]
            bbox       = fitz.Rect(block["bbox"])
            size       = first_span.get("size", 10)
            color_int  = first_span.get("color", 0)
            text_rgb   = color_int_to_rgb(color_int)
            replacements.append((bbox, block_translation, size, text_rgb, "block"))
        else:
            # Fall back to line-level matching
            for line in block.get("lines", []):
                line_text = "".join(s["text"] for s in line.get("spans", []))
                line_translation = find_translation(line_text)

                if line_translation:
                    first_span = line["spans"][0]
                    bbox       = fitz.Rect(line["bbox"])
                    size       = first_span.get("size", 10)
                    color_int  = first_span.get("color", 0)
                    text_rgb   = color_int_to_rgb(color_int)
                    replacements.append((bbox, line_translation, size, text_rgb, "line"))
                else:
                    # Span-level matching
                    for span in line.get("spans", []):
                        span_text  = span["text"]
                        span_trans = find_translation(span_text)
                        if span_trans:
                            bbox      = fitz.Rect(span["bbox"])
                            size      = span.get("size", 10)
                            color_int = span.get("color", 0)
                            text_rgb  = color_int_to_rgb(color_int)
                            replacements.append((bbox, span_trans, size, text_rgb, "span"))

    # ── Apply redactions ───────────────────────────────────────────────────
    redact_info = []
    for (bbox, translated, size, text_rgb, level) in replacements:
        if is_light_color(text_rgb):
            # Light (white) text sits on a dark image background.
            # Use fill=None so the background image shows through after the
            # text is stripped; PDF_REDACT_IMAGE_NONE keeps the image intact.
            redact_fill = None
            fill_color  = (0.1, 0.15, 0.27)   # dark hint used for font-weight selection
        else:
            # Dark text on a light background – white-fill the cleared area.
            redact_fill = (1.0, 1.0, 1.0)
            fill_color  = (1.0, 1.0, 1.0)
        redact_info.append((bbox, translated, size, text_rgb, fill_color))
        page.add_redact_annot(bbox, fill=redact_fill)

    page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE)

    # ── Insert translated text (use TextWriter for proper Unicode/Cyrillic) ────
    for (bbox, translated, size, text_rgb, fill_color) in redact_info:
        # Pick bold font if background is dark (white text on dark bg)
        is_dark_bg = not is_light_color(fill_color)
        font_path  = FONT_BOLD if is_dark_bg else FONT_REGULAR
        font       = fitz.Font(fontfile=font_path)

        # Try progressively smaller font sizes until text fits or we give up
        written = False
        for shrink in [1.0, 0.85, 0.70, 0.55, 0.40]:
            tw = fitz.TextWriter(page.rect, color=text_rgb)
            try:
                tw.fill_textbox(
                    bbox,
                    translated,
                    font=font,
                    fontsize=size * shrink,
                    align=fitz.TEXT_ALIGN_LEFT,
                    warn=False,
                )
                # No exception → all text fitted
                tw.write_text(page)
                written = True
                break
            except ValueError:
                if shrink == 0.40:
                    # Write whatever partial text fitted at the smallest size
                    tw.write_text(page)
                    written = True
                # Otherwise try next smaller size
                continue

        page_replaced += 1

    total_replaced += page_replaced
    print(f"  Page {page_num+1:2d}: {page_replaced} text blocks replaced")

print(f"\nTotal replacements: {total_replaced}")
doc.save(OUTPUT_PDF, garbage=4, deflate=True)
print(f"Saved → '{OUTPUT_PDF}'")
