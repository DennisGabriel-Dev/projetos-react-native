# Guia Completo: useEffect no React Native

## O que é o useEffect?

O `useEffect` é um hook que permite executar efeitos colaterais em componentes funcionais. Ele substitui os métodos de ciclo de vida dos componentes de classe.

## Sintaxe

```javascript
useEffect(() => {
  // Código do efeito
  return () => {
    // Cleanup (opcional)
  };
}, [dependências]); // Array de dependências (opcional)
```

## Tipos de useEffect

### 1. Efeito que roda apenas uma vez (componentDidMount)

```javascript
useEffect(() => {
  // Roda apenas quando o componente é montado
  console.log("Componente montado!");
  
  // Exemplo: buscar dados da API
  fetchUserData();
}, []); // Array vazio = roda apenas uma vez
```

### 2. Efeito que roda a cada render

```javascript
useEffect(() => {
  // Roda a cada render do componente
  console.log("Componente renderizado!");
}); // Sem array de dependências
```

### 3. Efeito com dependências específicas

```javascript
const [count, setCount] = useState(0);

useEffect(() => {
  // Roda apenas quando 'count' muda
  console.log(`Count mudou para: ${count}`);
}, [count]); // Roda quando count mudar
```

### 4. Efeito com cleanup (componentWillUnmount)

```javascript
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Timer rodando...");
  }, 1000);

  // Cleanup function
  return () => {
    clearInterval(timer);
    console.log("Timer limpo!");
  };
}, []);
```

## Exemplos Práticos para React Native

### 1. Buscar dados de uma API

```javascript
import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]); // Roda quando userId mudar

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      <Text>{user?.name}</Text>
      <Text>{user?.email}</Text>
    </View>
  );
}
```

### 2. Listener de eventos do teclado

```javascript
import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

export default function KeyboardExample() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    // Cleanup - remover listeners
    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  return (
    <View>
      <Text>Teclado visível: {keyboardVisible ? 'Sim' : 'Não'}</Text>
    </View>
  );
}
```

### 3. Timer/Contador

```javascript
import { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <View>
      <Text>Tempo: {seconds}s</Text>
      <Button title={isActive ? 'Pausar' : 'Iniciar'} onPress={toggle} />
      <Button title="Reset" onPress={reset} />
    </View>
  );
}
```

### 4. Monitorar mudanças de orientação

```javascript
import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export default function OrientationExample() {
  const [orientation, setOrientation] = useState(
    Dimensions.get('window').width > Dimensions.get('window').height 
      ? 'landscape' 
      : 'portrait'
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setOrientation(window.width > window.height ? 'landscape' : 'portrait');
    });

    return () => subscription?.remove();
  }, []);

  return (
    <View>
      <Text>Orientação: {orientation}</Text>
    </View>
  );
}
```

## Boas Práticas

### 1. Sempre incluir dependências no array

```javascript
// ❌ Errado - missing dependency
const [count, setCount] = useState(0);
useEffect(() => {
  console.log(count);
}, []); // count deveria estar no array

// ✅ Correto
useEffect(() => {
  console.log(count);
}, [count]);
```

### 2. Usar cleanup para evitar memory leaks

```javascript
// ✅ Sempre limpar timers, listeners, subscriptions
useEffect(() => {
  const timer = setInterval(() => {
    // código do timer
  }, 1000);

  return () => clearInterval(timer); // Cleanup
}, []);
```

### 3. Separar efeitos por responsabilidade

```javascript
// ✅ Separar diferentes efeitos
useEffect(() => {
  // Efeito para buscar dados
  fetchData();
}, [userId]);

useEffect(() => {
  // Efeito para timer
  const timer = setInterval(updateTimer, 1000);
  return () => clearInterval(timer);
}, []);
```

### 4. Evitar efeitos desnecessários

```javascript
// ❌ Evitar - roda a cada render
useEffect(() => {
  console.log('Renderizado');
});

// ✅ Melhor - especificar quando deve rodar
useEffect(() => {
  console.log('Count mudou');
}, [count]);
```

## Problemas Comuns

### 1. Loop infinito

```javascript
// ❌ Causa loop infinito
const [data, setData] = useState([]);
useEffect(() => {
  setData([...data, 'novo item']); // data muda, causa novo efeito
}, [data]);

// ✅ Solução
useEffect(() => {
  setData(prevData => [...prevData, 'novo item']);
}, []); // ou usar callback no setState
```

### 2. Dependências faltando

```javascript
// ❌ Dependência faltando
const [count, setCount] = useState(0);
const [multiplier, setMultiplier] = useState(2);

useEffect(() => {
  const result = count * multiplier;
  console.log(result);
}, [count]); // multiplier deveria estar aqui também

// ✅ Correto
useEffect(() => {
  const result = count * multiplier;
  console.log(result);
}, [count, multiplier]);
```

## Resumo

O `useEffect` é fundamental para:
- Buscar dados de APIs
- Configurar listeners de eventos
- Timers e intervalos
- Cleanup de recursos
- Sincronizar com sistemas externos

Lembre-se sempre de:
- Incluir todas as dependências no array
- Fazer cleanup quando necessário
- Separar efeitos por responsabilidade
- Evitar loops infinitos
