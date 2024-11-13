import { Text, StyleSheet, View } from "react-native";

export const MovieAppTitle = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MovieApps</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#121212", 
    padding: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: "bold", 
    color: "#fff", 
    textTransform: "uppercase", 
    letterSpacing: 3, 
    textShadowColor: "#000", 
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 8, 
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
