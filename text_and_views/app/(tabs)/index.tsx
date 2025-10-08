import PersonTextDemo from '@/components/person-text-demo';
import ProfileCard from '@/components/profile-card';
import { View } from 'react-native';

export default function HomeScreen() {
  return (
    <View> 
      <ProfileCard name="Dennis Gabriel" position="Desenvolvedor Mobile" />
      <ProfileCard name="Júnior Gomes" position="Web Designer" />
      <ProfileCard name="André Sampaio" position="Frontend Developer" />
      <ProfileCard name="Wagner Lopes" position="Backend Developer" />
      <PersonTextDemo />
    </View>
  );
}