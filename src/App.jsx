import { Header, Footer, SideNav, OnThisPage, SkipLink } from "./components/Layout.jsx";
import { Alert, ExternalLink } from "./components/ui.jsx";
import {
  StepJoinGithub,
  StepRequestCopilot,
  StepApprovedVersions,
  StepRequestSoftware,
  StepConnectVscode,
  StepStartUsing,
} from "./components/Steps.jsx";
import { GetHelp, Troubleshooting, Checklist, Resources, WhatsNew } from "./components/Support.jsx";
import { LINKS } from "./data.js";

const PROCESS = [
  { id: "join-github", title: "Join VA GitHub", body: "Request the GitHub app in Microsoft My Apps. Then wait about an hour for your account to be created." },
  { id: "request-copilot", title: "Request Copilot access", body: "Sign in to va.ghe.com and submit the Copilot access form. Access usually comes within minutes." },
  { id: "approved-versions", title: "Find approved software versions", body: "Look up the TRM-approved version of VS Code, Git, Node.js, Python, and GitHub CLI." },
  { id: "request-software", title: "Request the software in yourIT", body: "Submit one software request. IT installs the approved versions, usually within a few days." },
  { id: "connect-vscode", title: "Connect Copilot to VS Code", body: "In VS Code, sign in with “Continue with GHE.com” and type va.ghe.com." },
  { id: "start-using", title: "Start using Copilot", body: "Check that you have Copilot Enterprise, choose a model, and let Copilot check your software." },
];

// VADS Process list: https://design.va.gov/components/process-list
function ProcessList() {
  return (
    <ol className="relative my-6 max-w-3xl">
      {PROCESS.map((p, i) => (
        <li key={p.id} className="relative pb-8 pl-14 last:pb-0">
          {i < PROCESS.length - 1 && <span aria-hidden="true" className="absolute top-10 bottom-0 left-[1.1875rem] w-2 bg-base-lighter" />}
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-full border-4 border-ink bg-white text-lg font-bold"
          >
            {i + 1}
          </span>
          <h3 className="pt-1.5">
            <span className="sr-only">Step {i + 1}: </span>
            {p.title}
          </h3>
          <p className="mt-1">
            {p.body} <a href={`#${p.id}`}>Go to step {i + 1}</a>
          </p>
        </li>
      ))}
    </ol>
  );
}

export default function App() {
  return (
    <>
      <SkipLink />
      <Header />
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="hidden pt-10 lg:block">
          <SideNav />
        </aside>
        <main id="main-content" tabIndex={-1} className="min-w-0 space-y-14 pt-10 outline-none">
          <div className="space-y-4">
            <h1>How to get GitHub Copilot in VS Code at VA</h1>
            <p className="va-prose text-[1.25rem] leading-normal text-base-darker">
              Use this guide to join VA GitHub, request GitHub Copilot, get the right TRM-approved software, and connect Copilot to
              Visual Studio Code (VS Code). It’s for VA employees and contractors who are new to Copilot.
            </p>
            <OnThisPage />
          </div>

          <section aria-labelledby="before-you-start" className="space-y-4">
            <h2 id="before-you-start" className="scroll-mt-6 border-t-4 border-primary-darker pt-6">Before you start</h2>
            <div className="va-prose">
              <p>
                <strong>GitHub Copilot</strong> is different from the Microsoft 365 Copilot you use in Outlook and Teams. It gives
                you AI models from Anthropic (Claude), Google (Gemini), OpenAI, and others inside VS Code, through VA’s enterprise
                license.
              </p>
            </div>
            <Alert status="info" heading="What you’ll need">
              <ul>
                <li>A connection to the VA network or VPN for every step. Several pages won’t load without it.</li>
                <li>A few days. Your account is ready in about an hour, but software installs through yourIT usually take a few days.</li>
                <li>
                  No personal GitHub.com account. VA creates your <strong>va.ghe.com</strong> account for you.
                </li>
              </ul>
            </Alert>
            <Alert status="warning" heading="No PII or PHI">
              <p>
                Don’t use GitHub Copilot with personally identifiable information (PII) or protected health information (PHI). Read{" "}
                <ExternalLink href={LINKS.aiGuidance}>VA’s guidance for generative AI use</ExternalLink>.
              </p>
            </Alert>
            <h3 className="pt-2">The steps at a glance</h3>
            <ProcessList />
          </section>

          <StepJoinGithub />
          <StepRequestCopilot />
          <StepApprovedVersions />
          <StepRequestSoftware />
          <StepConnectVscode />
          <StepStartUsing />
          <GetHelp />
          <Troubleshooting />
          <Checklist />
          <Resources />
          <WhatsNew />
        </main>
      </div>
      <Footer />
    </>
  );
}
