import React from "react";
import { Link, useParams } from "react-router-dom";
import { ChefHat, ArrowLeft } from "lucide-react";
import Seo from "../components/Seo";
import { companyDisplayAddress, companyInfo } from "../lib/companyInfo";

type LegalSection = "about" | "privacy" | "terms" | "vat" | "refund" | "complaints";

const content: Record<LegalSection, { title: string; body: React.ReactNode }> =
  {
    about: {
      title: "About CookFlow",
      body: (
        <>
          <p>Last updated: April 22, 2026</p>
          <h3>What CookFlow is</h3>
          <p>
            CookFlow is a culinary learning platform built around chef-led
            lessons, technique-first recipes, meal planning, and kitchen
            workflow tools for ambitious home cooks and professionals.
          </p>
          <h3>Billing entity</h3>
          <p>
            {companyInfo.legalName}
            <br />
            {companyInfo.registrationLabel} {companyInfo.registrationNumber}
            <br />
            {companyDisplayAddress}
          </p>
          <h3>Payment requisites</h3>
          <p>
            Credit top-ups and other charges displayed on eurocookflow.com are
            issued under the legal entity above. This section is intended to
            give customers a public reference for company requisites when
            reviewing billing details or preparing internal approvals.
          </p>
          <h3>Contact</h3>
          <p>
            For billing, support, or general enquiries:{" "}
            <a href={`mailto:${companyInfo.contactEmail}`}>
              {companyInfo.contactEmail}
            </a>
          </p>
        </>
      ),
    },
    privacy: {
      title: "Privacy Policy",
      body: (
        <>
          <p>Last updated: April 22, 2026</p>
          <h3>1. Data We Collect</h3>
          <p>
            We collect information you provide directly (name, email, profile
            details) and usage data generated while using CookFlow (recipe
            views, session preferences, purchased credits).
          </p>
          <h3>2. How We Use Your Data</h3>
          <p>
            Your data is used to personalise curriculum recommendations, process
            credit transactions, and improve the platform. We do not sell
            personal data to third parties.
          </p>
          <h3>3. Data Retention</h3>
          <p>
            Account data is retained while your account is active and for up to
            12 months after closure. You may request deletion at any time via
            Settings → Delete Account.
          </p>
          <h3>4. Cookies</h3>
          <p>
            We use strictly necessary session cookies and optional analytics
            cookies. You can manage preferences in your browser settings.
          </p>
          <h3>5. GDPR Rights</h3>
          <p>
            If you are located in the EU/EEA, you have the right to access,
            rectify, port, or erase your personal data. Requests may be
            submitted through the CookFlow support channel referenced in your
            account area.
          </p>
          <h3>6. Contact</h3>
          <p>
            {companyInfo.legalName} · {companyInfo.registrationLabel}{" "}
            {companyInfo.registrationNumber} · {companyDisplayAddress}
          </p>
        </>
      ),
    },
    terms: {
      title: "Terms of Service",
      body: (
        <>
          <p>Last updated: April 22, 2026</p>
          <h3>1. Acceptance</h3>
          <p>
            By creating a CookFlow account you agree to these Terms. If you do
            not agree, please do not use the service.
          </p>
          <h3>2. Credits & Billing</h3>
          <p>
            CookFlow uses a credit wallet model. You can top up credits from
            Settings and spend them to unlock premium content and features.
          </p>
          <h3>3. CookFlow Credits</h3>
          <p>
            Credits are non-transferable and expire 24 months after purchase.
            Credits have no cash value and cannot be exchanged for money. Once
            consumed, credits are non-refundable. Unspent credits may be
            refunded within 14 days of purchase in accordance with EU Directive
            2011/83/EU — see the Refund Policy for full details.
          </p>
          <h3>4. Billing Entity</h3>
          <p>
            CookFlow services for eurocookflow.com are provided by{" "}
            {companyInfo.legalName}, {companyInfo.registrationLabel}{" "}
            {companyInfo.registrationNumber}, with its registered office at{" "}
            {companyDisplayAddress}.
          </p>
          <h3>5. Intellectual Property</h3>
          <p>
            All curriculum content, recipes, video lessons, and chef profiles
            are the exclusive property of CookFlow or its licensed contributors.
            Reproduction or redistribution without written consent is
            prohibited.
          </p>
          <h3>6. Acceptable Use</h3>
          <p>
            You agree not to scrape, resell, or reverse-engineer any part of the
            platform. Violations may result in immediate account termination
            without refund.
          </p>
          <h3>7. Limitation of Liability</h3>
          <p>
            CookFlow is provided "as is". We are not liable for injuries,
            property damage, or other consequences arising from following
            recipes or techniques on the platform.
          </p>
          <h3>8. Governing Law</h3>
          <p>
            These Terms are governed by the laws applicable to the contracting
            entity identified above, unless mandatory consumer law states
            otherwise.
          </p>
        </>
      ),
    },
    vat: {
      title: "VAT & Tax Information",
      body: (
        <>
          <p>Last updated: April 22, 2026</p>
          <h3>Company Details</h3>
          <p>
            {companyInfo.legalName}
            <br />
            {companyInfo.registrationLabel} {companyInfo.registrationNumber}
            <br />
            {companyDisplayAddress}
          </p>
          <h3>VAT on Credit Top-Ups</h3>
          <p>
            Credit top-up prices displayed on CookFlow include VAT at the
            applicable rate for your country of residence (determined at
            checkout). EU customers will see their local VAT rate applied
            automatically.
          </p>
          <h3>Tax Handling on Credits</h3>
          <p>
            CookFlow Credits are treated as prepaid digital vouchers. VAT is
            applied at the point of purchase in accordance with EU Directive
            2006/112/EC.
          </p>
          <h3>Billing Requisites</h3>
          <p>
            The public billing requisites currently published for
            eurocookflow.com are the legal entity name, registration number,
            and registered office shown above. If additional invoicing details
            are required, they should be supplied during the checkout or
            support workflow before publication.
          </p>
          <h3>B2B Customers</h3>
          <p>
            EU businesses with a valid VAT registration number may be eligible
            for reverse-charge VAT. Enter your VAT number at checkout to apply
            the reverse-charge mechanism.
          </p>
        </>
      ),
    },
    refund: {
      title: "Refund Policy",
      body: (
        <>
          <p>Last updated: May 8, 2026</p>
          <h3>1. Eligibility</h3>
          <p>
            Credits purchased through CookFlow are non-refundable once consumed
            against any feature, recipe, chef profile, or planner unlock. Unspent
            credits may be refunded within 14 days of the original purchase date, in
            accordance with EU consumer rights for digital goods (Directive
            2011/83/EU).
          </p>
          <h3>2. How to Request a Refund</h3>
          <p>
            Submit your request to{" "}
            <a href={`mailto:${companyInfo.contactEmail}`}>
              {companyInfo.contactEmail}
            </a>{" "}
            including: (a) your registered email address, (b) the order/invoice
            reference from your confirmation email, (c) the number of unspent
            credits you are requesting a refund for, and (d) the reason for the
            request.
          </p>
          <h3>3. Response SLA</h3>
          <p>
            We will acknowledge your request within 2 business days and issue a
            decision within 5 business days of acknowledgement. Approved refunds are
            processed within 7 business days via your original payment method.
          </p>
          <h3>4. Exclusions</h3>
          <p>The following are not eligible for refund:</p>
          <ul>
            <li>Credits that have been partially or fully consumed.</li>
            <li>Promotional or bonus credits granted outside a direct purchase.</li>
            <li>Credits whose 14-day eligibility window has expired.</li>
          </ul>
          <h3>5. Chargebacks</h3>
          <p>
            Initiating a chargeback before contacting us may result in temporary
            account suspension while the dispute is resolved. We encourage you to
            contact support first — most issues are resolved faster through our
            direct process.
          </p>
          <h3>6. Contact</h3>
          <p>
            {companyInfo.legalName} · {companyInfo.registrationLabel}{" "}
            {companyInfo.registrationNumber} · {companyDisplayAddress}
          </p>
        </>
      ),
    },
    complaints: {
      title: "Complaints Policy",
      body: (
        <>
          <p>Last updated: May 8, 2026</p>
          <h3>1. Who Can File</h3>
          <p>
            Any registered CookFlow user, or any person whose personal data we
            process, may submit a complaint. You do not need to be a paying
            customer.
          </p>
          <h3>2. Required Information</h3>
          <p>A complete complaint must include:</p>
          <ul>
            <li>Your full name and registered email address.</li>
            <li>Your account ID (visible in Settings → Profile).</li>
            <li>A clear description of the issue or concern.</li>
            <li>The date(s) on which the issue occurred.</li>
            <li>Any supporting evidence (screenshots, transaction references).</li>
          </ul>
          <h3>3. How to Submit</h3>
          <p>
            Send your complaint to{" "}
            <a href={`mailto:${companyInfo.contactEmail}`}>
              {companyInfo.contactEmail}
            </a>{" "}
            with the subject line{" "}
            <em>"Formal Complaint — [brief topic]"</em>.
          </p>
          <h3>4. Review SLA</h3>
          <p>
            Acknowledgement: within 2 business days of receipt. Initial assessment:
            within 5 business days. Full resolution or escalation notice: within 15
            business days.
          </p>
          <h3>5. Appeals</h3>
          <p>
            If you are unsatisfied with our decision you may: (a) request an
            internal appeal within 14 days by replying to the resolution notice with
            your grounds — a senior team member will conclude the appeal within 10
            business days; or (b) escalate to your national data-protection
            supervisory authority for data-related complaints, or to your national
            consumer-protection authority for billing or service complaints.
          </p>
          <h3>6. Contact</h3>
          <p>
            {companyInfo.legalName} · {companyInfo.registrationLabel}{" "}
            {companyInfo.registrationNumber} · {companyDisplayAddress}
          </p>
        </>
      ),
    },
  };

const LegalPage: React.FC = () => {
  const { page } = useParams<{ page: string }>();
  const section =
    (page as LegalSection) in content ? (page as LegalSection) : "privacy";
  const { title, body } = content[section];
  const descriptions: Record<LegalSection, string> = {
    about:
      "Learn what CookFlow is and view the published company and billing requisites for eurocookflow.com.",
    privacy:
      "Read CookFlow's privacy policy, including how account, analytics, and usage data are handled.",
    terms:
      "Review CookFlow's terms of service, billing rules, credit wallet terms, and acceptable use policy.",
    vat: "View ARDWILL LTD billing, VAT, and tax information for eurocookflow.com customers.",
    refund:
      "Read CookFlow's refund policy, including eligibility, the request process, SLAs, and exclusions.",
    complaints:
      "Read CookFlow's complaints policy: who can file, required information, review SLAs, and how to appeal.",
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-gray-200">
      <Seo
        title={`${title} | CookFlow`}
        description={descriptions[section]}
        pathname={`/legal/${section}`}
        type="article"
      />
      {/* Nav */}
      <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between max-w-4xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <ChefHat className="h-5 w-5 text-[#14b8a6]" />
          <span className="font-serif text-lg font-bold tracking-wider text-white">
            COOK<span className="text-[#14b8a6]">FLOW</span>
          </span>
        </Link>
        <Link
          to="/"
          className="flex items-center gap-1.5 text-sm text-[#94A3B8] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </header>

      {/* Tab nav */}
      <nav className="border-b border-white/5 px-6 max-w-4xl mx-auto">
        <div className="flex gap-6">
          {(["about", "privacy", "terms", "vat", "refund", "complaints"] as LegalSection[]).map((s) => (
            <Link
              key={s}
              to={`/legal/${s}`}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                s === section
                  ? "border-[#14b8a6] text-[#14b8a6]"
                  : "border-transparent text-[#64748B] hover:text-[#94A3B8]"
              }`}
            >
              {({
                about: "About",
                privacy: "Privacy",
                terms: "Terms",
                vat: "VAT Info",
                refund: "Refund Policy",
                complaints: "Complaints Policy",
              } as Record<LegalSection, string>)[s]}
            </Link>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-serif font-bold text-white mb-8">
          {title}
        </h1>
        <div className="prose prose-invert prose-sm max-w-none space-y-4 text-gray-400 [&_h3]:text-white [&_h3]:font-semibold [&_h3]:text-base [&_h3]:mt-6 [&_h3]:mb-2">
          {body}
        </div>
      </main>
    </div>
  );
};

export default LegalPage;
