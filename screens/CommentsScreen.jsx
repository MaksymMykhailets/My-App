import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CommentsScreen = ({ route, navigation }) => {
  const { post, userAvatar } = route.params;
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    const trimmedComment = commentText.trim();
    if (!trimmedComment) return;
    const newComment = {
      text: trimmedComment,
      avatar: userAvatar,
      date: new Date().toLocaleString(),
    };
    setComments((prev) => [...prev, newComment]);
    setCommentText("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#BDBDBD" />
       </TouchableOpacity>
          <Text style={styles.headerTitle}>Коментарі</Text>
        </View>

        <Image source={{ uri: post.image }} style={styles.postImage} />

        <FlatList
          data={comments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Image source={{ uri: item.avatar }} style={styles.commentAvatar} />
              <View style={styles.commentTextContainer}>
                <Text style={styles.commentText}>{item.text}</Text>
                <Text style={styles.commentDate}>{item.date}</Text>
              </View>
            </View>
          )}
        />

        {/* Поле введення коментарів */}
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Коментувати..."
            value={commentText}
            onChangeText={setCommentText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
            <Ionicons name="arrow-up-circle" size={36} color="#FF6C00" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    position: "relative",
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: "Roboto-Medium",
    color: "#212121",
    textAlign: "center",
    flex: 1,
    marginLeft: -24,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 16,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  commentTextContainer: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    padding: 8,
  },
  commentText: {
    fontSize: 14,
    color: "#212121",
  },
  commentDate: {
    fontSize: 12,
    color: "#757575",
    marginTop: 4,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  commentInput: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginRight: 8,
  },
  sendButton: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CommentsScreen;
