import { ProfileItem } from "@/models/profile-item";

const escapeVCard = (value: string): string => {
    return value
        .replace(/\\/g, "\\\\")
        .replace(/\n/g, "\\n")
        .replace(/;/g, "\\;")
        .replace(/,/g, "\\,");
};

export const generateVCard = (profile: ProfileItem): string => {
    const firstName = profile.first_name ?? "";
    const lastName = profile.last_name ?? "";

    const lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${escapeVCard(lastName)};${escapeVCard(firstName)};;;`,
        `FN:${escapeVCard(`${firstName} ${lastName}`.trim())}`,
    ];

    if (profile.company) {
        lines.push(`ORG:${escapeVCard(profile.company)}`);
    }

    if (profile.profession) {
        lines.push(`TITLE:${escapeVCard(profile.profession)}`);
    }

    if (profile.phone_pro) {
        lines.push(`TEL;TYPE=WORK,VOICE:${escapeVCard(profile.phone_pro)}`);
    }

    if (profile.email_pro) {
        lines.push(`EMAIL;TYPE=WORK:${escapeVCard(profile.email_pro)}`);
    }

    if (profile.website) {
        lines.push(`URL:${escapeVCard(profile.website)}`);
    }

    if (profile.address) {
        lines.push(
            `ADR;TYPE=WORK:;;${escapeVCard(profile.address)};;;;`
        );
    }

    if (profile.photo_url) {
        lines.push(`PHOTO;VALUE=URI:${escapeVCard(profile.photo_url)}`);
    }

    if (profile.localisation) {
        lines.push(`NOTE:${escapeVCard(`Localisation: ${profile.localisation}`)}`);
    }

    if (profile.socials) {
        Object.entries(profile.socials).forEach(([key, value]) => {
            if (value) {
                lines.push(`URL:${escapeVCard(value)}`);
            }
        });
    }

    lines.push("END:VCARD");

    return lines.join("\r\n");
};
