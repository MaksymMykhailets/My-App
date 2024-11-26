import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import CreatePostsScreen from "./CreatePostsScreen";

const Tab = createBottomTabNavigator();

const PostsScreen = ({ route, navigation }) => {
  const { userName, avatar, email } = route.params || {};

  const Header = ({ title }) => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Ionicons name="exit-outline" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );

  const MainPosts = () => (
    <View style={styles.contentContainer}>
      <Header title="Публікації" />
      <View style={styles.userInfo}>
        {avatar && <Image source={{ uri: avatar }} style={styles.userAvatar} />}
        <View>
          <Text style={styles.userName}>{userName || "Unknown User"}</Text>
          <Text style={styles.userEmail}>{email || "email@example.com"}</Text>
        </View>
      </View>
    </View>
  );

  const ProfileScreen = () => (
    <View style={styles.contentContainer}>
      <Header title="Профіль" />
      <Text style={styles.placeholder}>Це екран профілю</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Tab.Navigator
      screenOptions={({ route }) => ({
    tabBarStyle: route.name === "CreatePost" 
      ? { display: "none" }
      : {
          position: "absolute",
          backgroundColor: "inherit",
        },
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
  })}
>
  <Tab.Screen name="Posts" component={MainPosts} />
  <Tab.Screen name="CreatePost" component={CreatePostsScreen} />
  <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: "Roboto-Medium",
    color: "#212121",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  userName: {
    fontSize: 13,
    fontFamily: "Roboto-Bold",
    color: "#212121",
  },
  userEmail: {
    fontSize: 11,
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
  },
  placeholder: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default PostsScreen;
