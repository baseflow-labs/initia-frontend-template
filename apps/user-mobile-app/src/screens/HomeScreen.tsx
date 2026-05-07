import { trackAnalysisEvent } from "@initia/analysis";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { MobileFeatureRoute } from "../features/routes";
import { colors } from "../theme/colors";

type Props = {
  routes: MobileFeatureRoute[];
  navigateTo: (routeKey: string) => void;
};

export default function HomeScreen({ routes, navigateTo }: Props) {
  const { t } = useTranslation();
  const items = useMemo(() => routes, [routes]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerWrap}>
        <Text style={styles.title}>{t("Global.Mobile.Title")}</Text>
        <Text style={styles.subtitle}>{t("Global.Mobile.Subtitle")}</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => {
              trackAnalysisEvent("mobile_feature_opened", { feature: item.key });
              navigateTo(item.key);
            }}
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  headerWrap: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
  title: { fontSize: 28, fontWeight: "800", color: colors.textPrimary },
  subtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
  card: {
    backgroundColor: colors.card,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
  },
  cardTitle: { fontSize: 16, fontWeight: "700", color: colors.textPrimary },
  cardDescription: { fontSize: 13, color: colors.textSecondary, marginTop: 6 },
});
