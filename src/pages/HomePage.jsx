import AboutUs from "../components/AboutUs";
import Banner from "../components/Banner";
import ContactUs from "../components/ContactUs";
import HowItWorks from "../components/HowItWorks";
import ProductSection from "../components/ProductSection";
const HomePage = () => {
    return (
        <div className="flex flex-col">
            <Banner />
            <HowItWorks />
            <ProductSection />
            <ContactUs />
            <AboutUs />
        </div>
    );
}

export default HomePage;