export const companyInfo = {
  brandName: "CookFlow",
  legalName: "ARDWILL LTD",
  registrationLabel: "Reg.Nr.",
  registrationNumber: "HE 490692",
  contactEmail: "contact@eurocookflow.com",
  addressLines: [
    "Lopathou 6",
    "Strovolos",
    "2027 Nicosia",
    "Cyprus",
  ],
} as const;

export const companyDisplayAddress = companyInfo.addressLines.join(" · ");

