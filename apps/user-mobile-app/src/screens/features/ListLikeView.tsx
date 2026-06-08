import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../theme/colors";

import { SectionCard } from "./SharedBlocks";

const ListLikeView = ({ title, lines }: { title: string; lines: string[] }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.wrap}>
        <Text style={styles.title}>{title}</Text>
        {lines.map((line) => (
          <SectionCard key={line} title={line} body="Connected to shared route and state flow." />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListLikeView;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  wrap: { padding: 16 },
  title: { fontSize: 24, fontWeight: "800", color: colors.textPrimary, marginBottom: 12 },
});
