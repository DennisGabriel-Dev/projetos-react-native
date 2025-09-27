import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, View, Text, StyleSheet, RefreshControl } from 'react-native';
import Post from './Post';
import RealTimeUpdates from './RealTimeUpdates';

interface PostData {
  id: number;
  title: string;
  image: string;
  summary: string;
  comments: string[];
  lastUpdated?: Date;
}

export default function Timeline() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Gerar dados mock para 500 posts
  const generateMockPosts = (startId: number, count: number): PostData[] => {
    const mockTitles = [
      'Aventura incrível na montanha',
      'Novo projeto de tecnologia',
      'Momento especial com a família',
      'Descoberta científica revolucionária',
      'Arte urbana impressionante',
      'Viagem pelo mundo',
      'Inovação em sustentabilidade',
      'Celebração da cultura local',
      'Desafio esportivo superado',
      'Conhecimento compartilhado'
    ];

    const mockImages = [
      'https://picsum.photos/400/200?random=1',
      'https://picsum.photos/400/200?random=2',
      'https://picsum.photos/400/200?random=3',
      'https://picsum.photos/400/200?random=4',
      'https://picsum.photos/400/200?random=5',
      'https://picsum.photos/400/200?random=6',
      'https://picsum.photos/400/200?random=7',
      'https://picsum.photos/400/200?random=8',
      'https://picsum.photos/400/200?random=9',
      'https://picsum.photos/400/200?random=10'
    ];

    const mockSummaries = [
      'Uma experiência única que mudou minha perspectiva sobre a vida e a natureza.',
      'Trabalhando em uma solução inovadora que pode revolucionar nossa indústria.',
      'Tempo de qualidade com as pessoas mais importantes da minha vida.',
      'Pesquisa que pode abrir novos caminhos para o futuro da humanidade.',
      'Expressão artística que transforma espaços urbanos em galerias a céu aberto.',
      'Explorando diferentes culturas e descobrindo a beleza da diversidade.',
      'Desenvolvendo tecnologias que respeitam o meio ambiente.',
      'Valorizando tradições e costumes que enriquecem nossa sociedade.',
      'Superando limites pessoais através do esporte e determinação.',
      'Compartilhando conhecimento para construir um mundo melhor.'
    ];

    return Array.from({ length: count }, (_, index) => ({
      id: startId + index,
      title: mockTitles[index % mockTitles.length],
      image: mockImages[index % mockImages.length],
      summary: mockSummaries[index % mockSummaries.length],
      comments: [],
      lastUpdated: new Date()
    }));
  };

  // Carregar posts iniciais
  useEffect(() => {
    loadInitialPosts();
  }, []);

  const loadInitialPosts = () => {
    setLoading(true);
    setTimeout(() => {
      const initialPosts = generateMockPosts(1, 50);
      setPosts(initialPosts);
      setLoading(false);
    }, 1000);
  };

  const loadMorePosts = useCallback(() => {
    if (loading || posts.length >= 500) return;

    setLoading(true);
    setTimeout(() => {
      const newPosts = generateMockPosts(posts.length + 1, 20);
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setLoading(false);
    }, 1000);
  }, [loading, posts.length]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const refreshedPosts = generateMockPosts(1, 50);
      setPosts(refreshedPosts);
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleAddComment = (postId: number, comment: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { 
              ...post, 
              comments: [...post.comments, comment],
              lastUpdated: new Date()
            }
          : post
      )
    );
  };

  const handleRealTimeUpdate = (postId: number, updateType: 'comment' | 'content') => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              lastUpdated: new Date(),
              // Simular novo comentário automático
              comments: updateType === 'comment' 
                ? [...post.comments, `Comentário automático - ${new Date().toLocaleTimeString()}`]
                : post.comments
            }
          : post
      )
    );
  };

  const renderPost = ({ item }: { item: PostData }) => (
    <Post
      id={item.id}
      title={item.title}
      image={item.image}
      summary={item.summary}
      comments={item.comments}
      onAddComment={handleAddComment}
    />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <Text style={styles.footerText}>Carregando mais posts...</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Timeline do Facebook</Text>
        <Text style={styles.headerSubtitle}>
          {posts.length} posts carregados
        </Text>
      </View>
      
      <RealTimeUpdates onSimulateUpdate={handleRealTimeUpdate} />
      
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    backgroundColor: '#1877f2',
    padding: 16,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
});
