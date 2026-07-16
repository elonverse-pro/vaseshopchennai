import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { siteSettings } from '../mockData';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">{siteSettings.siteName}</h3>
            <p className="text-gray-400 text-sm">
              {siteSettings.siteTagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/category/new-arrivals" className="text-gray-400 hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/category/elf-bar" className="text-gray-400 hover:text-white transition-colors">
                  Elf Bar
                </Link>
              </li>
              <li>
                <Link to="/category/iget-vape" className="text-gray-400 hover:text-white transition-colors">
                  IGET Vape
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>{siteSettings.phone}</span>
              </li>
              {siteSettings.alternatePhone && (
                <li className="flex items-start gap-2 text-gray-400">
                  <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>{siteSettings.alternatePhone}</span>
                </li>
              )}
              <li className="flex items-start gap-2 text-gray-400">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>{siteSettings.email}</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>{siteSettings.address}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {siteSettings.facebookUrl && (
                <a href={siteSettings.facebookUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {siteSettings.instagramUrl && (
                <a href={siteSettings.instagramUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {siteSettings.twitterUrl && (
                <a href={siteSettings.twitterUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2025 {siteSettings.siteName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;