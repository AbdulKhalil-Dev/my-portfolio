import ScrollProgress from '@/components/layout/scroll-progress'
import Hero from '@/components/sections/hero'
import About from '@/components/sections/about'
import Stack from '@/components/sections/stack'
import ManifestoFlow from '@/components/effects/mainfesto-flow'

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

      <div className="relative z-10 bg-background border-t border-border">
        <section id="about">
          <About />
        </section>

        <ManifestoFlow />

        <section id='stack'>
          <Stack />
        </section>
      </div>
    </>
  )
}