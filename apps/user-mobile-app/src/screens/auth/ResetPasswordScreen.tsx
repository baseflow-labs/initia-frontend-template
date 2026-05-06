import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { resetPassword } from "@initia/shared/api/auth";

import { colors } from "../../theme/colors";

type Props = { goLogin: () => void };
export default function ResetPasswordScreen({ goLogin }: Props) {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
      <TextInput
        style={styles.input}
        value={token}
        onChangeText={setToken}
        placeholder="Reset token"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="New password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={confirm}
        onChangeText={setConfirm}
        placeholder="Confirm password"
        secureTextEntry
      />
      <Pressable
        style={styles.cta}
        onPress={() => void resetPassword({ email, token, newPassword: password }).then(goLogin)}
      >
        <Text style={styles.ctaText}>Update Password</Text>
      </Pressable>
    </View>
  );
}
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
});
