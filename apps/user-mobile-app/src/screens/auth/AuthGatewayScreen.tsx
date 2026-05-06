import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../theme/colors";

import ForgotPasswordScreen from "./ForgotPasswordScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import ResetPasswordScreen from "./ResetPasswordScreen";

type Mode = "login" | "register" | "forgot" | "reset";

export default function AuthGatewayScreen() {
  const [mode, setMode] = useState<Mode>("login");
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.card}>
        {mode === "login" && (
          <LoginScreen goRegister={() => setMode("register")} goForgot={() => setMode("forgot")} />
        )}
        {mode === "register" && <RegisterScreen goLogin={() => setMode("login")} />}
        {mode === "forgot" && (
          <ForgotPasswordScreen goReset={() => setMode("reset")} goLogin={() => setMode("login")} />
        )}
        {mode === "reset" && <ResetPasswordScreen goLogin={() => setMode("login")} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background, justifyContent: "center", padding: 16 },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
});
