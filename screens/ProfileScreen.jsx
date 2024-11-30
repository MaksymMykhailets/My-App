import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useContext } from "react";
import { PostsContext } from "./PostsContext";
import PostList from "./PostList"; 

const ProfileScreen = ({ navigation, route }) => {
  const { userName: routeUserName, avatar: routeAvatar, posts: routePosts } = route.params || {};
  const [user, setUser] = useState({ userName: routeUserName, avatar: routeAvatar });
  const { posts: contextPosts } = useContext(PostsContext);

  useEffect(() => {
    if (!routeUserName && !routeAvatar) {
      const fetchUserData = async () => {
        try {
          const storedUser = await AsyncStorage.getItem("user");
          const userData = storedUser ? JSON.parse(storedUser) : {};
          setUser(userData);
        } catch (error) {
          Alert.alert("Помилка", "Не вдалося завантажити дані користувача");
        }
      };

      fetchUserData();
    }
  }, [routeUserName, routeAvatar]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Доступ до галереї заборонено!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const newAvatar = result.assets[0].uri;
      setUser((prev) => ({ ...prev, avatar: newAvatar }));

      const updatedUser = { ...user, avatar: newAvatar };
      try {
        await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      } catch (error) {
        Alert.alert("Помилка", "Не вдалося зберегти нову аватарку");
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/bg.png")}
        style={styles.background}
      >
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: user.avatar || "https://via.placeholder.com/150" }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.addIcon} onPress={pickImage}>
            <Text style={styles.addIconText}>x</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <Text style={styles.userName}>{user.userName || "userName"}</Text>

      <PostList
        posts={routePosts || contextPosts} 
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  background: {
    height: 200,
    resizeMode: "cover",
  },
  avatarWrapper: {
    position: "absolute",
    bottom: -50,
    alignSelf: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  addIcon: {
    position: "absolute",
    bottom: 2,
    right: -14,
    top: 75,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E8E8E8",
  },
  addIconText: {
    fontSize: 15,
    color: "#BDBDBD",
  },
  userName: {
    marginTop: 60,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#212121",
  },
});

export default ProfileScreen;
