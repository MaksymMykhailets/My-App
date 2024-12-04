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
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/users/selectors";
import PostList from "./PostList";
import { logoutUser, updateAvatar } from "../redux/users/operations";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();  
    if (!permissionResult.granted) {
      alert("Доступ до галереї заборонено!");
      return;
    }
  
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    
      if (!result.canceled) {
        const newAvatar = result.assets[0].uri;
        console.log("Selected avatar URI:", newAvatar);
  
        await dispatch(updateAvatar(newAvatar)).unwrap();
        Alert.alert("Успіх", "Аватар оновлено!");
      } else {
        console.log("User canceled image picker.");
      }
    } catch (error) {
      console.error("Error during image picking:", error);
      Alert.alert("Помилка", `Не вдалося оновити аватар: ${error.message}`);
    }
  };     

  const handleLogout = async () => {
    try {
      const result = await dispatch(logoutUser()).unwrap();
      if (result) {
        navigation.navigate("Login");
      }
    } catch (error) {
      Alert.alert("Помилка", `Не вдалося виконати вихід: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/bg.png")}
        style={styles.background}
      >
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="exit-outline" size={24} color="#BDBDBD" />
        </TouchableOpacity>
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: user?.avatar }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.addIcon} onPress={() => pickImage()}>
            <Text style={styles.addIconText}>+</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <Text style={styles.userName}>{user?.displayName || "Unknown User"}</Text>

      <PostList posts={[]} navigation={navigation} />
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
  logoutButton: {
    position: "absolute",
    top: 210,
    right: 16, 
    zIndex: 10,
    color: "#BDBDBD",
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
