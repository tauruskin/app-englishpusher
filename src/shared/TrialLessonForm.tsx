import { useEffect } from "react";

// ---------------------------------------------------------------------------
// TrialLessonForm — HubSpot "Trial lesson request" form (embedded)
// Leads land in HubSpot CRM with their original source (UTM / referrer),
// captured by the HubSpot tracking code loaded via GTM.
// ---------------------------------------------------------------------------

const HUBSPOT_PORTAL_ID = "149535757";
const HUBSPOT_FORM_ID = "2226dfee-47d4-406f-ae1a-2e8c0952dec2";
const HUBSPOT_REGION = "eu1";
const EMBED_SCRIPT_SRC = `https://js-${HUBSPOT_REGION}.hsforms.net/forms/embed/${HUBSPOT_PORTAL_ID}.js`;

export default function TrialLessonForm() {
  // Load the HubSpot embed script once; it renders every .hs-form-frame on the page
  useEffect(() => {
    if (document.querySelector(`script[src="${EMBED_SCRIPT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = EMBED_SCRIPT_SRC;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section
      id="trial-lesson"
      className="relative z-10 bg-white border-t border-neutral-200 px-6 py-12"
    >
      <div className="mx-auto max-w-xl">
        <h2 className="font-display text-2xl font-bold text-neutral-900 md:text-3xl">
          Want lessons <span className="text-brand">with Tetiana?</span>
        </h2>
        <div
          className="hs-form-frame"
          data-region={HUBSPOT_REGION}
          data-form-id={HUBSPOT_FORM_ID}
          data-portal-id={HUBSPOT_PORTAL_ID}
        />
      </div>
    </section>
  );
}
