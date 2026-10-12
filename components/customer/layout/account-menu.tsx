'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, LogOut, UserRound } from 'lucide-react';

interface CustomerAccountMenuProps {
  customerName?: string;
  customerEmail?: string;
  onSignOut?: () => void | Promise<void>;
}

function getInitials(name: string): string {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

  return initials || 'C';
}

export function CustomerAccountMenu({
  customerName = 'Customer',
  customerEmail,
  onSignOut,
}: CustomerAccountMenuProps) {
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  async function handleSignOut() {
    if (!onSignOut || signingOut) return;

    setSigningOut(true);
    try {
      await onSignOut();
      setOpen(false);
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex max-w-[220px] items-center gap-2 rounded-xl p-1.5 text-left outline-none transition-colors hover:bg-muted/70 focus-visible:ring-2 focus-visible:ring-[#5BA9D6]"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#E5F5FC] text-xs font-bold text-[#102A43] ring-1 ring-[#CDE7F4]">
          {getInitials(customerName)}
        </span>
        <span className="hidden min-w-0 sm:block">
          <span className="block truncate text-sm font-semibold text-foreground">{customerName}</span>
          <span className="block truncate text-[11px] text-muted-foreground">Customer account</span>
        </span>
        <ChevronDown className="hidden size-4 shrink-0 text-muted-foreground sm:block" aria-hidden="true" />
      </button>

      {open ? (
        <div
          role="menu"
          aria-label="Customer account menu"
          className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-border bg-popover p-1.5 text-popover-foreground shadow-xl shadow-slate-950/10"
        >
          <div className="border-b border-border/70 px-3 py-3">
            <p className="truncate text-sm font-semibold">{customerName}</p>
            {customerEmail ? (
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{customerEmail}</p>
            ) : (
              <p className="mt-0.5 text-xs text-muted-foreground">AeroPass customer</p>
            )}
          </div>

          <Link
            href="/customer/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm outline-none transition-colors hover:bg-muted focus-visible:bg-muted"
          >
            <UserRound className="size-4 text-muted-foreground" aria-hidden="true" />
            My profile
          </Link>

          {onSignOut ? (
            <button
              type="button"
              role="menuitem"
              onClick={() => void handleSignOut()}
              disabled={signingOut}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 outline-none transition-colors hover:bg-red-50 focus-visible:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogOut className="size-4" aria-hidden="true" />
              {signingOut ? 'Signing out…' : 'Sign out'}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
