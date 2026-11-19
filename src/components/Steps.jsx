import { Alert, ActionLink, CopyText, ExternalLink, Screenshot, AdditionalInfo, StepHeading, Tag } from "./ui.jsx";
import { LINKS, SIGNUP_JUSTIFICATION, YOURIT_JUSTIFICATION, SOFTWARE } from "../data.js";

export function StepJoinGithub() {
  return (
    <section aria-labelledby="join-github" className="space-y-4">
      <StepHeading id="join-github" step={1}>Join VA GitHub (Enterprise Cloud)</StepHeading>
      <div className="va-prose">
        <p>
          GitHub Copilot is only available through VA’s own GitHub site at <strong>va.ghe.com</strong>. VA creates your account
          there automatically through Entra ID (your normal VA sign-in). To start that, you request one app in Microsoft My Apps.
        </p>
        <p>
          The official instructions are on the{" "}
          <ExternalLink href={LINKS.githubSignup}>VA GitHub sign-up page</ExternalLink> (VA network only). Here are the same steps:
        </p>
        <ol>
          <li>
            Go to <ExternalLink href={LINKS.myApps}>myapps.microsoft.com</ExternalLink> and sign in with your VA account.
          </li>
          <li>
            Select <strong>Add apps</strong> at the top of the page, then choose <strong>Request new apps</strong>.
          </li>
          <li>
            Search for <strong>GitHub</strong>. On the <strong>GitHub Enterprise Managed User (OIDC)</strong> app, select{" "}
            <strong>Add</strong>.
          </li>
          <li>
            For the justification, copy and paste this text exactly:
            <br />
            <CopyText text={SIGNUP_JUSTIFICATION} />
          </li>
          <li>Submit the request. It’s approved automatically, and a message at the top of the page confirms it.</li>
        </ol>
      </div>

      <Alert status="warning" heading="Use the exact justification text">
        <p>If the justification is missing or too long, you’ll get an error. Nobody reviews these requests by hand, so it won’t be fixed for you.</p>
      </Alert>

      <Screenshot
        src="01-myapps-add-apps.jpg"
        alt="Microsoft My Apps page with the Add apps menu open, showing Request new apps."
        caption="In My Apps, select Add apps, then Request new apps."
      />
      <Screenshot
        src="02-signup-instructions.jpg"
        alt="VA GitHub sign-up page listing the steps to request the GitHub Enterprise Managed User (OIDC) app and the troubleshooting errors."
        caption="The steps on the VA GitHub sign-up page. Note the justification text and the 40-minute wait."
      />

      <div className="va-prose">
        <h3>Wait about 40 minutes</h3>
        <p>
          Entra ID needs time to create your GitHub account. VA says about 40 minutes, but people have reported waiting longer.
          Give it an hour before you try the next step. You may get an email when it’s ready.
        </p>
      </div>

      <Alert status="info" heading="You don’t need a personal GitHub.com account">
        <p>
          Don’t create a GitHub.com account with your personal or VA email. Your va.ghe.com account is created for you and uses
          single sign-on. An older version of this guide got this wrong.
        </p>
      </Alert>
    </section>
  );
}

export function StepRequestCopilot() {
  return (
    <section aria-labelledby="request-copilot" className="space-y-4">
      <StepHeading id="request-copilot" step={2}>Sign in to va.ghe.com and request Copilot</StepHeading>
      <div className="va-prose">
        <ol>
          <li>
            Go directly to <ExternalLink href={LINKS.vaGhe}>va.ghe.com</ExternalLink>. You’re signed in with VA single sign-on.
          </li>
          <li>
            Open the <ExternalLink href={LINKS.copilotRequest}>GitHub Copilot access request form</ExternalLink>.
          </li>
          <li>Read the instructions on the form.</li>
          <li>
            Check the box that says you’ve read the instructions, then select <strong>Create</strong>.
          </li>
        </ol>
        <p>Copilot access is usually granted within a few minutes.</p>
      </div>

      <ActionLink href={LINKS.copilotRequest}>Request GitHub Copilot access</ActionLink>

      <Screenshot
        src="03-copilot-access-form.jpg"
        alt="GitHub Copilot Access Request form on va.ghe.com with the acknowledgment checkbox."
        caption="The Copilot access request form. Check the acknowledgment box, then select Create."
      />

      <Alert status="info" heading="Seeing “Unsuccessful OIDC authorization, no access to Enterprise”?">
        <p>Your account isn’t ready yet. Make sure you finished step 1, wait a little longer, then try va.ghe.com again.</p>
      </Alert>
    </section>
  );
}

function SoftwareCard({ s }) {
  return (
    <article className="border border-base-lighter p-5" aria-labelledby={`sw-${s.id}`}>
      <div className="flex flex-wrap items-center gap-2">
        <h4 id={`sw-${s.id}`} className="text-[1.125rem]">{s.name}</h4>
        {s.required ? <Tag tone="blue">Required</Tag> : <Tag tone="green">Recommended</Tag>}
      </div>
      <p className="mt-1 font-bold">
        Approved version: <span className="font-mono">{s.version}</span>
      </p>
      <p className="mt-2 text-[0.9375rem]">{s.why}</p>
      <ul className="mt-3 space-y-1 text-[0.9375rem]">
        <li>
          <ExternalLink href={`${s.trmUrl}&tab=2`}>TRM decision matrix for {s.name.split(" (")[0]}</ExternalLink>
        </li>
        {s.downloads.map((d) => (
          <li key={d.href}>
            <ExternalLink href={d.href}>{d.label}</ExternalLink>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[0.9375rem] text-base-darker">{s.downloadNote}</p>
    </article>
  );
}

export function StepApprovedVersions() {
  return (
    <section aria-labelledby="approved-versions" className="space-y-4">
      <StepHeading id="approved-versions" step={3}>Find the TRM-approved software versions</StepHeading>
      <div className="va-prose">
        <p>
          While your accounts are set up, request the software you need. VA’s Technical Reference Model (TRM) lists which
          versions of each program are approved.
        </p>
      </div>

      <Alert status="warning" heading="Install the approved version, not the newest one">
        <p>
          IT runs checks that remove software versions the TRM doesn’t approve, without warning you. People have installed the
          newest Node.js, built an app with it, then found Node.js gone the next time they signed in. The newest Node.js is version
          24 or later, but only 22.x is approved.
        </p>
      </Alert>

      <div className="va-prose">
        <h3>How to read a TRM decision matrix</h3>
        <ol>
          <li>Open the TRM page for the software and select the <strong>Decision</strong> tab.</li>
          <li>
            Scroll to the decision matrix. Find the column for the current period, then the row marked{" "}
            <strong>Authorized</strong> or <strong>Authorized w/ Constraints</strong>.
          </li>
          <li>
            The version in that row is the one to install. An “.x” means any version in that series. For example, “22.x” covers
            22.0 through 22.99.
          </li>
        </ol>
      </div>

      <Screenshot
        src="04-trm-decision-vscode.jpg"
        alt="TRM decision matrix for Visual Studio Code. The current column shows version 1.x as Authorized with Constraints."
        caption="TRM decision matrix for VS Code. Version 1.x is authorized in the current period."
      />
      <Screenshot
        src="05-trm-decision-gh-cli.jpg"
        alt="TRM decision matrix for GitHub Command Line Interface. Version 2.x is Authorized with Constraints."
        caption="TRM decision matrix for GitHub CLI. Version 2.x is authorized."
      />

      <h3 className="pt-2">Approved versions (checked November 2026)</h3>
      <div className="relative overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-[0.9375rem]">
          <caption className="sr-only">TRM-approved software versions for GitHub Copilot</caption>
          <thead>
            <tr className="bg-base-lightest">
              <th scope="col" className="border border-base-light px-3 py-2">Software</th>
              <th scope="col" className="border border-base-light px-3 py-2">Approved version</th>
              <th scope="col" className="border border-base-light px-3 py-2">TRM decision</th>
              <th scope="col" className="border border-base-light px-3 py-2">Official download</th>
            </tr>
          </thead>
          <tbody>
            {SOFTWARE.map((s) => (
              <tr key={s.id}>
                <th scope="row" className="border border-base-light px-3 py-2 font-bold">
                  {s.name}
                  {!s.required && <span className="block text-sm font-normal text-base-dark">Recommended</span>}
                </th>
                <td className="border border-base-light px-3 py-2 font-mono">{s.version}</td>
                <td className="border border-base-light px-3 py-2">
                  <ExternalLink href={`${s.trmUrl}&tab=2`}>Decision matrix</ExternalLink>
                  <br />
                  <ExternalLink href={s.trmUrl} className="text-sm">TRM entry</ExternalLink>
                </td>
                <td className="border border-base-light px-3 py-2">
                  {s.downloads.map((d, i) => (
                    <span key={d.href}>
                      {i > 0 && <br />}
                      <ExternalLink href={d.href}>{d.label}</ExternalLink>
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="va-prose text-[0.9375rem] text-base-dark">
        Approved versions change. Always check the decision matrix before you install or request software.
      </p>

      <h3 className="pt-2">What each program does</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {SOFTWARE.map((s) => (
          <SoftwareCard key={s.id} s={s} />
        ))}
      </div>

      <Alert status="info" heading="Only download from official sites">
        <p>
          The TRM says freeware may only be downloaded from the creator’s own site, never from third-party download sites. If
          you already have an AI tool, ask it for the <em>official</em> download page for the approved version.
        </p>
      </Alert>

      <AdditionalInfo trigger="See the official download pages">
        <Screenshot src="06-download-vscode.jpg" alt="Visual Studio Code download page with Windows, Linux, and Mac options." caption="code.visualstudio.com/download" />
        <Screenshot src="07-download-python.jpg" alt="Python 3.14.10 release page on python.org." caption="python.org release page for Python 3.14.10" />
        <Screenshot
          src="08-download-git.jpg"
          alt="Git for Windows 2.51.2 release assets with the Git-2.51.2-64-bit.exe installer highlighted."
          caption="Git for Windows 2.51.2. Most VA Windows computers need Git-2.51.2-64-bit.exe."
        />
        <Screenshot src="09-download-node.jpg" alt="Node.js download archive page for version 22 LTS." caption="Node.js 22.x (LTS) download page" />
        <Screenshot src="10-download-gh-cli.jpg" alt="GitHub CLI release page on GitHub with downloadable installers." caption="GitHub CLI release page" />
      </AdditionalInfo>
    </section>
  );
}

export function StepRequestSoftware() {
  return (
    <section aria-labelledby="request-software" className="space-y-4">
      <StepHeading id="request-software" step={4}>Request the software in yourIT</StepHeading>
      <div className="va-prose">
        <p>You can’t install this software yourself. Submit one software request in yourIT for all five programs.</p>
        <ol>
          <li>
            Go to <ExternalLink href={LINKS.yourIt}>yourit.va.gov</ExternalLink>, select <strong>Submit a Request</strong>, and
            choose the <strong>Software Request</strong> form.
          </li>
          <li>
            For “Are you submitting this request on behalf of someone else?”, choose <strong>No</strong>. Your information fills in
            automatically. Complete the other required fields, like phone number and employee type.
          </li>
          <li>
            Don’t type in the <strong>Select Software On Demand</strong> box. It will reject these programs. Instead, check{" "}
            <strong>Click here for additional approved software options</strong>.
          </li>
          <li>Under “Choose approved software from list below,” search for and add each program (see the table below).</li>
          <li>
            For the justification, enter:
            <br />
            <CopyText text={YOURIT_JUSTIFICATION} />
          </li>
          <li>
            Select <strong>Next</strong>, review your request, then select <strong>Next</strong> again.
          </li>
          <li>
            You’ll probably see an error. Scroll down, check the acknowledgment box that you agree to the software’s constraints,
            then submit.
          </li>
        </ol>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-[0.9375rem]">
          <caption className="mb-2 text-left font-bold">What to type in the yourIT software search</caption>
          <thead>
            <tr className="bg-base-lightest">
              <th scope="col" className="border border-base-light px-3 py-2">Software</th>
              <th scope="col" className="border border-base-light px-3 py-2">Type this</th>
              <th scope="col" className="border border-base-light px-3 py-2">Tip</th>
            </tr>
          </thead>
          <tbody>
            {SOFTWARE.map((s) => (
              <tr key={s.id}>
                <th scope="row" className="border border-base-light px-3 py-2">{s.name}</th>
                <td className="border border-base-light px-3 py-2 font-mono">{s.yourItSearch}</td>
                <td className="border border-base-light px-3 py-2">{s.yourItNote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Screenshot src="11-yourit-home.jpg" alt="yourIT home page with the Submit a Request option." caption="Start from yourit.va.gov and select Submit a Request." />
      <Screenshot
        src="12-yourit-additional-software.jpg"
        alt="yourIT software request form showing the Select Software On Demand field and the checkbox Click here for additional approved software options."
        caption="Skip “Select Software On Demand.” Check “Click here for additional approved software options” instead."
      />
      <Screenshot
        src="13-yourit-search-gh-cli.jpg"
        alt="yourIT approved software search showing GitHub Command Line Interface 2.x in the results."
        caption="Search by full name. “GitHub Command Line Interface” appears, but “CLI” alone finds nothing."
      />
      <Screenshot
        src="14-yourit-justification.jpg"
        alt="yourIT form with five approved software items selected and the justification text entered."
        caption="All five programs selected, with the justification filled in."
      />
      <Screenshot
        src="15-yourit-acknowledge.jpg"
        alt="yourIT review page with an error message and the acknowledgment checkbox below it."
        caption="If you see an error on the review page, scroll down and check the acknowledgment box."
      />

      <Alert status="info" heading="This can take a few days">
        <p>
          When IT contacts you, send them the TRM and download links from step 3 so they install the right versions. If they ask
          why you need the software, tell them it’s approved on the TRM and needed for AI automation.
        </p>
      </Alert>
    </section>
  );
}

export function StepConnectVscode() {
  return (
    <section aria-labelledby="connect-vscode" className="space-y-4">
      <StepHeading id="connect-vscode" step={5}>Connect GitHub Copilot to VS Code</StepHeading>
      <div className="va-prose">
        <p>
          Before you start, you need to have finished steps 1 and 2, have VS Code installed, and be on the VA network or VPN.
          Copilot is built into VS Code, so you don’t need to install a separate extension.
        </p>
      </div>

      <Alert status="success" heading="Tip: sign in to va.ghe.com in your browser first">
        <p>
          Open <ExternalLink href={LINKS.vaGhe}>va.ghe.com</ExternalLink> and make sure you’re signed in before you connect VS
          Code. This avoids the most common sign-in error.
        </p>
      </Alert>

      <div className="va-prose">
        <ol>
          <li>Open VS Code.</li>
          <li>
            In the bottom-right corner, select the Copilot icon, then select <strong>Use AI Features</strong>.
          </li>
          <li>
            A “Sign in to use GitHub Copilot” window opens. <strong>Don’t</strong> choose GitHub, Google, or Apple. Select{" "}
            <strong>Continue with GHE.com</strong> at the bottom.
          </li>
          <li>
            When asked “What is your GHE.com instance?”, type this and press Enter:
            <br />
            <CopyText text="va.ghe.com" />
          </li>
          <li>
            Your browser opens. Sign in with VA single sign-on if asked, then select <strong>Authorize</strong>.
          </li>
          <li>
            When the browser asks to open Visual Studio Code, select <strong>Open</strong>.
          </li>
          <li>If VS Code offers a free Copilot plan, close that offer. You’re using VA’s enterprise license.</li>
        </ol>
      </div>

      <Screenshot
        src="16-vscode-use-ai-features.jpg"
        alt="VS Code with the Copilot menu open in the bottom-right corner, showing Use AI Features."
        caption="Select the Copilot icon in the bottom-right corner, then Use AI Features."
      />
      <Screenshot
        src="17-vscode-continue-ghe.jpg"
        alt="VS Code Sign in to use GitHub Copilot window with buttons for GitHub, Google, and Apple, and a Continue with GHE.com link at the bottom."
        caption="Ignore the large buttons. Select “Continue with GHE.com” at the bottom."
      />
      <Screenshot
        src="18-vscode-ghe-instance.jpg"
        alt="VS Code prompt at the top of the window asking What is your GHE.com instance?"
        caption="Type va.ghe.com in the box at the top of VS Code and press Enter."
      />
      <Screenshot
        src="20-authorize-vscode.jpg"
        alt="Browser page asking you to authorize Visual Studio Code to access GitHub Enterprise."
        caption="In the browser, authorize VS Code."
      />
      <Screenshot
        src="21-open-vscode.jpg"
        alt="Browser dialog asking to open Visual Studio Code."
        caption="Select Open to go back to VS Code."
      />

      <Alert status="error" heading="Seeing “Failed to sign in to GHE.com”?">
        <ol>
          <li>Check that you’re on the VA network or VPN.</li>
          <li>Open va.ghe.com in your browser and sign in.</li>
          <li>
            Go back to VS Code, select <strong>Retry</strong>, and repeat the sign-in steps.
          </li>
        </ol>
        <p>
          If it still fails, ask for help in the <ExternalLink href={LINKS.ghecUsUsers}>GHEC-US-Users team</ExternalLink>.
        </p>
      </Alert>
      <Screenshot
        src="19-vscode-sign-in-failed.jpg"
        alt="VS Code dialog: Failed to sign in to GHE.com. Would you like to try again? You must be signed in to use AI features."
        caption="This error usually means you weren’t signed in to va.ghe.com in your browser yet."
      />
    </section>
  );
}

export function StepStartUsing() {
  return (
    <section aria-labelledby="start-using" className="space-y-4">
      <StepHeading id="start-using" step={6}>Confirm your access and start using Copilot</StepHeading>

      <div className="va-prose">
        <h3>Check that you have Copilot Enterprise</h3>
        <p>
          Select the Copilot icon in the bottom-right corner. It should say <strong>Copilot Enterprise</strong> and show how much
          of your monthly usage you’ve used. If it says <strong>Free</strong>, you’re signed in with the wrong account. Sign out
          and repeat step 5 using “Continue with GHE.com.”
        </p>
      </div>
      <Screenshot
        narrow
        src="22-copilot-enterprise-status.jpg"
        alt="Copilot status menu in VS Code showing Copilot Enterprise and usage at 0 percent."
        caption="A working setup shows “Copilot Enterprise.”"
      />

      <div className="va-prose">
        <h3>Choose a model</h3>
        <p>
          Below the chat box, select the model picker (it says <strong>Auto</strong> by default). You can choose models from
          Anthropic (Claude), Google (Gemini), OpenAI, and others. Select the arrow next to a model to see how much of your
          usage it consumes. More powerful models give more detailed answers, but they take longer and use more of your monthly
          allowance.
        </p>
      </div>
      <Screenshot
        narrow
        src="23-model-picker.jpg"
        alt="Copilot chat model picker in VS Code listing available AI models."
        caption="The model picker below the chat box."
      />

      <div className="va-prose">
        <h3>Make a folder for your projects</h3>
        <p>
          Create a folder such as <strong>VS Code Apps</strong>, either in OneDrive or on your computer. Make a new subfolder for
          each project, then open that subfolder in VS Code (<strong>File &gt; Open Folder</strong>). Each project then gets a
          fresh start for Copilot, and your work stays organized.
        </p>

        <h3>Let Copilot check your software</h3>
        <p>Once IT installs your software, ask Copilot in the chat:</p>
        <p>
          <CopyText text="Are Python, Node.js, and Git set up and running?" />
        </p>
        <p>
          Copilot runs some checks and asks you to <strong>Allow</strong> each command. It will also offer to fix common problems,
          such as adding Python to your PATH or setting your Git name and email. If you have GitHub CLI, ask:{" "}
          <em>“I have GitHub CLI installed. Please set it up for me.”</em>
        </p>
        <p>
          To stop approving every command, change <strong>Default permissions</strong> below the chat box to{" "}
          <strong>Autopilot</strong>. Only do this once you’re comfortable with what Copilot does, and keep an eye on the
          commands it runs.
        </p>
      </div>
      <div className="flex flex-wrap gap-6">
        <Screenshot
          widthClass="max-w-[240px]"
          src="24-agent-permissions.jpg"
          alt="Copilot chat panel in VS Code with the Default permissions menu open and Autopilot listed."
          caption="Default permissions menu below the chat box."
        />
        <Screenshot
          widthClass="max-w-[300px]"
          src="25-ai-checks-software.jpg"
          alt="Copilot chat summary saying Python, Node.js, and Git are installed, with notes about Git user settings and the Python PATH."
          caption="Copilot reports what’s installed and what still needs setup."
        />
      </div>
    </section>
  );
}
