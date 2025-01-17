import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
        {/* Branding Section */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-3xl font-extrabold text-white">JobSphere</h1>
          <p className="text-sm text-gray-400 mt-2">
            Connecting talents with opportunities. Empowering careers, one job at a time.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-start space-x-4 mb-6 md:mb-0">
          <a href="/about" className="hover:text-white transition-colors">
            About Us
          </a>
          <a href="/contact" className="hover:text-white transition-colors">
            Contact
          </a>
          <a href="/privacy-policy" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </a>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} JobSphere. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
