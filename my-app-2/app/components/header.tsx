import { Text, View } from 'react-native';

import styles from './header.styles';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Calculadora</Text>
    </View>
  );
}