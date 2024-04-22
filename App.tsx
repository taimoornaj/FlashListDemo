import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import Home from "./src/screens/Home";
// react query client instance
const queryClient = new QueryClient();
export default function App() {
  return (
		// react query provider
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        {/* <Text>Open up App.js to start working on your app!</Text> */}
        <StatusBar style="auto" />
        <Home/>
      </View>
    </QueryClientProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});