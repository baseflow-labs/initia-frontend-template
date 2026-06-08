import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { requestPasswordReset } from "@initia/shared/api/auth";

import { colors } from "../../theme/colors";

type Props = { goReset: () => void; goLogin: () => void };
const ForgotPasswordScreen = ({ goReset, goLogin }: Props) => {
  const [email, setEmail] = useState("");
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
      <Pressable style={styles.cta} onPress={() => void requestPasswordReset(email).then(goReset)}>
        <Text style={styles.ctaText}>Send Reset Link</Text>
      </Pressable>
      <Pressable onPress={goLogin}>
        <Text style={styles.link}>Back to login</Text>
      </Pressable>
    </View>
  );
};

export default ForgotPasswordScreen;
const styles = StyleSheet.create({
  wrap: { gap: 10 },
  title: { fontSize: 26, fontWeight: "800", color: colors.textPrimary, marginBottom: 8 },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  cta: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 4,
  },
  ctaText: { color: "#fff", fontWeight: "700" },
  link: { color: colors.accent, marginTop: 6 },
});
