const ContactUs = () => {
  return (
    <section className="py-16 px-4 sm:px-8 bg-gray-100">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800">Contact Us</h2>
      <p className="mt-4 text-center text-gray-600 text-lg sm:text-xl">
        We'd love to hear from you! Please fill out the form below.
      </p>
      <div className="mt-8 max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg">
        <form className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700">Name</label>
            <input 
              type="text" 
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-700">Email</label>
            <input 
              type="email" 
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your email"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-bold text-gray-700">Message</label>
            <textarea 
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              rows="5" 
              placeholder="Enter your message"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
