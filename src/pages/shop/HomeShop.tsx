

// import React from 'react'
import ShopNavbar from '../../components/shop/shopHeader'
import NewsletterSubscription from '../../components/Home/Newsletter'
import Footer from '../../components/footer'
import HeroSection from '../../components/shop/shopHero'
import NewArrivals from '../../components/shop/shopArrivals'

const HomeShop = () => {
  return (
    <div>
      <ShopNavbar />
      <HeroSection />
      <NewArrivals /> 
      <NewsletterSubscription />
      <Footer />
    </div>
  )
}

export default HomeShop
