import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.containerPage}>
      <Text style={styles.titlePage}>Hello World</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titlePage: {
    color: '#fff',
    fontSize: 22
  },
  containerPage: {
    top: 40,
    marginLeft: 10
  }
});
