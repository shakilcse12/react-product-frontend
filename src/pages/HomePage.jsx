import AboutUs from "../components/AboutUs";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import ContactUs from "../components/ContactUs";
import HowItWorks from "../components/HowItWorks";
import ProductHighlights from "../components/ProductHighligts";
import ProductSection from "../components/ProductSection";
import { useRef } from 'react';
import ReviewsFaqSection from "../components/ReviewsFaqSection";

const HomePage = () => {
    const productsRef = useRef(null); // Create a ref for the Products section
    const learnMoreRef = useRef(null);

  const handleExploreClick = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to Products section
    }
  };
  const handleLearnMoreClick = () => {
    if (learnMoreRef.current) {
        learnMoreRef.current.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to Products section
    }
  };
    return (
        <div className="flex flex-col">

            <Banner onExploreClick={handleExploreClick} onLearnMoreClick={handleLearnMoreClick} />

            <section ref={learnMoreRef}>
                <HowItWorks />
            </section>

            <Categories />

            <ProductHighlights />

            <section ref={productsRef}>
                <ProductSection />
            </section>

            {/* <ContactUs />
            <AboutUs /> */}

            <ReviewsFaqSection />

        </div>
    );
}

export default HomePage;