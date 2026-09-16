import { redirect } from "next/navigation";

interface BlogsSlugPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogsSlugPage({ params }: BlogsSlugPageProps) {
  const { slug } = await params;
  redirect(`/proof/${slug}`);
}
