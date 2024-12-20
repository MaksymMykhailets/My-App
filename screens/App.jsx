import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../db/firebase";
import { setUser, clearUser } from "../redux/users/slice";
import { selectIsAuthenticated } from "../redux/users/selectors";

import RegistrationScreen from "./RegistrationScreen";
import LoginScreen from "./LoginScreen";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = ({ route }) => {
  const params = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Posts") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "CreatePost") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FF6C00",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        },
      })}
    >
      <Tab.Screen name="Posts" component={PostsScreen} initialParams={params} />
      <Tab.Screen name="CreatePost" component={CreatePostsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppContent = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || "Guest",
          })
        );
      } else {
        dispatch(clearUser());
      }
      setIsAuthChecked(true);
    });

    return unsubscribe;
  }, [dispatch]);

  if (!isAuthChecked) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF6C00" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? "Home" : "Registration"}>
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={PostsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CommentsScreen"
          component={CommentsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default AppContent;
