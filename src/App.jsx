import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { ScrollingTicker } from './components/ScrollingTicker'
import { WelcomeSection } from './components/WelcomeSection'
import { TimelineSection } from './components/TimelineSection'
import { EventsSection } from './components/EventsSection'
import { TeamSection } from './components/TeamSection'
import { Footer } from './components/Footer'
import { BackgroundMusic } from './components/BackgroundMusic'
import './App.css'

function App() {
  return (
    <div className="app">
      <BackgroundMusic />

      <Navbar />
      <Hero />
      <ScrollingTicker />
      <WelcomeSection />
      <TimelineSection />
      <EventsSection />
      <div className="team-footer-bg">
        <TeamSection />
        <Footer />
      </div>
    </div>
  )
}

export default App