import { useColorScheme } from '@/hooks/use-color-scheme';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  
  // Cria estilos dinâmicos baseados no tema
  const dynamicStyles = StyleSheet.create({
    titlePage: {
      color: colorScheme === 'dark' ? '#fff' : '#000',
      fontSize: 22
    },
    containerPage: {
      top: 40,
      marginLeft: 10,
      backgroundColor: colorScheme === 'dark' ? '#000' : '#fff'
    }
  });

  return (
    <View style={dynamicStyles.containerPage}>
      <Text style={dynamicStyles.titlePage}>Hello World</Text>
    </View>
  );
}
