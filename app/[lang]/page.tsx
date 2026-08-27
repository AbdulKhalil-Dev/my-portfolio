// import ScrollProgress from '@/components/layout/scroll-progress'
// import Hero from '@/components/sections/hero'
// import About from '@/components/sections/about'
// import Stack from '@/components/sections/stack'
// import Projects from '@/components/sections/projects'
// import ManifestoFlow from '@/components/effects/mainfesto-flow'

// interface HomePageProps {
//   params: Promise<{
//     lang: string
//   }>
// }

// export default async function Home({ params }: HomePageProps) {
//   return (
//     <>
//       <ScrollProgress />
//       <Hero />

//       <div className="relative z-10 bg-background border-t border-border">
//         <section id="about">
//           <About />
//         </section>

//         <ManifestoFlow />

//         <section id='stack'>
//           <Stack />
//         </section>

//         <ManifestoFlow reverse />

//         <section id='project'>
//           <Projects />
//         </section>
//       </div>
//     </>
//   )
// }





import ScrollProgress from '@/components/layout/scroll-progress'
import Hero from '@/components/sections/hero'
import About from '@/components/sections/about'
import Stack from '@/components/sections/stack'
import Roadmap from '@/components/sections/roadmap'
import Projects from '@/components/sections/projects'
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

        <section id="stack">
          <Stack />
        </section>

        <ManifestoFlow reverse />

        {/* Roadmap Section Add Ho Gaya Hai */}
        <section id="roadmap">
          <Roadmap />
        </section>

        {/* Navbar link se match karne ke liye id="projects" kar diya hai */}
        <section id="projects">
          <Projects />
        </section>
      </div>
    </>
  )
}