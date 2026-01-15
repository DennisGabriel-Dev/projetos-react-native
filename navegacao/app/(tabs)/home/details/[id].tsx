import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Status = 'loading' | 'error' | 'ready' | 'empty';

export default function DetailsScreen() {
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
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
      danger: dark ? '#F97316' : '#EA580C',
    };
  }, [colorScheme]);

  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    if (!id) {
      setStatus('empty');
      return;
    }

    setStatus('loading');
    const timer = setTimeout(() => setStatus('error'), 900);
    return () => clearTimeout(timer);
  }, [id]);

  const retryLoad = () => {
    setStatus('loading');
    setTimeout(() => setStatus('ready'), 900);
  };

  return (
    <ThemedView style={[styles.screen, { backgroundColor: palette.background }]}>
      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}>
        {status === 'loading' && (
          <View style={styles.centered}>
            <ActivityIndicator color={palette.accent} />
            <ThemedText style={[styles.helperText, { color: palette.muted }]}>
              Carregando detalhes...
            </ThemedText>
          </View>
        )}

        {status === 'error' && (
          <View style={styles.centered}>
            <View style={[styles.statusIcon, { backgroundColor: palette.danger }]}>
              <IconSymbol name="exclamationmark.triangle.fill" size={18} color="#FFFFFF" />
            </View>
            <ThemedText type="subtitle">Erro ao carregar</ThemedText>
            <ThemedText style={[styles.helperText, { color: palette.muted }]}>
              Não foi possível buscar os detalhes. Tente novamente.
            </ThemedText>
            <Pressable
              onPress={retryLoad}
              style={[styles.primaryButton, { backgroundColor: palette.accent }]}>
              <ThemedText style={styles.primaryButtonText}>Tentar novamente</ThemedText>
            </Pressable>
          </View>
        )}

        {status === 'empty' && (
          <View style={styles.centered}>
            <ThemedText type="subtitle">Nenhum detalhe encontrado</ThemedText>
            <ThemedText style={[styles.helperText, { color: palette.muted }]}>
              O parâmetro de ID não foi informado.
            </ThemedText>
            <Link href="/home" asChild>
              <Pressable style={[styles.secondaryButton, { borderColor: palette.border }]}>
                <ThemedText style={[styles.secondaryButtonText, { color: palette.text }]}>
                  Voltar para Home
                </ThemedText>
              </Pressable>
            </Link>
          </View>
        )}

        {status === 'ready' && (
          <View style={styles.details}>
            <View style={[styles.statusIcon, { backgroundColor: palette.accent }]}>
              <IconSymbol name="sparkles" size={18} color="#FFFFFF" />
            </View>
            <ThemedText type="title">Detalhes carregados</ThemedText>
            <ThemedText style={[styles.helperText, { color: palette.muted }]}>
              ID recebido: {id}
            </ThemedText>
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
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    padding: 24,
    justifyContent: 'center',
  },
  centered: {
    alignItems: 'center',
    gap: 12,
  },
  details: {
    alignItems: 'center',
    gap: 10,
  },
  helperText: {
    textAlign: 'center',
    fontSize: 14,
  },
  statusIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    marginTop: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  secondaryButton: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontWeight: '600',
  },
});

