import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { ROUTES } from '../routes';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center px-6">
        
        <div className="flex flex-col text-center lg:text-left mb-6 lg:mb-0">
          <h2 className="text-lg font-bold mb-2">All kinds of courses are available here</h2>
          <p className="text-md text-gray-300">Best courses at affordable prices</p>
          <p className="text-sm text-gray-400">123 Rakin St, Rakin City, RK 12345</p>
          <p className="text-sm text-gray-400">Contact: (123) 456-7890</p>
          <p className="text-sm text-gray-400">Email: info@learnwithtahmid.com</p>
        </div>

        <ul className="flex lg:pr-44 space-x-6 mb-6 lg:mb-0">
          <li><a href={ROUTES.HOME} className="hover:text-gray-300 transition duration-300">Home</a></li>
          <li><a href={ROUTES.ABOUT} className="hover:text-gray-300 transition duration-300">About</a></li>
          <li><a href={ROUTES.FAQ} className="hover:text-gray-300 transition duration-300">FAQ</a></li>
        </ul>

        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition duration-300 transform hover:scale-110"
          >
            <FaFacebook size={28} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition duration-300 transform hover:scale-110"
          >
            <FaTwitter size={28} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition duration-300 transform hover:scale-110"
          >
            <FaInstagram size={28} />
          </a>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-600 pt-4 text-center">
        <p className="text-sm font-bold text-gray-400">
          &copy; {new Date().getFullYear()} LearnWithTahmid. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
