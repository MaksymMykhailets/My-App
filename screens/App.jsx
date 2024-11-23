import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import RegistrationScreen from "./RegistrationScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <RegistrationScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
