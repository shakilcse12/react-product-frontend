import bannerImage from '../assets/banner5.jpg';

const Banner = ({ onExploreClick, onLearnMoreClick }) => {
  return (
    <section className="relative w-full h-96 bg-cover bg-center bg-blue-300 flex items-center justify-center text-center"
      style={{ backgroundImage: `url(${bannerImage})` }}>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 p-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-md">
          Welcome to Our Website!
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-200 max-w-lg mx-auto drop-shadow-sm">
          Your one-stop solution for amazing products and experiences.
        </p>
        
        {/* Call to Action Buttons */}
        <div className="mt-8 space-x-4">
          <button 
            onClick={onExploreClick} 
            className="px-8 py-3 bg-orange-500 text-white rounded-lg text-lg font-semibold hover:bg-orange-600 transition">
            Explore Now
          </button>
          <button 
            onClick={onLearnMoreClick}
            className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
