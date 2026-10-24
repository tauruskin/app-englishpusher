import { useEffect, useRef, useState } from "react";
import { CalendarCheck, X } from "lucide-react";
import TrialForm from "./trialForm/TrialForm.tsx";

// ---------------------------------------------------------------------------
// TrialLessonForm — button that opens our own "Book a trial lesson" form in a
// modal. Submissions go to the HubSpot "Trial lesson request" form through
// HubSpot's public submission API (trialForm/hubspot.ts), so leads keep their
// original source (UTM / referrer) and the Leads Bot and n8n alert see them.
// A link ending in #trial-lesson opens the modal directly (for posts / bios).
// ---------------------------------------------------------------------------

const HASH = "#trial-lesson";

export default function TrialLessonForm({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  // The form is mounted on first open and then kept (only hidden), so a
  // half-filled form survives closing. After a successful send, the next
  // open remounts it empty (new key) — also when it was closed mid-send.
  const [mounted, setMounted] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [sent, setSent] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // A click only closes the modal when it both started and ended on the
  // backdrop (a text-selection drag out of an input must not close it).
  const pressedOnBackdrop = useRef(false);

  const openModal = () => {
    if (sent) {
      setSent(false);
      setFormKey((k) => k + 1);
    }
    setMounted(true);
    setOpen(true);
    (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event: "trial_form_open" });
  };

  const closeModal = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  // Deep link: app.englishpusher.in.ua/#trial-lesson opens the form
  useEffect(() => {
    if (window.location.hash === HASH) openModal();
  }, []);

  // While open: Esc closes, the page behind does not scroll, focus goes to the first field
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.getElementById("tf-firstname")?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, formKey]);

  return (
    <>
      <button
        ref={triggerRef}
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
          className={`fixed inset-0 z-50 overflow-y-auto bg-black/50 ${open ? "block" : "hidden"}`}
          onMouseDown={(e) => (pressedOnBackdrop.current = e.target === e.currentTarget)}
          onClick={(e) => {
            if (pressedOnBackdrop.current && e.target === e.currentTarget) closeModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Book a trial lesson"
        >
          <div
            className="flex min-h-full items-center justify-center px-4 pb-6 pt-20"
            onMouseDown={(e) => (pressedOnBackdrop.current = e.target === e.currentTarget)}
            onClick={(e) => {
              if (pressedOnBackdrop.current && e.target === e.currentTarget) closeModal();
            }}
          >
            <div className="relative w-full max-w-[520px] rounded-3xl bg-white px-5 pb-6 pt-4 shadow-xl sm:px-8">
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="absolute right-3 top-3 z-10 rounded-full p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
              >
                <X size={20} />
              </button>
              <TrialForm key={formKey} onClose={closeModal} onSuccess={() => setSent(true)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
