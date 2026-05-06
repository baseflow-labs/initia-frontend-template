import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { login as loginApi } from "@initia/shared/api/auth";

import { login } from "../../store/actions/auth";
import { colors } from "../../theme/colors";

type Props = { goRegister: () => void; goForgot: () => void };

export default function LoginScreen({ goRegister, goForgot }: Props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("user@initia.dev");
  const [password, setPassword] = useState("password123");

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Login</Text>
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
          void loginApi({ email, password }).then((res) => {
            const payload = res.payload;
            if (!payload) return;
            dispatch(login(payload as never));
          })
        }
      >
        <Text style={styles.ctaText}>Sign In</Text>
      </Pressable>
      <Pressable onPress={goForgot}>
        <Text style={styles.link}>Forgot password?</Text>
      </Pressable>
      <Pressable onPress={goRegister}>
        <Text style={styles.link}>Create account</Text>
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
  link: { color: colors.accent, marginTop: 6 },
});
