import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProfileScreen() {
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
    };
  }, [colorScheme]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemedView style={[styles.screen, { backgroundColor: palette.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.iconBox, { backgroundColor: palette.accentSoft }]}>
            <IconSymbol name="pencil.and.scribble" size={18} color={palette.accent} />
          </View>
          <View>
            <ThemedText type="title">Bloco de notas</ThemedText>
            <ThemedText style={[styles.subtitle, { color: palette.muted }]}>
              Anote suas ideias e lembretes
            </ThemedText>
          </View>
        </View>

        {loading ? (
          <View style={[styles.loadingBox, { borderColor: palette.border }]}>
            <ActivityIndicator color={palette.accent} />
            <ThemedText style={[styles.loadingText, { color: palette.muted }]}>
              Carregando suas notas...
            </ThemedText>
          </View>
        ) : (
          <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}>
            <TextInput
              multiline
              placeholder="Escreva aqui suas anotações..."
              placeholderTextColor={palette.muted}
              value={notes}
              onChangeText={setNotes}
              style={[styles.notesInput, { color: palette.text }]}
            />
            {notes.length === 0 && (
              <ThemedText style={[styles.emptyText, { color: palette.muted }]}>
                Nenhuma anotação ainda.
              </ThemedText>
            )}
          </View>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    gap: 16,
  },
  subtitle: {
    marginTop: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 20
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
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
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },
  notesInput: {
    minHeight: 160,
    textAlignVertical: 'top',
    fontSize: 15,
    lineHeight: 22,
  },
  emptyText: {
    fontSize: 13,
  },
});

