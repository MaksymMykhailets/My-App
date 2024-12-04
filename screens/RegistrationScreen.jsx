import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useFonts } from "expo-font";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/users/operations";
import { setUser } from "../redux/users/slice";

const RegistrationScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [passwordVisible, setPasswordVisible] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeInput, setActiveInput] = useState(null);

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

  const handleRegister = async () => {
    const trimmedUserName = userName.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
  
    if (!trimmedUserName || !trimmedEmail || !trimmedPassword) {
      alert("Будь ласка, заповніть усі поля!");
      return;
    }
  
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
    if (!isValidEmail(trimmedEmail)) {
      alert("Введіть коректну адресу електронної пошти!");
      return;
    }
  
    try {
      const userData = await dispatch(
        registerUser({
          email: trimmedEmail,
          avatar,
          password: trimmedPassword,
          displayName: trimmedUserName,
        })
      ).unwrap();
  
      alert("Реєстрація успішна!");
      navigation.navigate("Home");
    } catch (error) {
      alert("Не вдалося зареєструватися. Спробуйте ще раз.");
      console.error("Помилка реєстрації:", error);
    }
  };   

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../assets/images/bg.png")}
        style={styles.background}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <View style={styles.avatarWrapper}>
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
                    <Text
                      style={[styles.addIconText, avatar && styles.addIconTextWithPhoto]}
                    >
                      {avatar ? "x" : "+"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.title}>Реєстрація</Text>

              <TextInput
                placeholder="Логін"
                placeholderTextColor="#BDBDBD"
                style={[
                  styles.input,
                  activeInput === "userName" && styles.inputFocused,
                ]}
                autoCapitalize="none"
                onFocus={() => setActiveInput("userName")}
                onBlur={() => setActiveInput(null)}
                onChangeText={setUserName}
              />
              <TextInput
                placeholder="Адреса електронної пошти"
                placeholderTextColor="#BDBDBD"
                style={[
                  styles.input,
                  activeInput === "email" && styles.inputFocused,
                ]}
                autoCapitalize="none"
                keyboardType="email-address"
                onFocus={() => setActiveInput("email")}
                onBlur={() => setActiveInput(null)}
                onChangeText={setEmail}
              />
              <View
                style={[
                  styles.passwordContainer,
                  activeInput === "password" && styles.inputFocused,
                ]}
              >
                <TextInput
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  style={styles.passwordInput}
                  secureTextEntry={passwordVisible}
                  autoCapitalize="none"
                  onFocus={() => setActiveInput("password")}
                  onBlur={() => setActiveInput(null)}
                  onChangeText={setPassword}
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
              <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
              >
                <Text style={styles.buttonText}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.link}>Вже є акаунт? Увійти</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 74,
    alignItems: "center",
    marginTop: "auto",
  },
  avatarWrapper: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
  },
  avatarContainer: {
    backgroundColor: "#F6F6F6",
    width: 120,
    height: 120,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
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
  inputFocused: {
    borderColor: "#FF6C00",
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
