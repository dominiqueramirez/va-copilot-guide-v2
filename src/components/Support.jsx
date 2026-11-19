import { useEffect, useState } from "react";
import { Alert, ActionLink, ExternalLink, Tag } from "./ui.jsx";
import { LINKS, TRAINING } from "../data.js";

export function GetHelp() {
  return (
    <section aria-labelledby="get-help" className="space-y-4">
      <h2 id="get-help" className="scroll-mt-6 border-t-4 border-primary-darker pt-6">Get help</h2>
      <div className="va-prose">
        <p>
          If you get stuck at any step, post your question in the <strong>GHEC-US-Users</strong> team in Microsoft Teams. It’s
          the support community for VA GitHub Enterprise Cloud and handles sign-in problems, access errors, firewall blocks, and
          Copilot connection issues. Include the exact error message and the step you were on.
        </p>
      </div>
      <ActionLink href={LINKS.ghecUsUsers}>Ask for help in GHEC-US-Users</ActionLink>

      <h3 className="pt-4">Other communities</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <article className="border border-base-lighter p-5">
          <Tag tone="blue">Recommended</Tag>
          <h4 className="mt-2">GitHub Copilot channel</h4>
          <p className="mt-1 text-[0.9375rem]">Announcements, tips, and discussion from the GitHub team that supports VA.</p>
          <p className="mt-3"><ExternalLink href={LINKS.copilotChannel}>Open the GitHub Copilot channel</ExternalLink></p>
        </article>
        <article className="border border-base-lighter p-5">
          <Tag>Optional</Tag>
          <h4 className="mt-2">AI@VA Community</h4>
          <p className="mt-1 text-[0.9375rem]">General discussion of AI tools at VA, including Copilot, ChatGPT, and Claude.</p>
          <p className="mt-3"><ExternalLink href={LINKS.aiAtVa}>Open AI@VA Community</ExternalLink></p>
        </article>
      </div>
    </section>
  );
}

const TROUBLES = [
  {
    q: "“Unsuccessful OIDC authorization, no access to Enterprise”",
    a: "Your GitHub account hasn’t been created yet. Make sure you requested the GitHub Enterprise Managed User (OIDC) app in step 1, then wait about an hour before trying again.",
  },
  {
    q: "“App launch failed”",
    a: "This happens if you open va.ghe.com from the My Apps page. Because of a known Entra ID limitation, type va.ghe.com directly into your browser instead.",
  },
  {
    q: "My Apps justification error",
    a: "The justification was missing or too long. Request the app again and paste exactly: access required for source control.",
  },
  {
    q: "“Failed to sign in to GHE.com” in VS Code",
    a: "Connect to the VA network or VPN, sign in to va.ghe.com in your browser, then select Retry in VS Code.",
  },
  {
    q: "VS Code shows “Free” instead of “Copilot Enterprise”",
    a: "You signed in with a GitHub.com account. Sign out of that account in VS Code, then sign in again using “Continue with GHE.com” and va.ghe.com.",
  },
  {
    q: "yourIT won’t accept the software I typed",
    a: "You typed it in “Select Software On Demand.” Check “Click here for additional approved software options” and search there. Use the search terms from step 4.",
  },
  {
    q: "Software I installed disappeared",
    a: "IT probably removed a version the TRM doesn’t approve. Check the decision matrix in step 3 and request the approved version in yourIT.",
  },
  {
    q: "“python” or “pip” isn’t recognized, or opens the Microsoft Store",
    a: "Python isn’t in your PATH. Ask Copilot: “Please add Python 3.14 to my user PATH.”",
  },
  {
    q: "Copilot access suddenly disappeared",
    a: "Check that you can still sign in to va.ghe.com, then submit the Copilot access request form again.",
  },
  {
    q: "Firewall or connection errors",
    a: "Post the full error message in the GHEC-US-Users team. You may be asked to open a GitHub Admin support request.",
  },
];

export function Troubleshooting() {
  return (
    <section aria-labelledby="troubleshooting" className="space-y-4">
      <h2 id="troubleshooting" className="scroll-mt-6 border-t-4 border-primary-darker pt-6">Troubleshooting</h2>
      {/* VADS Accordion pattern, built on native details elements */}
      <div className="max-w-3xl border-t border-base-lighter">
        {TROUBLES.map((t) => (
          <details key={t.q} className="group border-b border-base-lighter">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 bg-base-lightest px-4 py-3 font-bold hover:bg-base-lighter [&::-webkit-details-marker]:hidden">
              {t.q}
              <span aria-hidden="true" className="text-2xl leading-none text-ink group-open:hidden">+</span>
              <span aria-hidden="true" className="hidden text-2xl leading-none text-ink group-open:inline">−</span>
            </summary>
            <p className="px-4 py-3">{t.a}</p>
          </details>
        ))}
      </div>
      <Alert status="info">
        <p>
          Still stuck? Ask in the <ExternalLink href={LINKS.ghecUsUsers}>GHEC-US-Users team</ExternalLink>.
        </p>
      </Alert>
    </section>
  );
}

const CHECKLIST = [
  { id: "vpn", label: "Connect to the VA network or VPN" },
  { id: "oidc", label: "Request the GitHub Enterprise Managed User (OIDC) app in My Apps" },
  { id: "wait", label: "Wait about an hour, then sign in to va.ghe.com" },
  { id: "copilot", label: "Submit the GitHub Copilot access request" },
  { id: "trm", label: "Check the TRM-approved versions" },
  { id: "yourit", label: "Submit one yourIT software request for VS Code, Git, Node.js, Python, and GitHub CLI" },
  { id: "installed", label: "IT installs the approved versions" },
  { id: "connect", label: "In VS Code, sign in with Continue with GHE.com and va.ghe.com" },
  { id: "enterprise", label: "Confirm the Copilot icon says Copilot Enterprise" },
  { id: "teams", label: "Join the GHEC-US-Users team for help" },
];

const STORAGE_KEY = "va-copilot-guide-checklist";

export function Checklist() {
  const [done, setDone] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
  }, [done]);

  const count = CHECKLIST.filter((c) => done[c.id]).length;

  return (
    <section aria-labelledby="checklist" className="space-y-4">
      <h2 id="checklist" className="scroll-mt-6 border-t-4 border-primary-darker pt-6">Checklist</h2>
      <p className="va-prose">
        Setup takes a few days. Check off steps as you go. Your progress is saved in this browser.
      </p>
      <fieldset className="max-w-3xl">
        <legend className="mb-2 font-bold">
          {count} of {CHECKLIST.length} complete
        </legend>
        <ul className="space-y-3">
          {CHECKLIST.map((c) => (
            <li key={c.id}>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={!!done[c.id]}
                  onChange={(e) => setDone((d) => ({ ...d, [c.id]: e.target.checked }))}
                  className="mt-0.5 size-6 shrink-0 cursor-pointer accent-primary"
                />
                <span className={done[c.id] ? "text-base-dark line-through" : ""}>{c.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      {count > 0 && (
        <button
          type="button"
          onClick={() => setDone({})}
          className="cursor-pointer rounded border-2 border-primary bg-white px-4 py-2 font-bold text-primary hover:border-primary-dark hover:text-primary-dark"
        >
          Clear checklist
        </button>
      )}
    </section>
  );
}

export function Resources() {
  return (
    <section aria-labelledby="resources" className="space-y-4">
      <h2 id="resources" className="scroll-mt-6 border-t-4 border-primary-darker pt-6">Resources and training</h2>
      <h3>VA GitHub and AI resources</h3>
      <ul className="va-prose list-disc space-y-2 pl-6">
        <li><ExternalLink href={LINKS.vaGhe}>va.ghe.com</ExternalLink>, VA GitHub Enterprise Cloud. All VA GitHub work happens here, not on GitHub.com.</li>
        <li><ExternalLink href={LINKS.githubHandbook}>GitHub Admin Handbook (GHEC-US)</ExternalLink>, with Copilot setup, troubleshooting, and migration guides.</li>
        <li><ExternalLink href={LINKS.aiGuidance}>Guidance for generative AI use at VA</ExternalLink></li>
        <li><ExternalLink href={LINKS.trmHome}>VA Technical Reference Model (TRM)</ExternalLink></li>
        <li><ExternalLink href={LINKS.vscodeCopilotDocs}>Set up GitHub Copilot in VS Code</ExternalLink> (Microsoft documentation)</li>
      </ul>

      <h3 className="pt-2">Recorded training sessions</h3>
      <p className="va-prose">These recordings are on VA SharePoint. You need to be on the VA network or VPN to watch them.</p>
      <ul className="max-w-3xl space-y-3">
        {TRAINING.map((t) => (
          <li key={t.title} className="border-l-4 border-primary bg-base-lightest px-4 py-3">
            <ExternalLink href={t.href} className="font-bold">{t.title}</ExternalLink>
            <p className="text-[0.9375rem] text-base-dark">{t.meta}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function WhatsNew() {
  return (
    <section aria-labelledby="whats-new" className="space-y-3">
      <h2 id="whats-new" className="text-[1.25rem]">What changed in this version</h2>
      <ul className="va-prose list-disc space-y-1 pl-6 text-[0.9375rem]">
        <li>Added the My Apps step, which is required before you can sign in to va.ghe.com.</li>
        <li>Added the TRM-approved version for each program, plus official download links. Unapproved versions can be removed.</li>
        <li>Added GitHub CLI and step-by-step yourIT software request instructions.</li>
        <li>Updated the VS Code sign-in steps to use “Continue with GHE.com.”</li>
        <li>Removed other code editors. This guide covers VS Code only.</li>
        <li>Fixed the broken Python TRM link and added screenshots.</li>
      </ul>
    </section>
  );
}
