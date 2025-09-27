import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface RealTimeUpdatesProps {
  onSimulateUpdate: (postId: number, updateType: 'comment' | 'content') => void;
}

export default function RealTimeUpdates({ onSimulateUpdate }: RealTimeUpdatesProps) {
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Simular conexão WebSocket
  useEffect(() => {
    const interval = setInterval(() => {
      // Simular atualizações aleatórias
      if (Math.random() < 0.1) { // 10% de chance a cada 5 segundos
        const randomPostId = Math.floor(Math.random() * 500) + 1;
        const updateType = Math.random() < 0.7 ? 'comment' : 'content';
        onSimulateUpdate(randomPostId, updateType);
        setLastUpdate(new Date());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [onSimulateUpdate]);

  const simulateManualUpdate = () => {
    const randomPostId = Math.floor(Math.random() * 500) + 1;
    onSimulateUpdate(randomPostId, 'comment');
    setLastUpdate(new Date());
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <View style={[styles.statusIndicator, { backgroundColor: isConnected ? '#42b883' : '#ff4757' }]} />
        <Text style={styles.statusText}>
          {isConnected ? 'Conectado' : 'Desconectado'} - Tempo Real
        </Text>
      </View>
      
      {lastUpdate && (
        <View style={styles.lastUpdate}>
          <Text style={styles.lastUpdateText}>
            Última atualização: {lastUpdate.toLocaleTimeString()}
          </Text>
        </View>
      )}
      
      <TouchableOpacity style={styles.simulateButton} onPress={simulateManualUpdate}>
        <Text style={styles.simulateButtonText}>
          Simular Atualização
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  lastUpdate: {
    marginBottom: 8,
  },
  lastUpdateText: {
    fontSize: 10,
    color: '#999',
  },
  simulateButton: {
    backgroundColor: '#1877f2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  simulateButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
