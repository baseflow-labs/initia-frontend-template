import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../theme/colors";

import { FEATURE_VIEW_BY_KEY } from "./features/FeatureRegistry";

type Props = {
  title: string;
  routeKey: string;
};

export default function FeatureScreen({ title, routeKey }: Props) {
  const featureView = FEATURE_VIEW_BY_KEY[routeKey];
  if (featureView) return <>{featureView}</>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.wrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>Feature route: {routeKey}</Text>
        <Text style={styles.description}>
          This screen is wired for parity with the user web app route map and ready to bind shared
          services.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  wrap: { paddingHorizontal: 16, paddingTop: 20 },
  title: { fontSize: 24, fontWeight: "800", color: colors.textPrimary },
  description: { marginTop: 12, fontSize: 14, color: colors.textSecondary, lineHeight: 21 },
});
