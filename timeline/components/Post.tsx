import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';

interface PostProps {
  id: number;
  title: string;
  image: string;
  summary: string;
  comments: string[];
  onAddComment: (postId: number, comment: string) => void;
}

export default function Post({ id, title, image, summary, comments, onAddComment }: PostProps) {
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(id, newComment.trim());
      setNewComment('');
    }
  };

  return (
    <View style={styles.post}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.postId}>Post #{id}</Text>
      </View>
      
      <Image source={{ uri: image }} style={styles.image} />
      
      <Text style={styles.summary}>{summary}</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setShowComments(!showComments)}
        >
          <Text style={styles.buttonText}>
            {showComments ? 'Ocultar' : 'Ver'} Comentários ({comments.length})
          </Text>
        </TouchableOpacity>
      </View>

      {showComments && (
        <View style={styles.commentsSection}>
          <ScrollView style={styles.commentsList}>
            {comments.map((comment, index) => (
              <View key={index} style={styles.comment}>
                <Text style={styles.commentText}>{comment}</Text>
              </View>
            ))}
          </ScrollView>
          
          <View style={styles.addComment}>
            <TextInput
              style={styles.commentInput}
              placeholder="Adicionar comentário..."
              value={newComment}
              onChangeText={setNewComment}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
              <Text style={styles.sendButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  postId: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  summary: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  actions: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  button: {
    backgroundColor: '#1877f2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  commentsSection: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  commentsList: {
    maxHeight: 200,
    marginBottom: 12,
  },
  comment: {
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
  },
  addComment: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 8,
    marginRight: 8,
    maxHeight: 80,
  },
  sendButton: {
    backgroundColor: '#42b883',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
