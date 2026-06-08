import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { register } from "@initia/shared/api/auth";

import { colors } from "../../theme/colors";

type Props = { goLogin: () => void };

const RegisterScreen = ({ goLogin }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Register</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Full name" />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Pressable
        style={styles.cta}
        onPress={() =>
          void register({ email, password, passwordConfirmation: password, username: name })
        }
      >
        <Text style={styles.ctaText}>Create Account</Text>
      </Pressable>
      <Pressable onPress={goLogin}>
        <Text style={styles.link}>Already have an account?</Text>
      </Pressable>
    </View>
  );
};

export default RegisterScreen;
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
