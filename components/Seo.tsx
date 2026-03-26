import React, { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  pathname?: string;
  type?: string;
  robots?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const SITE_URL = "https://eurocookflow.com";
const DEFAULT_TYPE = "website";

function ensureMeta(
  selector: string,
  attributes: Record<string, string>,
): HTMLMetaElement {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => {
      element!.setAttribute(key, value);
    });
    document.head.appendChild(element);
  }

  return element;
}

function ensureCanonical(): HTMLLinkElement {
  let element = document.head.querySelector(
    'link[rel="canonical"]',
  ) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  return element;
}

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  pathname = "/",
  type = DEFAULT_TYPE,
  robots = "index,follow",
  jsonLd,
}) => {
  useEffect(() => {
    const canonicalUrl = new URL(pathname, SITE_URL).toString();

    document.title = title;

    ensureMeta('meta[name="description"]', { name: "description" }).content =
      description;
    ensureMeta('meta[name="robots"]', { name: "robots" }).content = robots;
    ensureMeta('meta[property="og:title"]', {
      property: "og:title",
    }).content = title;
    ensureMeta('meta[property="og:description"]', {
      property: "og:description",
    }).content = description;
    ensureMeta('meta[property="og:type"]', {
      property: "og:type",
    }).content = type;
    ensureMeta('meta[property="og:url"]', {
      property: "og:url",
    }).content = canonicalUrl;
    ensureMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
    }).content = "summary_large_image";
    ensureMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
    }).content = title;
    ensureMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
    }).content = description;

    ensureCanonical().href = canonicalUrl;

    const existingScript = document.getElementById(
      "seo-json-ld",
    ) as HTMLScriptElement | null;

    if (jsonLd) {
      const script = existingScript ?? document.createElement("script");
      script.id = "seo-json-ld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);

      if (!existingScript) {
        document.head.appendChild(script);
      }
    } else if (existingScript) {
      existingScript.remove();
    }
  }, [description, jsonLd, pathname, robots, title, type]);

  return null;
};

export default Seo;
