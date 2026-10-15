import { useEffect, useState } from "react";
import { CalendarCheck, X } from "lucide-react";

// ---------------------------------------------------------------------------
// TrialLessonForm — button that opens the HubSpot "Trial lesson request" form
// in a modal. Leads land in HubSpot CRM with their original source (UTM /
// referrer), captured by the HubSpot tracking code loaded via GTM.
// A link ending in #trial-lesson opens the modal directly (for posts / bios).
// ---------------------------------------------------------------------------

const HUBSPOT_PORTAL_ID = "149535757";
const HUBSPOT_FORM_ID = "2226dfee-47d4-406f-ae1a-2e8c0952dec2";
const HUBSPOT_REGION = "eu1";
const EMBED_SCRIPT_SRC = `https://js-${HUBSPOT_REGION}.hsforms.net/forms/embed/${HUBSPOT_PORTAL_ID}.js`;
const HASH = "#trial-lesson";

export default function TrialLessonForm({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  // The form frame is mounted on first open and then kept (only hidden), so the
  // HubSpot script renders it once and a half-filled form survives closing.
  const [mounted, setMounted] = useState(false);

  const openModal = () => {
    setMounted(true);
    setOpen(true);
    (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event: "trial_form_open" });
  };

  // Deep link: app.englishpusher.in.ua/#trial-lesson opens the form
  useEffect(() => {
    if (window.location.hash === HASH) openModal();
  }, []);

  // Load the HubSpot embed script after the frame exists
  useEffect(() => {
    if (!mounted || document.querySelector(`script[src="${EMBED_SCRIPT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = EMBED_SCRIPT_SRC;
    script.defer = true;
    document.body.appendChild(script);
  }, [mounted]);

  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={[
          "inline-flex w-fit items-center gap-2 rounded-full bg-brand px-5 py-2.5",
          "text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand/90",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
          className,
        ].join(" ")}
      >
        <CalendarCheck size={16} />
        Book a trial lesson
      </button>

      {mounted && (
        <div
          className={`fixed inset-0 z-50 items-center justify-center bg-black/50 p-4 ${open ? "flex" : "hidden"}`}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Book a trial lesson"
        >
          <div
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 rounded-full p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
            >
              <X size={20} />
            </button>
            <div
              className="hs-form-frame"
              data-region={HUBSPOT_REGION}
              data-form-id={HUBSPOT_FORM_ID}
              data-portal-id={HUBSPOT_PORTAL_ID}
            />
          </div>
        </div>
      )}
    </>
  );
}
