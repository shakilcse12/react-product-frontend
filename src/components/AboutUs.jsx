const AboutUs = () => {
  return (
    <section className="py-16 px-4 sm:px-8 bg-white-100">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800">About Us</h2>
        <p className="mt-4 text-center text-lg text-gray-600">
          We are dedicated to delivering high-quality products and excellent customer service.
        </p>

        {/* Owner Info */}
        <div className="mt-12 flex flex-col sm:flex-row sm:justify-center items-center sm:space-x-12">
          <div className="flex-shrink-0">
            <img
              src="https://via.placeholder.com/200"
              alt="Owner"
              className="rounded-full w-40 h-40 sm:w-48 sm:h-48 object-cover shadow-md border-4 border-gray-200"
            />
          </div>
          <div className="mt-8 sm:mt-0 text-center sm:text-left max-w-lg">
            <h3 className="text-2xl font-bold text-gray-800">Tahmid Shakil</h3>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              As the owner of this website, I’m passionate about providing the best products and services to our valued
              customers. Your satisfaction is my priority.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Our journey started with a simple idea: to offer high-quality products with unmatched customer service. We
              are committed to continuing this legacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
