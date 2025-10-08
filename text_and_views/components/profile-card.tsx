import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfileCard({name, position}: {name: string, position: string}) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.infoGroup}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.position}>{position}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 16,
  },
  infoGroup: {
    flexDirection: 'column',
    gap: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  position: {
    fontSize: 18,
    color: '#666666',
  },
});

