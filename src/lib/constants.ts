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
  // CONFIRMED by Mali 2026-07-27: no hyphen. The prior value /in/mali-franzese was
  // wrong and had been shipped in both the JSON-LD sameAs and the profile README.
  linkedin: "https://www.linkedin.com/in/malifranzese",
  // VERIFIED in-browser 2026-07-27: x.com/Anomali007 has display name "Anomali07",
  // 0 posts, 0 followers. x.com/themasslabdev has display name "Mali Franzese",
  // 0 posts, 3 followers. Use the one that carries his name.
  x: "https://x.com/themasslabdev",
  xHandle: "@themasslabdev",
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
