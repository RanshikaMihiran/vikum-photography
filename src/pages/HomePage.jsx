import ParallaxHero from '../components/layout/ParallaxHero';
import AestheticSection from '../components/features/AestheticSection';
import ImageShowcase from '../components/features/ImageShowcase';
import CTASection from '../components/features/CTASection';
import ExperienceSection from '../components/features/ExperienceSection';
import FeaturedWork from '../components/features/FeaturedWork';
import FeaturedWeddings from '../components/features/FeaturedWeddings';
import Testimonials from '../components/features/Testimonials';
import ServicesMenu from '../components/features/ServicesMenu';
import FAQSection from '../components/features/FAQSection';
import SEO from '../components/layout/SEO';

const HomePage = () => {
  return (
    <>

    <SEO 
        title="Home" 
        description="Award-winning photographer in Sri Lanka specializing in weddings, portraits, and lifestyle photography."
      />
      <ParallaxHero />
      <ExperienceSection />
      <ServicesMenu />
      <FeaturedWork />
      <FeaturedWeddings />
      <AestheticSection />
      <Testimonials />
      <FAQSection />
      {/* <ImageShowcase /> */}
      
      <CTASection />
    </>
  );
};

export default HomePage;