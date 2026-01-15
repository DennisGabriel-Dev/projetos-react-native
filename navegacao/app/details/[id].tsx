import { Redirect, useLocalSearchParams } from 'expo-router';

export default function DetailsDeepLink() {
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id) {
    return <Redirect href="/home" />;
  }

  return <Redirect href={`/home/details/${id}`} />;
}

