import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PostList = ({ posts, navigation, avatar }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.postContainer}>
          <Image source={{ uri: item.image }} style={styles.postImage} />
          <Text style={styles.postTitle}>{item.title}</Text>
          <View style={styles.postActionsContainer}>
            <TouchableOpacity
              style={styles.commentButton}
              onPress={() =>
                navigation.push("CommentsScreen", {
                  post: item,
                  userAvatar: avatar,
                })
              }
            >
              <Ionicons name="chatbubble-outline" size={16} color="#757575" />
              <Text style={styles.commentCount}>{item.comments || 0}</Text>
            </TouchableOpacity>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={16} color="#757575" />
              <Text style={styles.postLocation}>{item.location}</Text>
            </View>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: "inherit",
    borderRadius: 8,
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
  postActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
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
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  postLocation: {
    fontSize: 16,
    color: "#212121",
    textDecorationLine: "underline",
  },
});

export default PostList;
