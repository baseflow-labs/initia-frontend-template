import { SystemMetadata } from "@/types/landing";

type LinkItem = { url: string; platform: string };
type Props = {
  title?: string;
  subtitle?: string;
  content?: Record<string, unknown>;
  systemMetadata?: SystemMetadata;
};

const getMetadataLinks = (systemMetadata?: SystemMetadata): LinkItem[] =>
  [
    {
      platform: "Facebook",
      url: systemMetadata?.socialFacebook || systemMetadata?.socialLinks?.facebook,
    },
    {
      platform: "Instagram",
      url: systemMetadata?.socialInstagram || systemMetadata?.socialLinks?.instagram,
    },
    {
      platform: "LinkedIn",
      url: systemMetadata?.socialLinkedin || systemMetadata?.socialLinks?.linkedin,
    },
    { platform: "X", url: systemMetadata?.socialTwitter || systemMetadata?.socialLinks?.twitter },
    { platform: "YouTube", url: systemMetadata?.socialYoutube },
    { platform: "TikTok", url: systemMetadata?.socialTiktok },
    { platform: "GitHub", url: systemMetadata?.socialLinks?.github },
  ].filter((link): link is LinkItem => Boolean(link.url));

const getLinks = (content?: Record<string, unknown>): LinkItem[] => {
  const raw = content?.links;
  if (!Array.isArray(raw)) return [];
  return raw.map((l) => {
    const obj = typeof l === "object" && l !== null ? (l as Record<string, unknown>) : {};
    return { url: String(obj.url || "#"), platform: String(obj.platform || "Link") };
  });
};

const SocialLinksSection = ({ title, subtitle, content, systemMetadata }: Props) => {
  const metadataLinks = getMetadataLinks(systemMetadata);
  const links = metadataLinks.length > 0 ? metadataLinks : getLinks(content);

  return (
    <section className="py-5">
      <div className="container">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
        <div className="d-flex gap-2 flex-wrap">
          {links.map((l, i) => (
            <a key={i} className="btn btn-outline-secondary" href={l.url}>
              {l.platform}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialLinksSection;
