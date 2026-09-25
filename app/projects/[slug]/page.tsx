import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  if (slug === 'convminds') {
    redirect('/blog/convergent-minds');
  }

  redirect('/blog');
}
