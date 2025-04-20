import React from 'react';
import EmbedPlayer from '@/components/watch/embed-player';

export const revalidate = 3600;

export default function Page({ params }: { params: { slug: string } }) {
  const id = params.slug.split('-').pop();
  return <EmbedPlayer url={`https://www.youtube.com/embed/lE4jPjDH-aM?si=XK8RUgEDe88NFJUL${id}`} />;
}
