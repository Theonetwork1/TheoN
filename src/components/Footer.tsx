import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/TheoNetwork Logo (1).png" 
                alt="Theonetwork Logo" 
                className="w-14 h-14 object-contain"
              />
              <span className="text-xl font-bold">Theonetwork</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              {t('footer.tagline')}
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-500" />
                <span className="text-gray-300">{t('contact.info.email')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-500" />
                <span className="text-gray-300">{t('contact.info.phone')}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <span className="text-xs text-gray-500">
                Professional Tech Solutions
              </span>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.company.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/services" 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-300 hover:text-orange-500 transition-colors duration-200"
                >
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-300 hover:text-orange-500 transition-colors duration-200"
                >
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-300 hover:text-orange-500 transition-colors duration-200"
                >
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-300 hover:text-orange-500 transition-colors duration-200"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a 
              href="https://www.facebook.com/profile.php?id=61571632958090" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="https://twitter.com/Theonetwork1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="https://www.instagram.com/theonetwork1?igsh=MTZvMnY0ZXJmMmJmaQ==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://tiktok.com/@theo_network" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;