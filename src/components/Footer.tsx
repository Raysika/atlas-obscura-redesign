
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand and Social */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">Atlas Obscura</h3>
            <p className="text-gray-400 mb-4">
              Discover the world's hidden wonders
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Globe size={20} />
              </a>
            </div>
          </div>
          
          {/* About */}
          <div>
            <h4 className="text-lg font-medium mb-4">About</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Press</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Community Guidelines</a></li>
            </ul>
          </div>
          
          {/* Explore */}
          <div>
            <h4 className="text-lg font-medium mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Places</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Experiences</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Stories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Random Place</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Unusual Trips</a></li>
            </ul>
          </div>
          
          {/* Connect */}
          <div>
            <h4 className="text-lg font-medium mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Add a Place</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Join the Community</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Newsletter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Host an Experience</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Become a Partner</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Atlas Obscura. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-white text-sm">Terms</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm">Cookies</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
