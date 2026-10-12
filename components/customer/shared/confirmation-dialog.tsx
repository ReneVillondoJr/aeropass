'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface CustomerConfirmationDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'default' | 'danger';
  onConfirm: () => void | Promise<void>;
  onOpenChange: (open: boolean) => void;
}

export function CustomerConfirmationDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'default',
  onConfirm,
  onOpenChange,
}: CustomerConfirmationDialogProps) {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setSubmitting(false);
      setErrorMessage(null);
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && !submitting) onOpenChange(false);
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange, submitting]);

  async function handleConfirm() {
    if (submitting) return;
    setSubmitting(true);
    setErrorMessage(null);

    try {
      await onConfirm();
      onOpenChange(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'We could not complete this action. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  const confirmStyles = tone === 'danger'
    ? 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500'
    : 'bg-[#102A43] hover:bg-[#183F5D] focus-visible:ring-[#5BA9D6]';

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="presentation">
      <button
        type="button"
        aria-label="Close confirmation dialog"
        onClick={() => {
          if (!submitting) onOpenChange(false);
        }}
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]"
      />

      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="customer-confirmation-title"
        aria-describedby="customer-confirmation-description"
        className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-2xl shadow-slate-950/20 sm:p-6"
      >
        <button
          type="button"
          aria-label="Close dialog"
          disabled={submitting}
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-[#5BA9D6] disabled:opacity-50"
        >
          <X className="size-4" aria-hidden="true" />
        </button>

        <span className={[
          'flex size-11 items-center justify-center rounded-xl',
          tone === 'danger' ? 'bg-red-50 text-red-600' : 'bg-[#EEF7FB] text-[#2879A8]',
        ].join(' ')}>
          <AlertTriangle className="size-5" aria-hidden="true" />
        </span>

        <h2 id="customer-confirmation-title" className="mt-4 pr-8 text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <p id="customer-confirmation-description" className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        {errorMessage ? (
          <p role="alert" className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs leading-5 text-red-700">
            {errorMessage}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={submitting}
            onClick={() => onOpenChange(false)}
            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-[#5BA9D6] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            disabled={submitting}
            onClick={() => void handleConfirm()}
            className={[
              'inline-flex min-h-10 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              confirmStyles,
            ].join(' ')}
          >
            {submitting ? 'Please wait…' : confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}
