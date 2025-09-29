import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Instagram, Twitter, Music } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/services', label: t('nav.services') },
    { path: '/contact', label: t('nav.contact') },
    { path: '/faq', label: 'FAQ' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61571632958090', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/theonetwork1?igsh=MTZvMnY0ZXJmMmJmaQ==', label: 'Instagram' },
    { icon: Twitter, href: 'https://x.com/theonetwork', label: 'X (Twitter)' },
    { icon: Music, href: 'https://tiktok.com/@theo_network', label: 'TikTok' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/TheoNetwork Logo (1).png" 
              alt="Theonetwork Logo" 
              className="w-20 h-20 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-700 hover:text-orange-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-orange-600 transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
            
            <a
              href="https://wa.me/17745069615?text=Hi! I'd like to book a consultation with Theonetwork."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 transition-colors duration-200"
            >
              {t('nav.consultation')}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-gray-100 transition-colors duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Social Media Icons */}
              <div className="px-3 py-2">
                <div className="flex items-center space-x-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-orange-600 transition-colors duration-200"
                        aria-label={social.label}
                      >
                        <IconComponent className="w-6 h-6" />
                      </a>
                    );
                  })}
                </div>
              </div>
              
              <a
                href="https://wa.me/17745069615?text=Hi! I'd like to book a consultation with Theonetwork."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-orange-600 hover:bg-orange-700 transition-colors duration-200"
              >
                {t('nav.consultation')}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;