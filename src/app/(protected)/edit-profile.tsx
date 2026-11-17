import XButton from '@/components/XButton'
import XField from '@/components/XField'
import XRow from '@/components/XRow'
import XScreen from '@/components/XScreen'
import XText from '@/components/XText'
import useAuth from '@/hooks/useAuth'
import { auth, firestore, storage } from '@/libs/firebase'
import { getProfile } from '@/libs/profile.service'
import { ProfileItem } from '@/models/profile-item'
import { colors } from '@/utils/theme'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

const EditProfileScreen = () => {
  const { user, logout } = useAuth();

  const [fullName, setFullName] = useState("");
  const [profession, setProfession] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emailPro, setEmailPro] = useState("");

  const [localisation, setLocalisation] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [photoMimeType, setPhotoMimeType] = useState<string>("image/jpeg");
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(true);


  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;

      try {
        const data = (await getProfile(user.uid)) as ProfileItem | null;

        if (data) {
          setFullName(
            `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim()
          );

          setEmail(data.email ?? "");
          setEmailPro(data.email_pro ?? "");
          setProfession(data.profession ?? "");
          setCompany(data.company ?? "");
          setPhone(data.phone_pro ?? "");
          setLocalisation(data.localisation ?? "");
          setPhoto(data.photo_url ?? null);
          setPhotoBase64(null);
          setIsReady(false)
        }
      } catch (error) {
        console.error("Erreur chargement profil :", error);
      }
    }

    fetchProfile();
  }, [user?.uid]);


  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission refusée",
        "Autorise l'accès aux photos dans les réglages."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: true,
    });

    if (result.canceled || !result.assets.length) return;

    const asset = result.assets[0];

    if (!asset.base64) {
      Alert.alert("Erreur", "Impossible de lire cette image.");
      return;
    }

    setPhoto(asset.uri);
    setPhotoBase64(asset.base64);
    setPhotoMimeType(asset.mimeType ?? "image/jpeg");

    console.log("Format image :", asset.mimeType);
  };


  // sauvegarder
  const handleSave = async () => {
    if (!user) return;

    if (!fullName.trim()) {
      Alert.alert("Erreur", "Le nom est obligatoire.");
      return;
    }

    try {
      setLoading(true);

      let photo_url = photo;

      if (photo && !photo.startsWith("http")) {
        const response = await fetch(photo);
        const blob = await response.blob();

        const storageRef = ref(storage, `profiles/${user.uid}.jpg`);

        await uploadBytes(storageRef, blob, {
          contentType: "image/jpeg",
        });

        photo_url = await getDownloadURL(storageRef);
      }

      const names = fullName.trim().split(/\s+/);

      const first_name = names[0] ?? "";
      const last_name = names.slice(1).join(" ");

      await updateDoc(doc(firestore, "Profiles", user.uid), {
        first_name,
        last_name,
        profession: profession.trim() || null,
        company: company.trim() || null,
        phone_pro: phone.trim() || null,
        email_pro: emailPro.trim() || null,
        localisation: localisation.trim() || null,
        photo_url,
      });

      await updateProfile(
        auth.currentUser!,
        {
          displayName: fullName + " " + last_name,
          photoURL: photo_url,
        }
      );

      Alert.alert("Succès", "Profil mis à jour.");

    } catch (e) {
      console.error("Erreur sauvegarde :", e);
      Alert.alert("Erreur", "Impossible d'enregistrer le profil.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  }

  return (
    <XScreen paddingHorizontal={0} style={styles.screen}>
      {
        isReady ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size={"large"} color={colors.primary} />
          </View>
        ) : (
          <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            {/* Header */}
            <XRow
              justifyContent="space-between"
              width={"100%"}
              style={{ paddingHorizontal: 16 }}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={colors.text}
                onPress={handleBack}
              />
              <XText fontSize={18} fontWeight={700} textAlign="center">
                Modifier mon profil
              </XText>
              <Ionicons
                name="globe-outline"
                size={24}
                color={colors.text}
                onPress={() => router.navigate("/(protected)/social-network")}
              />
            </XRow>

            <ScrollView
              contentContainerStyle={styles.content}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* Avatar */}
              <View style={styles.avatarWrapper}>
                <Pressable onPress={pickImage}>
                  {photo ? (
                    <Image
                      source={{ uri: photo }}
                      style={styles.avatar}
                      resizeMode="cover"
                      onLoad={() => console.log("Photo chargée avec succès")}
                      onError={(error) => {
                        console.log("Erreur affichage photo :", error.nativeEvent);
                      }}
                    />
                  ) : (
                    <View style={[styles.avatar, styles.avatarEmpty]}>
                      <Ionicons
                        name="person"
                        size={56}
                        color={colors.textGrey}
                      />
                    </View>
                  )}

                  <View style={styles.camera}>
                    <Ionicons name="camera" size={18} color="white" />
                  </View>
                </Pressable>

                <TouchableOpacity
                  style={{ flexDirection: "row", justifyContent: "center", gap: 8, alignItems: "center" }}
                  onPress={() => {
                    logout();
                    router.replace("/(auth)/login");
                  }}
                >
                  <Ionicons
                    name="log-out-outline"
                    size={24}
                    color={colors.textGrey}
                  />
                  <XText
                    fontSize={14}
                    fontWeight={600}
                    color={colors.primary}
                  >
                    Logout
                  </XText>
                </TouchableOpacity>
              </View>

              <View style={styles.form}>
                <XField
                  label="Nom complet"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
                <XField
                  label="Profession"
                  value={profession}
                  onChangeText={setProfession}
                />
                <XField
                  label="Entreprise"
                  value={company}
                  onChangeText={setCompany}
                />
                <XField
                  label="Téléphone"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  autoComplete="tel"
                />
                <XField
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
                <XField
                  label="Localisation"
                  value={localisation}
                  onChangeText={setLocalisation}
                  rightIcon="chevron-down"
                />
              </View>

              <XButton width="100%" loading={loading} onPress={handleSave}>
                <XText fontSize={16} fontWeight={700} color="white">
                  Enregistrer
                </XText>
              </XButton>
            </ScrollView>
          </KeyboardAvoidingView>
        )
      }
    </XScreen>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    height: 56,
    justifyContent: "center",
  },
  back: { position: "absolute", left: 24, zIndex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 32 },
  avatarWrapper: { alignItems: "center", marginVertical: 16, gap: 8 },
  avatar: { width: 96, height: 96, borderRadius: 48 },
  avatarEmpty: {
    backgroundColor: colors.ternary,
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    position: "absolute",
    right: -4,
    bottom: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  form: { gap: 12, marginBottom: 24 },
});
