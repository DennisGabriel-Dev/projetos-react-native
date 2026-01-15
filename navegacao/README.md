# Navegação Avançada e UX no React Native

Aplicativo simples com Bottom Tabs, Stack interno na aba Home, layout de notas + lista de tarefas e estados de UX sempre tratados.

## Navegação do app

- `Tabs`: Home e Profile (`app/(tabs)/_layout.tsx`)
- `Stack` interno: Home → Details (`app/(tabs)/home/_layout.tsx`)
- Deep link: `meuapp://details/1` redireciona para `Home → Details` (`app/details/[id].tsx`)

## Onde tratei loading, empty e error

- **Home** (`app/(tabs)/home/index.tsx`)
  - Loading: spinner inicial simulando carregamento
  - Empty: mensagem quando não há tarefas
- **Details** (`app/(tabs)/home/details/[id].tsx`)
  - Loading: estado inicial antes do erro/sucesso
  - Error: erro simulado com botão "Tentar novamente"
  - Empty: quando o ID não é informado

## Como rodar

```bash
npm install
npx expo start
```

