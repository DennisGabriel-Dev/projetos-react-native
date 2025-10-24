import { useColorScheme } from './use-color-scheme';

export function useThemeColors() {
  const colorScheme = useColorScheme();
  
  return {
    // Cores de texto
    text: colorScheme === 'dark' ? '#fff' : '#000',
    textSecondary: colorScheme === 'dark' ? '#ccc' : '#666',
    
    // Cores de fundo
    background: colorScheme === 'dark' ? '#000' : '#fff',
    backgroundSecondary: colorScheme === 'dark' ? '#1a1a1a' : '#f5f5f5',
    
    // Cores de borda
    border: colorScheme === 'dark' ? '#333' : '#ddd',
    
    // StatusBar
    statusBarText: colorScheme === 'dark' ? 'light' : 'dark',
    statusBarBackground: '#b218b8ff', // Sua cor personalizada
    
    // Tema atual
    isDark: colorScheme === 'dark',
    isLight: colorScheme === 'light'
  };
}
