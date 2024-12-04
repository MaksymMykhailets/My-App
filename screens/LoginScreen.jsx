import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useFonts } from "expo-font";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/users/operations";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [passwordVisible, setPasswordVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeInput, setActiveInput] = useState(null);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Будь ласка, заповніть усі поля!");
      return;
    }
  
    try {
      const userData = await dispatch(
        loginUser({ email, password })
      ).unwrap();
  
      alert("Вхід успішний!");
      navigation.navigate("Home");
    } catch (error) {
      alert("Невірний email або пароль. Спробуйте ще раз.");
      console.error("Помилка входу:", error);
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
              <Text style={styles.title}>Увійти</Text>

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
                onPress={handleLogin}
              >
                <Text style={styles.buttonText}>Увійти</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
                <Text style={styles.link}>
                  Немає акаунту?{" "}
                  <Text style={styles.registerLink}>Зареєструватися</Text>
                </Text>
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
    paddingTop: 32,
    paddingBottom: 140,
    marginTop: "auto",
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontFamily: "Roboto-Bold",
    color: "#212121",
    fontSize: 30,
    marginBottom: 33,
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
  registerLink: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
