import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../theme/colors";

import { SectionCard } from "./SharedBlocks";

const ProfileMobileView = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.wrap}>
        <Text style={styles.title}>Profile</Text>
        <SectionCard title="Overview" body="Identity details, role, and profile status." />
        <SectionCard title="Teams" body="Team memberships and responsibilities." />
        <SectionCard title="Projects" body="Project list and participation summary." />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileMobileView;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  wrap: { padding: 16 },
  title: { fontSize: 24, fontWeight: "800", color: colors.textPrimary, marginBottom: 12 },
});
