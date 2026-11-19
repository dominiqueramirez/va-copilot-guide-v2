import { useState } from "react";
import { SCREENSHOT_SIZES } from "../screenshotSizes.js";

// Material icon paths (the icon set used by USWDS/VADS).
const ICONS = {
  info: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
  warning: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z",
  success: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  error: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
  arrowRight: "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z",
  arrowDown: "M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z",
  launch:
    "M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z",
  copy: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z",
  check: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
  expand: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z",
  zoom: "M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z",
};

export function Icon({ name, className = "size-6" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={`shrink-0 fill-current ${className}`}>
      <path d={ICONS[name]} />
    </svg>
  );
}

const ALERT_STYLES = {
  info: "border-info bg-info-lighter",
  warning: "border-warning bg-warning-lighter",
  success: "border-success bg-success-lighter",
  error: "border-error bg-error-lighter",
};

// VADS Alert: https://design.va.gov/components/alert
export function Alert({ status = "info", heading, headingLevel = 3, children, className = "" }) {
  const H = `h${headingLevel}`;
  return (
    <div className={`flex gap-3 border-l-8 px-5 py-4 ${ALERT_STYLES[status]} ${className}`} role={status === "error" ? "alert" : undefined}>
      <Icon name={status} className="mt-0.5 size-7 text-ink" />
      <div className="min-w-0 space-y-2">
        {heading && <H className="text-[1.25rem]">{heading}</H>}
        <div className="space-y-2 [&_li+li]:mt-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6">{children}</div>
      </div>
    </div>
  );
}

export function ExternalLink({ href, children, className = "" }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

// VADS Link - Action: https://design.va.gov/components/link/action
export function ActionLink({ href, children, external = true }) {
  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a
      href={href}
      {...props}
      className="group inline-flex items-center gap-2 py-1 text-lg font-bold text-primary no-underline visited:text-primary hover:text-primary-dark hover:underline"
    >
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-success-dark text-white group-hover:bg-ink">
        <Icon name="arrowRight" className="size-5" />
      </span>
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

export function CopyText({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <span className="my-1 inline-flex max-w-full items-stretch overflow-hidden rounded border border-base-light align-middle">
      <code className="flex min-w-0 items-center rounded-none bg-white px-3 py-1.5 break-words">{text}</code>
      <button
        type="button"
        onClick={copy}
        className="inline-flex shrink-0 cursor-pointer items-center gap-1 border-l border-base-light bg-primary px-3 py-1.5 text-sm font-bold text-white hover:bg-primary-dark"
      >
        <Icon name={copied ? "check" : "copy"} className="size-4" />
        {copied ? "Copied" : label}
        <span className="sr-only">: {text}</span>
      </button>
    </span>
  );
}

export function Screenshot({ src, alt, caption, narrow = false, widthClass }) {
  const url = `screenshots/${src}`;
  const [width, height] = SCREENSHOT_SIZES[src] ?? [];
  return (
    <figure className={`my-6 ${widthClass ?? (narrow ? "max-w-md" : "max-w-3xl")}`}>
      <a href={url} target="_blank" rel="noopener noreferrer" className="group relative block border border-base-lighter bg-base-lightest no-underline">
        <img src={url} alt={alt} width={width} height={height} loading="lazy" className="block h-auto w-full" />
        <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded bg-ink/80 px-2 py-1 text-xs font-bold text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
          <Icon name="zoom" className="size-4" /> View full size
        </span>
        <span className="sr-only"> (opens full-size image in a new tab)</span>
      </a>
      {caption && <figcaption className="mt-2 text-[0.9375rem] text-base-dark">{caption}</figcaption>}
    </figure>
  );
}

// VADS Additional info: https://design.va.gov/components/additional-info
export function AdditionalInfo({ trigger, children }) {
  return (
    <details className="group my-4 max-w-3xl">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1 font-bold text-primary hover:text-primary-dark [&::-webkit-details-marker]:hidden">
        {trigger}
        <Icon name="expand" className="size-5 transition group-open:rotate-180" />
      </summary>
      <div className="mt-3 border-l-4 border-primary pl-4">{children}</div>
    </details>
  );
}

export function Tag({ children, tone = "gray" }) {
  const tones = {
    gray: "bg-base-lighter text-ink",
    blue: "bg-primary-lighter text-primary-darker",
    green: "bg-success-lighter text-success-dark",
  };
  return (
    <span className={`inline-block rounded-sm px-2 py-0.5 text-xs font-bold tracking-wide uppercase ${tones[tone]}`}>{children}</span>
  );
}

export function StepHeading({ id, step, children }) {
  return (
    <h2 id={id} className="scroll-mt-6 border-t-4 border-primary-darker pt-6">
      <span className="mb-1 block text-base font-bold tracking-wide text-base-dark uppercase">Step {step}</span>
      {children}
    </h2>
  );
}
