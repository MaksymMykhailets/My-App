import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useContext } from "react";
import { PostsContext } from "./PostsContext";

const CreatePostsScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [coords, setCoords] = useState(null);
  const { addPost } = useContext(PostsContext);

  useEffect(() => {
    console.log("Отримані параметри:", route.params);
    if (route.params?.location) {
      const { latitude, longitude } = route.params.location;
      setCoords({ latitude, longitude });
      setLocation(`Широта: ${latitude.toFixed(6)}, Довгота: ${longitude.toFixed(6)}`);
    }
  }, [route.params?.location]);
    

  const handleClear = () => {
    setTitle("");
    setLocation("");
    setImage(null);
    setCoords(null);
  };

  const handlePublish = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle || !location || !image || !coords) {
      alert("Заповніть усі поля перед публікацією!");
      return;
    }

    addPost({ title: trimmedTitle, location, image, ...coords });

    navigation.navigate("Posts");
    handleClear();
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Доступ до галереї заборонено!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleOpenMap = () => {
    navigation.navigate("MapScreen", {
      onLocationSelect: (location) => {
        setCoords(location);
        setLocation(`Широта: ${location.latitude.toFixed(6)}, Довгота: ${location.longitude.toFixed(6)}`);
      },
    });
  };
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Створити публікацію</Text>
          </View>

          <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.imagePreview} />
            ) : (
              <Ionicons name="camera-outline" size={50} color="#BDBDBD" />
            )}
          </TouchableOpacity>

          <Text style={styles.uploadText}>Завантажте фото</Text>

          <TextInput
            style={styles.input}
            placeholder="Назва..."
            value={title}
            onChangeText={setTitle}
          />
          <View style={styles.locationInputContainer}>
            <Ionicons name="location-outline" size={20} color="#BDBDBD" />
            <TouchableOpacity onPress={handleOpenMap}>
              <Text style={styles.locationInput}>
                {location || "Оберіть локацію"}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.button, !(title && location && image) && styles.buttonDisabled]}
            onPress={handlePublish}
            disabled={!(title && location && image)}
          >
            <Text style={styles.buttonText}>Опублікувати</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.clearButtonContainer}>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Ionicons name="trash-outline" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: "Roboto-Medium",
    color: "#212121",
    textAlign: "center",
    flex: 1,
  },
  imageUpload: {
    width: "100%",
    height: 200,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    marginTop: 32,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  uploadText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    padding: 0,
  },
  locationInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 16,
  },
  locationInput: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    flex: 1,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#E0E0E0",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
  clearButtonContainer: {
    position: "absolute",
    bottom: 32,
    alignSelf: "center",
  },
  clearButton: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});

export default CreatePostsScreen;
