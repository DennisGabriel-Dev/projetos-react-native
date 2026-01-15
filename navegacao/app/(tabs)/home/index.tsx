import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Task = {
  id: string;
  title: string;
  done: boolean;
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const palette = useMemo(() => {
    const dark = colorScheme === 'dark';
    return {
      background: dark ? '#0F1115' : '#F6F7FB',
      card: dark ? '#1B1F27' : '#FFFFFF',
      border: dark ? '#2B313B' : '#E3E6EF',
      text: Colors[dark ? 'dark' : 'light'].text,
      muted: dark ? '#A0A6B2' : '#6B7280',
      accent: dark ? '#4F46E5' : '#4338CA',
      accentSoft: dark ? '#272A3A' : '#EEF2FF',
      success: dark ? '#22C55E' : '#16A34A',
    };
  }, [colorScheme]);

  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const addTask = () => {
    const trimmed = newTaskTitle.trim();
    if (!trimmed) return;
    setTasks((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random()}`, title: trimmed, done: false },
    ]);
    setNewTaskTitle('');
    setModalVisible(false);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  return (
    <ThemedView style={[styles.screen, { backgroundColor: palette.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <ThemedText type="title">Hoje</ThemedText>
            <ThemedText style={[styles.subtitle, { color: palette.muted }]}>
              Notas rápidas e tarefas do dia
            </ThemedText>
          </View>
        </View>

        {loading ? (
          <View style={[styles.loadingBox, { borderColor: palette.border }]}>
            <ActivityIndicator color={palette.accent} />
            <ThemedText style={[styles.loadingText, { color: palette.muted }]}>
              Carregando seu painel...
            </ThemedText>
          </View>
        ) : (
          <View style={styles.cardsRow}>
            <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}>
              <View style={styles.cardHeader}>
                <View style={[styles.cardIcon, { backgroundColor: palette.accentSoft }]}>
                  <IconSymbol name="checklist" size={18} color={palette.accent} />
                </View>
                <ThemedText type="subtitle">To-do list</ThemedText>
              </View>

              {tasks.length === 0 ? (
                <View style={styles.emptyState}>
                  <ThemedText style={[styles.emptyText, { color: palette.muted }]}>
                    Nenhuma tarefa cadastrada.
                  </ThemedText>
                  <Pressable
                    onPress={() => setModalVisible(true)}
                    style={[styles.secondaryButton, { borderColor: palette.border }]}>
                    <ThemedText style={[styles.secondaryButtonText, { color: palette.text }]}>
                      Criar primeira tarefa
                    </ThemedText>
                  </Pressable>
                </View>
              ) : (
                <View style={styles.tasksList}>
                  {tasks.map((task) => (
                    <Pressable
                      key={task.id}
                      onPress={() => toggleTask(task.id)}
                      style={styles.taskRow}>
                      <View
                        style={[
                          styles.checkbox,
                          { borderColor: palette.border },
                          task.done && { backgroundColor: palette.success, borderColor: palette.success },
                        ]}>
                        {task.done && <IconSymbol name="checkmark" size={12} color="#FFFFFF" />}
                      </View>
                      <ThemedText
                        style={[
                          styles.taskText,
                          { color: palette.text },
                          task.done && { color: palette.muted, textDecorationLine: 'line-through' },
                        ]}>
                        {task.title}
                      </ThemedText>
                    </Pressable>
                  ))}
                  <Pressable
                    onPress={() => setModalVisible(true)}
                    style={[styles.secondaryButton, { borderColor: palette.border }]}>
                    <ThemedText style={[styles.secondaryButtonText, { color: palette.text }]}>
                      Adicionar outra tarefa
                    </ThemedText>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        )}

      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { backgroundColor: palette.card, borderColor: palette.border }]}>
            <ThemedText type="subtitle">Nova tarefa</ThemedText>
            <TextInput
              autoFocus
              placeholder="Ex: revisar matéria"
              placeholderTextColor={palette.muted}
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
              style={[styles.modalInput, { color: palette.text, borderColor: palette.border }]}
            />
            <View style={styles.modalActions}>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={[styles.modalButton, { borderColor: palette.border }]}>
                <ThemedText style={{ color: palette.text }}>Cancelar</ThemedText>
              </Pressable>
              <Pressable
                onPress={addTask}
                style={[styles.modalButton, { backgroundColor: palette.accent }]}>
                <ThemedText style={styles.primaryButtonText}>Salvar</ThemedText>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginTop: 20
  },
  subtitle: {
    marginTop: 4,
  },
  loadingBox: {
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 32,
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
  },
  cardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    flexGrow: 1,
    flexBasis: 280,
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'flex-start',
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
  },
  tasksList: {
    gap: 10,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    fontSize: 15,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  secondaryButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(10, 10, 12, 0.7)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    gap: 12,
  },
  modalInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  modalButton: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
});

