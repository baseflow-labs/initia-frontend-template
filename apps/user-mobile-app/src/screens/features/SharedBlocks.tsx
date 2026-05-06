import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme/colors";

export function SectionCard({ title, body }: { title: string; body: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardBody}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  cardTitle: { fontSize: 16, fontWeight: "700", color: colors.textPrimary },
  cardBody: { marginTop: 6, fontSize: 13, color: colors.textSecondary, lineHeight: 19 },
});
