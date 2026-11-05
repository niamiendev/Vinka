import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="home" />
      <Stack.Screen name="carte" />
      <Stack.Screen name="qrcode" />
      <Stack.Screen name="edit-profile" />
      <Stack.Screen name="social-network" />
    </Stack>
  );
}
