import { useEffect } from 'react'
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
import { AdminCatalogPage } from './pages/AdminCatalogPage'
import { SubmissionCatalogPage } from './pages/SubmissionCatalogPage';
import './App.css'

function LandingPage() {
  return (
    <>
      <Hero />
      <ScrollingTicker />
      <WelcomeSection />
      <div id="schedule">
        <TimelineSection />
      </div>
      <EventsSection />
      <div id="team" className="team-footer-bg">
        <TeamSection />
        <Footer />
      </div>
    </>
  )
}

const PAGE_TITLES = {
  '/': 'Home',
  '/login': 'Sign In',
  '/register': 'Register',
  '/forgot-password': 'Forgot Password',
  '/reset-password': 'Reset Password',
  '/submission': 'Event',
  '/thank-you': 'Thank You',
  '/admin/catalogue': 'Admin Catalogue',
  '/submission/catalog': 'My Submission',
}

function App() {
  const location = useLocation()

  useEffect(() => {
    const pageName = PAGE_TITLES[location.pathname] ?? 'LOGIX'
    document.title = pageName === 'LOGIX' ? 'LOGIX' : `${pageName} | LOGIX`
  }, [location.pathname])

  return (
    <div className="app">
      <BackgroundMusic />
      {location.pathname === '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/submission" element={<SubmissionPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/admin/catalogue" element={<AdminCatalogPage />} />
        <Route path="/submission/catalog" element={<SubmissionCatalogPage />} />
      </Routes>
    </div>
  )
}

export default App