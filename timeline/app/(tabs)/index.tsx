import { View, StyleSheet } from 'react-native';
import Timeline from '../../components/Timeline';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Timeline />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
