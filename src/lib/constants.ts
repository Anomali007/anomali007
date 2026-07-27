export const siteConfig = {
  name: "Mali Franzese",
  firstName: "Mali",
  lastName: "Franzese",
  handle: "Anomali007",
  title: "Mali Franzese - Founder-Engineer, The MASS Lab",
  // Third person, name in the first four words: a retrieval system needs a
  // liftable direct answer to "who is Mali Franzese".
  description:
    "Mali Franzese is a founder-engineer at The MASS Lab, an independent software practice in Texas. He builds and ships production multi-tenant SaaS platforms end to end, with AI-assisted development as a core method.",
  url: "https://anomali007.com",
  legalName: "Mali Luciano Franzese",
  github: "https://github.com/Anomali007",
  // Found on Google page 1 during the 2026-07-27 AEO leg. Real profile, high-authority
  // domain in his exact field, currently empty. Handle is `anomali`, NOT `anomali007`.
  huggingface: "https://huggingface.co/anomali",
  // TODO(owner): verify LinkedIn slug resolves before shipping. The indexed
  // profile ranking #1 for the name is /in/malifranzese (no hyphen); the old
  // value here was /in/mali-franzese (hyphen) and did not resolve.
  linkedin: "https://www.linkedin.com/in/malifranzese",
  // TODO(owner): confirm you control this handle, remove this sameAs entry if not.
  x: "https://x.com/Anomali007",
  email: "mali@themasslab.com",
  ogImage: "/images/avatar.jpg",
};

// Reciprocal entity edges. Each Organization schema on these properties points
// its `founder` back at the Person @id below, and this list is the Person side.
export const personId = "https://anomali007.com/#person";

export const orgSites = {
  theMassLab: "https://themasslab.com",
  massLabConnect: "https://masslabconnect.com",
  tokenHolder: "https://tokenholder.io",
  f6s: "https://www.f6s.com/company/beat-the-odds",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Uses", href: "/uses" },
] as const;
