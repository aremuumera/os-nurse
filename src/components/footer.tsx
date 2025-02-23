import { Mail, Phone, MapPin,} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  

  return (
    <footer className="bg-primary-main pt-10 pb-10 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <img 
              src="/Oversabi-Nurse-logo.png" 
              alt="Logo" 
              className="h-10 w-auto"
            />
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6 text-white mb-4 md:mb-0">
            <Link to="/" className="hover:text-pink-400 transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-pink-400 transition-colors">
              About
            </Link>
            <Link to="/blog" className="hover:text-pink-400 transition-colors">
              Blog
            </Link>
            <Link to="/contact" className="hover:text-pink-400 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Got To Top Button */}
        
        </div>

        {/* Contact Info Bar */}
        <div className="bg-[#5A3467]  p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            {/* Contact Details */}
            <div className="flex flex-col md:flex-row gap-6">
              <a 
                href="mailto:hello@squareup.com" 
                className="flex items-center gap-2 text-[] transition-colors"
              >
                <Mail className="w-4  text-[#E32B8D] h-4" />
                oversabinurse@gmail.com
              </a>
              <a 
                href="tel:+91918132320 text-[#E32B8D]9" 
                className="flex items-center gap-2 text-[] transition-colors"
              >
                <Phone className="w-4 text-[#E32B8D]  h-4" />
                +1 (973) 392-31029
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 text-[#E32B8D] h-4" />
                United States
              </span>
            </div>

            {/* Copyright */}
            <div className="text-gray-300">
              © 2025 Edoubleone Inc. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;