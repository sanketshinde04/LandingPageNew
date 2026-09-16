export const siteConfig = {
  name: "Build Fast with AI",
  legalName: "Build Fast with AI",
  product: "DEPLOY",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://deploy.buildfastwithai.com",
  ogImage: "/deploy-og.png",
  contactEmail: "talk@buildfastwithai.com",
  twitterHandle: "@buildfastwithai",
  socials: {
    twitter: "https://twitter.com/buildfastwithai",
    linkedin: "https://www.linkedin.com/company/buildfastwithai",
    github: "https://github.com/buildfastwithai",
  },
  defaultTitle: "Forward-Deployed AI Engineers | AI POC to Production in 4-6 Weeks",
  defaultDescription:
    "Forward-deployed AI engineers embed with your team and take one workflow from POC to production in weeks. Fixed scope, your code, measured on your baseline.",
  keywords: [
    "forward deployed AI engineer",
    "forward deployed software engineer",
    "AI POC to production",
    "production AI systems",
    "AI implementation services",
    "enterprise AI deployment",
    "embedded AI engineers",
    "custom AI agent development",
    "AI workflow automation",
    "text to SQL LLM",
    "real time voice AI agent",
    "agentic AI architecture",
  ],
};

export function getCanonicalUrl(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${cleanPath === "/" ? "" : cleanPath}`;
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    email: siteConfig.contactEmail,
    sameAs: [
      siteConfig.socials.twitter,
      siteConfig.socials.linkedin,
      siteConfig.socials.github,
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.defaultDescription,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

export function generateServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Forward-Deployed AI Engineering & POC to Production",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    serviceType: "AI Engineering & Production Deployment",
    description:
      "Forward-deployed AI engineers embed with client teams to turn real business workflows into production AI systems with fixed scope and full code handover.",
    areaServed: "Global",
    url: siteConfig.url,
  };
}

export function generateFAQSchema(faqItems: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function generateArticleSchema({
  title,
  description,
  slug,
  datePublished,
  category,
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  category: string;
}) {
  const articleUrl = `${siteConfig.url}/proof/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url: articleUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    datePublished,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/icon.svg`,
      },
    },
    articleSection: category,
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteConfig.url}${item.url}`,
    })),
  };
}
