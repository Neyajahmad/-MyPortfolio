import React from 'react';
import { Lock } from 'lucide-react';
import { cn } from './Container';

/**
 * Wraps a screenshot in a light browser window (web projects) or a plain
 * rounded card (`plain`), so square and wide images both look intentional.
 */
export function DeviceFrame({ src, alt, url, plain = false, className, eager = false }) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl bg-white ring-1 ring-black/5 shadow-[0_40px_80px_-30px_rgba(26,26,26,0.45)]',
        className
      )}
    >
      {!plain && (
        <div className="flex items-center gap-3 border-b border-black/5 bg-[#F4F2EE] px-3 py-2.5 md:px-4">
          <div className="flex shrink-0 gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E9A193]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E8CB8B]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#A7C29C]" />
          </div>
          <div className="mx-auto flex min-w-0 max-w-[70%] items-center gap-1.5 rounded-md bg-black/[0.05] px-3 py-1 text-[11px] text-text/50">
            <Lock size={10} className="shrink-0" />
            <span className="truncate">{url}</span>
          </div>
          <span className="w-[42px] shrink-0" aria-hidden="true" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable="false"
        className="block h-auto w-full select-none"
      />
    </div>
  );
}
