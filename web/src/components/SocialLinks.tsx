
import { SOCIALS } from "@/constants/socials";
import SocialIcon from "@/components/SocialIcon";

type SocialLinksProps = {
  socials: Partial<Record<(typeof SOCIALS)[number]["key"], string>>;
};

export default function SocialLinks({ socials }: SocialLinksProps) {
  return (
    <div className="flex items-center gap-4">
      {SOCIALS.map((social) => {
        const url = socials[social.key];

        if (!url) return null;

        return (
          <a
            key={social.key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            title={social.label}
          >
            <SocialIcon
              social={social.key}
              color={social.color}
            />
          </a>
        );
      })}
    </div>
  );
}
