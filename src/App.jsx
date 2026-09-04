import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { ScrollingTicker } from './components/ScrollingTicker'
import { WelcomeSection } from './components/WelcomeSection'
import { TimelineSection } from './components/TimelineSection'
import { EventsSection } from './components/EventsSection'
import { TeamSection } from './components/TeamSection'
import { Footer } from './components/Footer'
import { BackgroundMusic } from './components/BackgroundMusic'
import { LoginPage } from './pages/LoginPage'
import { RegistrationPage } from './pages/RegistrationPage'
import { ForgotPasswordPage } from './pages/ForgotPasswordPage'
import { ResetPasswordPage } from './pages/ResetPasswordPage'
import { SubmissionPage } from './pages/SubmissionPage'
import { ThankYouPage } from './pages/ThankYouPage'
import './App.css'

function LandingPage() {
  return (
    <>
      <Hero />
      <ScrollingTicker />
      <WelcomeSection />
      <TimelineSection />
      <EventsSection />
      <div className="team-footer-bg">
        <TeamSection />
        <Footer />
      </div>
    </>
  )
}

function App() {
  return (
    <div className="app">
      <BackgroundMusic />
      {useLocation().pathname === '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/submission" element={<SubmissionPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </div>
  )
}

export default App