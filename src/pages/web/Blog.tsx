
import NewsletterSubscription from '../../components/Home/Newsletter'
import Header from '../../components/header'
import Footer from '../../components/footer'
import HeroSection from '../../components/About/reusableHero'

const Blog = () => {
  return (
    <div>

      <Header/>
      <HeroSection
        title="Blog Post"
        subtitle="Here’s our blog post drafts"
        />
      <NewsletterSubscription />
      <Footer />
    </div>
  )
}

export default Blog
