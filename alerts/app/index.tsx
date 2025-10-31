import { Alert, Text, TouchableOpacity, View } from "react-native";


export default function Index() {
  const alertaConfirmacao = () => {
    Alert.alert(
      'Olá,',
      'Alerta com dois botões(confirmação)',
      [
        {text: 'ok', onPress: () => console.log('ok')},
        {text: 'cancelar', onPress: () => console.log('cancelar'), style: 'cancel'}
      ],
      { cancelable: true }
    );
  }

  const alertaSimples = () => {
    Alert.alert(
      'Olá,',
      'Alerta simples',
      [
        {text: 'ok', onPress: () => console.log('ok')}
      ]
    );
  }

  const alertaTresBotoes = () => {
    Alert.alert(
      'Olá,',
      'Alerta com três botões',
      [
        {text: 'ok', onPress: () => console.log('ok')},
        {text: 'deixar para depois', onPress: () => console.log('deixar para depois')},
        {text: 'cancelar', onPress: () => console.log('cancelar'), style: 'cancel'}
      ]
    );
  }


  const exibirAlerta = () => {
    const alerts = [alertaConfirmacao, alertaSimples, alertaTresBotoes ]

    let current_alert = Math.trunc(Math.random() * alerts.length)
    alerts[current_alert]()
  }


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={exibirAlerta}>
        <View style={{backgroundColor: '#446744', borderRadius: 6 }}>
          <Text style={{color: '#fff', padding: 6}}>
            Exibir Alerta
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
