
import { Suspense } from "react";
import { notFound } from "next/navigation";

import SocialLinks from "@/components/SocialLinks";
import { getPublicProfile } from "@/services/profile";

type PageProps = {
  params: Promise<{ userId: string }>;
};

export default function PublicProfilePage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#F8F4EE]">
          <p className="text-[#24152F]">
            Chargement de la carte VIKA...
          </p>
        </main>
      }
    >
      <ProfileContent params={params} />
    </Suspense>
  );
}

async function ProfileContent({ params }: PageProps) {
  const { userId } = await params;

  const profile = await getPublicProfile(userId);

  if (!profile) {
    notFound();
  }

  const fullName = `${profile.first_name} ${profile.last_name}`;

  return (
    <main className="min-h-screen bg-[#F8F4EE] px-4 py-12">
      <div className="mx-auto max-w-xl overflow-hidden rounded-3xl bg-white shadow-lg">

        {/* Photo et identité */}
        <div className="flex flex-col items-center px-6 py-10 text-center">
          {profile.photo_url ? (
            <img
              src={profile.photo_url}
              alt={fullName}
              className="h-28 w-28 rounded-full border-4 border-[#A879D1] object-cover"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#24152F] text-3xl font-bold text-white">
              {profile.first_name?.[0] ?? ""}
              {profile.last_name?.[0] ?? ""}
            </div>
          )}

          <h1 className="mt-5 text-3xl font-bold text-[#24152F]">
            {fullName}
          </h1>

          {profile.profession && (
            <p className="mt-2 text-lg text-gray-600">
              {profile.profession}
            </p>
          )}

          {profile.company && (
            <p className="mt-1 text-sm text-gray-500">
              {profile.company}
            </p>
          )}
        </div>

        {/* Coordonnées */}
        <div className="space-y-4 border-t border-gray-100 px-6 py-7">
          {(profile.phone_pro || profile.phone_number) && (
            <p>
              <strong>Téléphone :</strong>{" "}
              {profile.phone_pro || profile.phone_number}
            </p>
          )}

          {(profile.email_pro || profile.email) && (
            <p>
              <strong>Email :</strong>{" "}
              {profile.email_pro || profile.email}
            </p>
          )}

          {profile.address && (
            <p>
              <strong>Adresse :</strong> {profile.address}
            </p>
          )}

          {profile.localisation && (
            <p>
              <strong>Localisation :</strong> {profile.localisation}
            </p>
          )}

          {profile.website && (
            <p>
              <strong>Site web :</strong>{" "}
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A879D1] underline"
              >
                {profile.website}
              </a>
            </p>
          )}
        </div>

        {/* Réseaux sociaux */}
        <div className="border-t border-gray-100 px-6 py-7">
          <h2 className="mb-5 text-center text-lg font-semibold text-[#24152F]">
            Retrouvez-moi
          </h2>

          <div className="flex justify-center">
            <SocialLinks socials={profile.socials} />
          </div>
        </div>

        {/* Ajouter aux contacts */}
        <div className="px-6 pb-8">
          <button
            disabled
            className="w-full rounded-xl bg-[#24152F] px-6 py-4 font-semibold text-white opacity-60"
          >
            Ajouter aux contacts
          </button>
        </div>

      </div>
    </main>
  );
}
