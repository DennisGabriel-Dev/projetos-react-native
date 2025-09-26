import { Text, View, TouchableOpacity } from 'react-native';
import styles from './index.styles';
import { useState } from 'react';

export default function HomeScreen() {
  const [display, setDisplay] = useState('0');

  const handleButtonPress = (value: string) => {
    if (value === 'C') {
      setDisplay('0');
    } else if (display === '0') {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  };

  const calculate = () => {
    try {
      const result = eval(display.replace('×', '*').replace('÷', '/'));
      setDisplay(result.toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.calculator}>
        <View style={styles.display}>
          <Text style={styles.displayText}>{display}</Text>
        </View>

        <View style={styles.buttons}>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, styles.functionButton]} onPress={() => handleButtonPress('C')}>
              <Text style={styles.buttonText}>C</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.functionButton]} onPress={() => handleButtonPress('±')}>
              <Text style={styles.buttonText}>±</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.functionButton]} onPress={() => handleButtonPress('%')}>
              <Text style={styles.buttonText}>%</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleButtonPress('÷')}>
              <Text style={styles.buttonText}>÷</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('7')}>
              <Text style={styles.buttonText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('8')}>
              <Text style={styles.buttonText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('9')}>
              <Text style={styles.buttonText}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleButtonPress('×')}>
              <Text style={styles.buttonText}>×</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('4')}>
              <Text style={styles.buttonText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('5')}>
              <Text style={styles.buttonText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('6')}>
              <Text style={styles.buttonText}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleButtonPress('-')}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('1')}>
              <Text style={styles.buttonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('2')}>
              <Text style={styles.buttonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('3')}>
              <Text style={styles.buttonText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleButtonPress('+')}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, styles.zeroButton]} onPress={() => handleButtonPress('0')}>
              <Text style={styles.buttonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('.')}>
              <Text style={styles.buttonText}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={calculate}>
              <Text style={styles.buttonText}>=</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
