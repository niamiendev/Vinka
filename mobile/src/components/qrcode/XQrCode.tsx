
import useAuth from "@/hooks/useAuth";
import { getProfile } from "@/libs/profile.service";
import { ProfileItem } from "@/models/profile-item";
import { generateVCard } from "@/utils/generateVCard";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

type Props = {
    size?: number;
};

export const XQrcode = ({ size = 150 }: Props) => {
    const { user } = useAuth();

    const [vCard, setVCard] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function fetchProfile() {
            if (!user) {
                setVCard("");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                const profile = (await getProfile(
                    user.uid
                )) as ProfileItem | null;

                if (!isMounted) return;

                if (profile) {
                    const data = generateVCard(profile);
                    setVCard(data);
                } else {
                    setVCard("");
                }
            } catch (error) {
                console.error("Erreur chargement profil :", error);

                if (isMounted) {
                    setVCard("");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchProfile();

        return () => {
            isMounted = false;
        };
    }, [user?.uid]);

    if (loading) {
        return (
            <View
                style={{
                    width: size,
                    height: size,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="small" />
            </View>
        );
    }

    if (!vCard) {
        return null;
    }

    return <QRCode value={vCard} size={size} logo={require("@/assets/images/icon.png")} logoSize={size / 4} />;
};
