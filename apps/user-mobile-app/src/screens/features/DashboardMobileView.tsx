import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../theme/colors";

import { SectionCard } from "./SharedBlocks";

export default function DashboardMobileView() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.wrap}>
        <Text style={styles.title}>Dashboard</Text>
        <SectionCard
          title="Overview"
          body="Daily summary, account health, and quick activity trends."
        />
        <SectionCard
          title="Recent Activity"
          body="Latest actions and notifications from your account."
        />
        <SectionCard
          title="Quick Actions"
          body="Fast access to profile, support tickets, and messaging."
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  wrap: { padding: 16 },
  title: { fontSize: 24, fontWeight: "800", color: colors.textPrimary, marginBottom: 12 },
});
