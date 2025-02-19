
import NewsletterSubscription from '../../components/Home/Newsletter'
import Header from '../../components/header'
import Footer from '../../components/footer'
import HeroSection from '../../components/About/reusableHero'
import SectionAb1 from '../../components/About/sectionAb1'
import SectionAb2 from '../../components/About/sectionAb2'

const About = () => {
  return (
    <div>
      
      <Header />
      <HeroSection
        title="About Me"
        subtitle="Here's an overview of what we do"
    />
    <SectionAb1 />
    <SectionAb2 />
      <NewsletterSubscription />
      <Footer />
    </div>
  )
}

export default About
