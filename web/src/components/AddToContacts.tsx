
"use client";

import type { PublicProfile } from "@/models/PublicProfile";

function escapeVCard(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export default function AddToContacts({
  profile,
}: {
  profile: PublicProfile;
}) {
  const downloadVCard = () => {
    const fullName =
      `${profile.first_name} ${profile.last_name}`.trim();

    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${escapeVCard(profile.last_name)};${escapeVCard(profile.first_name)};;;`,
      `FN:${escapeVCard(fullName)}`,
    ];

    // Entreprise
    if (profile.company) {
      lines.push(`ORG:${escapeVCard(profile.company)}`);
    }

    // Profession
    if (profile.profession) {
      lines.push(`TITLE:${escapeVCard(profile.profession)}`);
    }

    // Téléphone professionnel
    if (profile.phone_pro) {
      lines.push(
        `TEL;TYPE=WORK,VOICE:${escapeVCard(profile.phone_pro)}`
      );
    }

    // Email professionnel
    if (profile.email_pro) {
      lines.push(
        `EMAIL;TYPE=WORK:${escapeVCard(profile.email_pro)}`
      );
    }

    // Site web
    if (profile.website) {
      lines.push(`URL:${escapeVCard(profile.website)}`);
    }

    // Adresse
    if (profile.address || profile.localisation) {
      const address = [
        "",
        "",
        profile.address ?? "",
        profile.localisation ?? "",
        "",
        "",
      ]
        .map(escapeVCard)
        .join(";");

      lines.push(`ADR;TYPE=WORK:${address}`);
    }

    // Réseaux sociaux
    if (profile.socials) {
      Object.entries(profile.socials).forEach(([network, url]) => {
        if (url) {
          lines.push(
            `X-SOCIALPROFILE;TYPE=${network.toUpperCase()}:${escapeVCard(url)}`
          );
        }
      });
    }

    // Photo du profil (URL)
    if (profile.photo_url) {
      lines.push(`PHOTO;VALUE=URI:${escapeVCard(profile.photo_url)}`);
    }

    lines.push("END:VCARD");

    // Génération du fichier vCard 3.0
    const vcardContent = lines.join("\r\n") + "\r\n";

    const blob = new Blob([vcardContent], {
      type: "text/vcard;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const fileName = fullName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9-_]/g, "_");

    link.href = url;
    link.download = `${fileName || "contact"}.vcf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={downloadVCard}
      className="rounded-full bg-[#24152F] px-6 py-3 font-semibold text-white transition hover:bg-[#A879D1]"
    >
      Ajouter aux contacts
    </button>
  );
}
