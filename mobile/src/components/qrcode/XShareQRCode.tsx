
import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system/legacy";

type ShareQRCodeProps = {
  userId: string;
  firstName: string;
  lastName: string;
};

export default function ShareQRCode({
  userId,
  firstName,
  lastName,
}: ShareQRCodeProps) {
  const qrRef = useRef<any>(null);

  const profileUrl = `https://vika-web.vercel.app/u/${userId}`;

  const shareQRCode = async () => {
    try {
      if (!qrRef.current) return;

      const isAvailable = await Sharing.isAvailableAsync();

      if (!isAvailable) {
        Alert.alert("Erreur", "Le partage n'est pas disponible.");
        return;
      }

      qrRef.current.toDataURL(async (base64: string) => {
        try {
          const fileUri =
            `${FileSystem.cacheDirectory}vika-${userId}.png`;

          await FileSystem.writeAsStringAsync(fileUri, base64, {
            encoding: FileSystem.EncodingType.Base64,
          });

          await Sharing.shareAsync(fileUri, {
            mimeType: "image/png",
            dialogTitle: `Partager la carte de ${firstName}`,
            UTI: "public.png",
          });
        } catch (error) {
          console.error("Erreur de partage :", error);
          Alert.alert("Erreur", "Impossible de partager le QR code.");
        }
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Une erreur est survenue.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        <QRCode
          value={profileUrl}
          size={220}
          color="#24152F"
          backgroundColor="#FFFFFF"
          getRef={(ref) => (qrRef.current = ref)}
        />
      </View>

      <Text style={styles.name}>
        {firstName} {lastName}
      </Text>

      <Text style={styles.description}>
        Scannez ce QR code pour découvrir ma carte professionnelle VIKA.
      </Text>

      <TouchableOpacity
        style={styles.shareButton}
        onPress={shareQRCode}
      >
        <Text style={styles.shareButtonText}>
          Partager mon QR code
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 24,
    backgroundColor: "#F8F4EE",
    borderRadius: 24,
  },
  qrContainer: {
    padding: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  name: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#24152F",
  },
  description: {
    marginTop: 8,
    marginBottom: 20,
    textAlign: "center",
    color: "#666666",
  },
  shareButton: {
    backgroundColor: "#24152F",
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
});
