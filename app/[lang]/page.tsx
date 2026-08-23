import ScrollProgress from '@/components/layout/scroll-progress'
import Hero from '@/components/sections/hero'
import About from '@/components/sections/about'

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
      </div>
    </>
  )
}