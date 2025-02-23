

import Header from '../../components/header'
import HeroSection from '../../components/About/reusableHero'
import BlogDetailsPage from '../../components/Blog/blog_detail'
import NewsletterSubscription from '../../components/Home/Newsletter'
import Footer from '../../components/footer'

const BlogDetail = () => {
  return (
    <div>
      <Header/>
      <HeroSection
        title="Blog Post"
        subtitle="Here’s our blog post drafts"
        />
      <BlogDetailsPage />
      <NewsletterSubscription />
      <Footer />
    </div>
  )
}

export default BlogDetail
