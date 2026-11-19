import { useEffect, useState } from "react";
import { Icon, ExternalLink } from "./ui.jsx";
import { LINKS } from "../data.js";

export const NAV = [
  { id: "before-you-start", label: "Before you start" },
  { id: "join-github", label: "1. Join VA GitHub" },
  { id: "request-copilot", label: "2. Request Copilot access" },
  { id: "approved-versions", label: "3. Find approved software versions" },
  { id: "request-software", label: "4. Request software in yourIT" },
  { id: "connect-vscode", label: "5. Connect Copilot to VS Code" },
  { id: "start-using", label: "6. Start using Copilot" },
  { id: "get-help", label: "Get help" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "checklist", label: "Checklist" },
  { id: "resources", label: "Resources and training" },
];

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only z-50 bg-white px-4 py-2 font-bold focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
    >
      Skip to main content
    </a>
  );
}

export function Header() {
  return (
    <header className="bg-primary-darker text-white">
      <div className="mx-auto flex max-w-[1000px] flex-wrap items-center justify-between gap-4 px-4 py-5 md:px-6">
        <div className="flex items-center gap-3">
          <img src="va-seal.png" alt="Seal of the U.S. Department of Veterans Affairs" width="64" height="64" className="size-16 shrink-0" />
          <div>
            <p className="text-sm font-semibold tracking-wide text-primary-light uppercase">U.S. Department of Veterans Affairs</p>
            <p className="text-xl font-bold">GitHub Copilot setup guide</p>
          </div>
        </div>
        <ExternalLink
          href={LINKS.ghecUsUsers}
          className="rounded border-2 border-white px-4 py-2 text-sm font-bold text-white no-underline visited:text-white hover:bg-white hover:text-primary-darker"
        >
          Get help in Teams
        </ExternalLink>
      </div>
    </header>
  );
}

// VADS On this page: https://design.va.gov/components/on-this-page
export function OnThisPage() {
  return (
    <nav aria-labelledby="on-this-page" className="my-8 lg:hidden">
      <h2 id="on-this-page" className="mb-3 text-[1.25rem]">On this page</h2>
      <ul className="space-y-2">
        {NAV.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="inline-flex items-center gap-1 font-bold no-underline visited:text-primary hover:underline">
              <Icon name="arrowDown" className="size-5" />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// VADS Sidenav pattern: highlights the section currently in view.
export function SideNav() {
  const [active, setActive] = useState(NAV[0].id);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = NAV[0].id;
      for (const { id } of NAV) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav aria-label="Guide sections" className="sticky top-6 hidden max-h-[calc(100vh-3rem)] overflow-y-auto lg:block">
      <ul className="border-t border-base-lighter">
        {NAV.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id} className="border-b border-base-lighter">
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`block border-l-4 py-2 pr-2 pl-3 text-[0.9375rem] no-underline hover:bg-base-lightest hover:text-primary ${
                  isActive ? "border-primary font-bold text-primary visited:text-primary" : "border-transparent text-base-darker visited:text-base-darker"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 bg-primary-darker text-white">
      <div className="mx-auto grid max-w-[1000px] gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <h2 className="mb-3 text-lg text-white">Need help?</h2>
          <p className="text-[0.9375rem]">
            Post your question in the{" "}
            <ExternalLink href={LINKS.ghecUsUsers} className="font-bold text-white visited:text-white hover:text-primary-light">
              GHEC-US-Users team in Microsoft Teams
            </ExternalLink>
            .
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-lg text-white">VA GitHub</h2>
          <ul className="space-y-2 text-[0.9375rem]">
            <li><ExternalLink href={LINKS.vaGhe} className="text-white visited:text-white hover:text-primary-light">va.ghe.com</ExternalLink></li>
            <li><ExternalLink href={LINKS.githubHandbook} className="text-white visited:text-white hover:text-primary-light">GitHub Admin Handbook</ExternalLink></li>
            <li><ExternalLink href={LINKS.trmHome} className="text-white visited:text-white hover:text-primary-light">VA Technical Reference Model (TRM)</ExternalLink></li>
          </ul>
        </div>
        <div className="text-[0.9375rem] text-primary-lighter">
          <p>An internal how-to guide for VA staff and contractors. This is not an official VA.gov page.</p>
          <p className="mt-2">Last updated: November 19, 2026</p>
        </div>
      </div>
    </footer>
  );
}
