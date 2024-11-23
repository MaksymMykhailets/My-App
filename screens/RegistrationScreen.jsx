import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useFonts } from "expo-font";

const RegistrationScreen = () => {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

  const [passwordVisible, setPasswordVisible] = useState(true);
  const [avatar, setAvatar] = useState(null);

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
      setAvatar(result.assets[0].uri);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          {avatar && (
            <Image
              source={{ uri: avatar }}
              style={styles.avatar}
            />
          )}
          <TouchableOpacity
            style={[styles.addIcon, avatar && styles.addIconWithPhoto]}
            onPress={pickImage}
          >
            <Text style={[styles.addIconText, avatar && styles.addIconTextWithPhoto]}>
              {avatar ? "x" : "+"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Реєстрація</Text>

        <TextInput
          placeholder="Логін"
          placeholderTextColor="#BDBDBD"
          style={styles.input}
        />
        <TextInput
          placeholder="Адреса електронної пошти"
          placeholderTextColor="#BDBDBD"
          style={styles.input}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Пароль"
            placeholderTextColor="#BDBDBD"
            style={styles.passwordInput}
            secureTextEntry={passwordVisible}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.showButton}
          >
            <Text style={styles.showButtonText}>
              {passwordVisible ? "Показати" : "Приховати"}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Зареєструватися</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.link}>Вже є акаунт? Увійти</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    resizeMode: "cover",
  },
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 45,
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
  },
  avatarContainer: {
    position: "absolute",
    top: -50,
    alignSelf: "center",
    backgroundColor: "#F6F6F6",
    width: 120,
    height: 120,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
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
    borderColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
  addIconWithPhoto: {
    borderColor: "#BDBDBD",
    backgroundColor: "#FFF",
  },
  addIconText: {
    color: "#FF6C00",
    fontSize: 15,
  },
  addIconTextWithPhoto: {
    color: "#BDBDBD",
  },
  title: {
    fontFamily: "Roboto-Bold",
    color: "#212121",
    fontSize: 30,
    marginBottom: 33,
    marginTop: 32,
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    width: "100%",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    width: "100%",
    padding: 16,
  },
  passwordInput: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
    flex: 1,
  },
  showButtonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    padding: 16,
    marginTop: 43,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#FFF",
  },
  link: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
    marginTop: 16,
  },
});

export default RegistrationScreen;