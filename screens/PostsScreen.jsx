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
import { useContext } from "react";
import { PostsContext } from "./PostsContext";
import PostList from "./PostList";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

const PostsScreen = ({ route, navigation }) => {
  const { userName, avatar, email } = route.params || {};
  const { posts } = useContext(PostsContext);

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
      {posts.length === 0 ? (
        <Text style={styles.noPostsText}>Немає постів</Text>
      ) : (
      <PostList posts={posts} navigation={navigation} avatar={avatar} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle:
            route.name === "CreatePost"
              ? { display: "none" }
              : {
                  position: "absolute",
                  backgroundColor: "#fff",
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
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: "Roboto-Medium",
    color: "#212121",
    flex: 1,
    textAlign: "center",
    marginLeft: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  userName: {
    fontSize: 13,
    fontFamily: "Roboto-Bold",
    color: "#212121",
  },
  userEmail: {
    color: "rgba(33, 33, 33, 0.80)",
    fontFamily: "Roboto-Regular",
    fontSize: 11,
  },
  noPostsText: {
    textAlign: "center",
    marginTop: 20,
    color: "#BDBDBD",
    fontSize: 16,
  },
  postContainer: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: "inherit",
    borderRadius: 8,
  },
  postActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentCount: {
    marginLeft: 4,
    fontSize: 16,
    color: "#757575",
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212121",
  },
  postLocation: {
    fontSize: 16,
    color: "#212121",
    textDecorationLine: "underline",
  },
  placeholder: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#757575",
  },
});

export default PostsScreen;
