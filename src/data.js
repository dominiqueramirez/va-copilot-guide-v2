const trm = (tid) => `https://www.oit.va.gov/services/trm/ToolPage.aspx?tid=${tid}`;

export const LINKS = {
  githubSignup: "https://vaww.oit.va.gov/services/github/#signup",
  myApps: "https://myapps.microsoft.com",
  vaGhe: "https://va.ghe.com",
  copilotRequest: "https://va.ghe.com/github-admin/copilot/issues/new?template=copilot-onboarding.yml",
  yourIt: "https://yourit.va.gov",
  trmHome: "https://www.oit.va.gov/services/trm/",
  ghecUsUsers:
    "https://teams.microsoft.com/l/team/19%3AllDS-w05BiOnFMtP02NwDwix5Ku1xadJyXtP27NJlSg1%40thread.tacv2/conversations?groupId=71948235-4714-4643-a762-8b5a5a14abfb&tenantId=e95f1b23-abaf-45ee-821d-b7ab251ab3bf",
  copilotChannel:
    "https://teams.microsoft.com/l/channel/19:8VpVI7PrJX-zgpfBqWCL5GeAFJpgq6KvhnPh2WR3GD81%40thread.tacv2/General?groupId=be80977b-836f-4073-81b9-7d25433720d8&tenantId=e95f1b23-abaf-45ee-821d-b7ab251ab3bf",
  aiAtVa:
    "https://teams.microsoft.com/l/team/19:fRkqGgH2XIu1KBV6btlG062ts5vI3YF3KrTR7oFUJOA1%40thread.tacv2/conversations?groupId=a90b9cd1-43a9-4826-b9a8-aa0960ccbf02&tenantId=e95f1b23-abaf-45ee-821d-b7ab251ab3bf",
  githubHandbook: "https://department-of-veterans-affairs.github.io/github-handbook/",
  aiGuidance: "https://department.va.gov/ai/guidance-for-generative-ai-use-at-va/",
  vscodeCopilotDocs: "https://code.visualstudio.com/docs/copilot/setup",
};

export const SIGNUP_JUSTIFICATION = "access required for source control";
export const YOURIT_JUSTIFICATION = "The software is needed for AI automation. All software is TRM approved.";

// Approved versions read from each TRM Decision tab, November 2026.
export const SOFTWARE = [
  {
    id: "vscode",
    name: "Visual Studio Code (VS Code)",
    required: true,
    version: "1.x",
    trmId: 8371,
    vendor: "Microsoft",
    yourItSearch: "Visual Studio",
    yourItNote: "Typing “VS Code” won’t find it.",
    why: "The code editor where GitHub Copilot lives. Copilot chat, agent mode, and code suggestions all run inside VS Code.",
    downloads: [{ label: "Download VS Code", href: "https://code.visualstudio.com/download" }],
    downloadNote: "Any 1.x release is approved, so the current download is fine.",
  },
  {
    id: "git",
    name: "Git",
    required: true,
    version: "2.51.x",
    trmId: 6396,
    vendor: "Software Freedom Conservancy",
    yourItSearch: "Git",
    yourItNote: "Pick the entry from Software Freedom Conservancy.",
    why: "Version-control software that runs on your computer. It tracks changes to your files and lets Copilot save your work to GitHub.",
    downloads: [
      {
        label: "Git for Windows 2.51.2 (Windows)",
        href: "https://github.com/git-for-windows/git/releases/tag/v2.51.2.windows.1",
      },
      { label: "Git for macOS", href: "https://git-scm.com/downloads/mac" },
    ],
    downloadNote:
      "Don’t use the big download button on git-scm.com. It gives you the newest version, which isn’t approved. On Windows, choose Git-2.51.2-64-bit.exe. On a Mac there’s no simple installer, so ask IT to install a 2.51.x version.",
  },
  {
    id: "node",
    name: "Node.js",
    required: true,
    version: "22.x (LTS)",
    trmId: 6716,
    vendor: "Node.js Foundation",
    yourItSearch: "Node.js",
    yourItNote: "The list shows the approved version (22.x).",
    why: "Runs JavaScript on your computer. Many Copilot tools, MCP servers, and the web apps you build with Copilot need it.",
    downloads: [{ label: "Node.js 22 (latest 22.x release)", href: "https://nodejs.org/dist/latest-v22.x/" }],
    downloadNote:
      "Don’t use the default download on nodejs.org. It offers version 24 or newer, which isn’t approved. On Windows, choose the file ending in -x64.msi. On a Mac, choose the file ending in .pkg.",
  },
  {
    id: "python",
    name: "Python",
    required: true,
    version: "3.14.x",
    trmId: 5702,
    vendor: "Python Software Foundation",
    yourItSearch: "Python",
    yourItNote: "Choose the first result. It shows the approved version (3.14).",
    why: "The most common language for automation and data work. Copilot often writes Python scripts, and you need Python to run them.",
    downloads: [{ label: "Python 3.14.10", href: "https://www.python.org/downloads/release/python-31410/" }],
    downloadNote: "On Windows, choose the 64-bit installer. On a Mac, choose the macOS 64-bit universal2 installer.",
  },
  {
    id: "gh",
    name: "GitHub CLI (command line interface)",
    required: false,
    version: "2.x",
    trmId: 16191,
    vendor: "GitHub",
    yourItSearch: "GitHub Command Line Interface",
    yourItNote: "Typing “CLI” won’t find it. Start typing “GitHub Command” instead.",
    why: "Lets Copilot work with va.ghe.com for you, so you don’t have to commit, push, or clone repositories by hand. You can work without it, but it saves a lot of manual steps.",
    downloads: [
      { label: "GitHub CLI website", href: "https://cli.github.com/" },
      { label: "GitHub CLI releases", href: "https://github.com/cli/cli/releases/latest" },
    ],
    downloadNote: "All 2.x releases are approved, so the latest release is fine.",
  },
].map((s) => ({ ...s, trmUrl: trm(s.trmId) }));

export const TRAINING = [
  {
    title: "Copilot Resources, Tips & Tricks (Thursday series)",
    meta: "Nick Alteen and Tyler Garner • Aug 28, 2025 • Intermediate, ongoing series",
    href: "https://dvagov.sharepoint.com/sites/GitHubCopilot/Shared%20Documents/Forms/DispForm.aspx?ID=72&web=1&EntityRepresentationId=4cbb9d10-2362-4386-8592-304f99933f68",
  },
  {
    title: "Copilot MCP (Model Context Protocol)",
    meta: "OIT Chief AI Officer Team • Jun 18, 2025",
    href: "https://dvagov.sharepoint.com/sites/oitchiefaiofficerteam/Shared%20Documents/Forms/DispForm.aspx?ID=14&web=1&EntityRepresentationId=eb39ba70-3b0e-43ed-a1f6-5b7cc0060689",
  },
  {
    title: "Copilot Intro to Agent Mode",
    meta: "OIT Chief AI Officer Team • May 28, 2025",
    href: "https://dvagov.sharepoint.com/sites/oitchiefaiofficerteam/Shared%20Documents/Forms/DispForm.aspx?ID=13&web=1&EntityRepresentationId=69407f77-156e-4351-a365-e09207171286",
  },
];
