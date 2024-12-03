import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../db/firebase";
import { setUser, clearUser } from "../redux/users/slice";

import RegistrationScreen from "./RegistrationScreen";
import LoginScreen from "./LoginScreen";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";

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
  const user = useSelector((state) => state.user.user);

  const [isUserChecked, setIsUserChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
          })
        );
      } else {
        dispatch(clearUser());
      }
      setIsUserChecked(true);
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Home" : "Registration"}>
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

export default AppContent;
