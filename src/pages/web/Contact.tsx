

// import React from 'react'
import NewsletterSubscription from '../../components/Home/Newsletter'
import Footer from '../../components/footer'
import Header from '../../components/header'
import HeroSection from '../../components/About/reusableHero'
import AppointmentBookingPage from '../../components/ContactUs/sectionC1'



const Contact = () => {
  return (
    <div>
      <Header />
      <HeroSection
        title="Get in Touch"
        subtitle="Book an Appointment to treat your teeth right now."
        />
        <AppointmentBookingPage />
      <NewsletterSubscription />
      <Footer />
    </div>
  )
}

export default Contact
