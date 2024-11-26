import { View, Text, StyleSheet } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Це сторінка профілю</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    color: "#212121",
  },
});

export default ProfileScreen;
