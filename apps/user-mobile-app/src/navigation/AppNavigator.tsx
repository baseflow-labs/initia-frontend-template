import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { canAccessUserFeature, type UserPermission } from "@initia/core";

import { MOBILE_FEATURE_ROUTES } from "../features/routes";
import { useAppSelector } from "../store/hooks";
import AuthGatewayScreen from "../screens/auth/AuthGatewayScreen";
import FeatureScreen from "../screens/FeatureScreen";
import HomeScreen from "../screens/HomeScreen";

type RootStackParamList = {
  Home: undefined;
  Feature: { routeKey: string; title: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { accessToken, permissions, user } = useAppSelector((state) => state.auth);
  const isAuthenticated = Boolean(accessToken && accessToken !== "null");
  const isAdmin = user?.role === "admin";
  const accessibleRoutes = useMemo(
    () =>
      MOBILE_FEATURE_ROUTES.filter((item) =>
        canAccessUserFeature(
          { permission: item.permission },
          permissions as UserPermission[],
          isAdmin
        )
      ),
    [permissions, isAdmin]
  );
  const routeDictionary = useMemo(() => {
    return Object.fromEntries(accessibleRoutes.map((item) => [item.key, item]));
  }, [accessibleRoutes]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Home" options={{ title: "User App" }}>
              {({ navigation }) => (
                <HomeScreen
                  routes={accessibleRoutes}
                  navigateTo={(routeKey) => {
                    const target = routeDictionary[routeKey];
                    if (!target) return;
                    navigation.navigate("Feature", { routeKey: target.key, title: target.name });
                  }}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Feature" options={({ route }) => ({ title: route.params.title })}>
              {({ route }) => (
                <FeatureScreen routeKey={route.params.routeKey} title={route.params.title} />
              )}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="Home" component={AuthGatewayScreen} options={{ title: "Welcome" }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
