import { Text, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Plataforma do Tigrinho</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Olá jogador, você é meu melhor amigo!</Text>
        <Text style={styles.titleSecondary}>Vamos jogar?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white'
  },

  header: {
    backgroundColor: 'purple',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },

  titleSecondary: {
    fontSize: 35,
    textAlign: 'center',
    color: '#909'
  }
});
