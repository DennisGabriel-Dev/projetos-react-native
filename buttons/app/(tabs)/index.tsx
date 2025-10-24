import { StyleSheet, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TouchableHighlight 
        onPress={() => alert('press touchable highlight')} 
        onLongPress={() => alert('long press touchable highlight')}
        style={[styles.touchableHighlight, { bottom: 20 }]}
      >
        <View style={styles.touchableHighlight}>
          <Text>Toucheable Highlight</Text>
        </View>
      </TouchableHighlight>


      <TouchableOpacity
        onPress={() => alert('press touchable opacity')}
        onLongPress={() => alert('long press touchable opacity')}
        style={[styles.touchableOpacity, { bottom: 10 }]}
      >
        <View style={styles.touchableOpacity}>
          <Text>TouchableOpacity</Text>
        </View>
      </TouchableOpacity>
      

      <TouchableNativeFeedback
        onPress={() => alert('press touchable native feedback')}
        onLongPress={() => alert('long press touchable native feedback')}
        style={[styles.touchableNativeFeedback, { bottom: 10 }]}
      >
        <View style={styles.touchableNativeFeedback}>
          <Text>TouchableNativeFeedback</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  touchableHighlight: {
    width: 200,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 10
  },

  touchableOpacity: {
    width: 200,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
  },

  touchableNativeFeedback: {
    width: 200,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 10,
  },
});
