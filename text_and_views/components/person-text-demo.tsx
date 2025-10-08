import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function PersonTextDemo() {
  return (
    <View>
      <Text style={styles.father}>Texto pai 
        <Text> IMPORTANTE </Text> 
        <Text style={styles.chield}>Texto filho</Text>
      </Text>
    </View>
  );
} 

const styles = StyleSheet.create({
  father: {
    fontSize: 20,
    color: 'gray'
  },

  chield: {
    color: 'blue'
  }
});