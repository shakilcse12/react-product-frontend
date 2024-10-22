const ReviewsFaqSection = () => {
    // Dummy data for user reviews with profile pictures
    const reviews = [
      {
        id: 1,
        name: "John Doe",
        review: "This web development course was amazing! I learned so much and now I can build responsive websites.",
        rating: 5,
        profilePic: "https://via.placeholder.com/100", // Placeholder image
      },
      {
        id: 2,
        name: "Jane Smith",
        review: "The Flutter course was very detailed, and the instructor was excellent. Highly recommend it!",
        rating: 4.5,
        profilePic: "https://via.placeholder.com/100", // Placeholder image
      },
      {
        id: 3,
        name: "Mark Lee",
        review: "Great JavaScript course! The lessons on ES6 and asynchronous programming were top-notch.",
        rating: 4,
        profilePic: "https://via.placeholder.com/100", // Placeholder image
      },
    ];
  
    // Dummy data for FAQ
    const faqs = [
      {
        question: "What is the duration of each course?",
        answer: "Each course varies in duration, but most are between 8 to 12 weeks with self-paced options.",
      },
      {
        question: "Do I get a certificate after completing a course?",
        answer: "Yes, you will receive a certificate upon successful completion of each course.",
      },
      {
        question: "What support is available during the course?",
        answer: "We offer 24/7 student support via email and live chat. You can also join our community forums for help.",
      },
    ];
  
    return (
      <div className="p-6 container mx-auto">
        {/* User Reviews Section */}
        <h2 className="text-3xl font-bold mb-6 text-center">Customer Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map(review => (
            <div key={review.id} className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
              <div className="flex items-center mb-4">
                <img
                  src={review.profilePic}
                  alt={review.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
              </div>
              <p className="text-sm text-gray-600">"{review.review}"</p>
              <div className="mt-4">
                <span className="text-yellow-500 font-bold">Rating: {review.rating}/5</span>
              </div>
            </div>
          ))}
        </div>
  
        {/* FAQ Section */}
        <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-100 border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
              <p className="text-sm text-gray-600 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ReviewsFaqSection;
  