import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

export type Props = { error: Error; resetError: () => void };

const ErrorFallbackComponent = (props: Props) => (
  <View style={styles.container}>
    <Text>Something went wrong.</Text>
    <TouchableOpacity onPress={props.resetError}>
      <Text style={styles.errorText}>Try again</Text>
    </TouchableOpacity>
  </View>
);

export function handleJSErrorForErrorBoundary(error: any, stackTrace: string) {
  console.log(stackTrace, error);
}

export function handleJSErrorForSetJSExceptionHandler(error: any) {
  // Show error locally on DEBUG mode
  console.log("An error happened: ", error);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#0390fc",
  },
});

export default ErrorFallbackComponent;
