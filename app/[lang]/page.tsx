import ScrollProgress from '@/components/layout/scroll-progress'
import Hero from '@/components/sections/hero'

interface HomePageProps {
  params: Promise<{
    lang: string
  }>
}

export default async function Home({ params }: HomePageProps) {
  return (
    <>
      <ScrollProgress />
      <Hero />
    </>
  )
}