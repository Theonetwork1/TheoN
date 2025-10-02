import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ht' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.consultation': 'Book Consultation',
    
    // Home page
    'home.hero.title': 'Transform Your Business with Professional Tech Solutions',
    'home.hero.subtitle': 'Expert app development, web creation, system automation, and strategic consulting to elevate your digital presence.',
    'home.hero.cta': 'Book a Consultation',
    'home.hero.secondary': 'View Our Work',
    'home.promo.badge': 'Limited Time',
    'home.promo.title': 'Free Consultation Week',
    'home.promo.subtitle': 'Get expert advice at no cost this week only',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive tech solutions tailored to your business needs',
    'services.app.title': 'App Development',
    'services.app.desc': 'Custom mobile and web applications built with cutting-edge technology',
    'services.web.title': 'Website Creation',
    'services.web.desc': 'Professional websites that convert visitors into customers',
    'services.automation.title': 'System Automation',
    'services.automation.desc': 'Streamline your workflows with intelligent automation solutions',
    'services.consulting.title': 'Strategic Consulting',
    'services.consulting.desc': 'Expert guidance to optimize your tech strategy and operations',
    
    // About
    'about.title': 'About Theonetwork',
    'about.subtitle': 'Leading the future of digital transformation',
    'about.mission.title': 'Our Mission',
    'about.mission.desc': 'To empower businesses with innovative technology solutions that drive growth and efficiency.',
    'about.owner.title': 'Meet Our Founder',
    'about.owner.name': 'Theshneider Avril',
    'about.owner.role': 'Founder & CEO',
    'about.owner.bio': 'With years of experience in tech consulting and development, Theshneider leads Theonetwork with a vision to transform how businesses leverage technology.',
    
    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Ready to transform your business? Let\'s discuss your project.',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.info.email': 'hello@theonetwork.com',
    'contact.info.phone': '+1 (774) 506-9615',
    'contact.info.address': 'Pennsylvania, USA',
    
    // Footer
    'footer.tagline': 'Professional tech solutions for modern businesses',
    'footer.services.title': 'Services',
    'footer.company.title': 'Company',
    'footer.support.title': 'Support',
    'footer.rights': '2025 Theonetwork. All rights reserved.',
  },
  ht: {
    // Navigation
    'nav.home': 'Akèy',
    'nav.about': 'Konsènan',
    'nav.services': 'Sèvis yo',
    'nav.contact': 'Kontak',
    'nav.consultation': 'Rezèvye Konsèy',
    
    // Home page
    'home.hero.title': 'Transfòme Biznis Ou a ak Solisyon Teknoloji Pwofesyonèl',
    'home.hero.subtitle': 'Devlopman aplikasyon ekspè, kreyasyon wèb, otomatizasyon sistèm, ak konsèy estratejik pou élève prezans dijital ou.',
    'home.hero.cta': 'Rezèvye Konsèy',
    'home.hero.secondary': 'Gade Travay Nou',
    'home.promo.badge': 'Tan Limite',
    'home.promo.title': 'Semèn Konsèy Gratis',
    'home.promo.subtitle': 'Jwenn konsèy ekspè san kòb sèlman semèn sa a',
    
    // Services
    'services.title': 'Sèvis Nou yo',
    'services.subtitle': 'Solisyon teknoloji konplè yo ki fèt pou bezwen biznis ou',
    'services.app.title': 'Devlopman Aplikasyon',
    'services.app.desc': 'Aplikasyon mobil ak wèb kustom yo ki konstwi ak teknoloji ki pi avanse yo',
    'services.web.title': 'Kreyasyon Sit Wèb',
    'services.web.desc': 'Sit wèb pwofesyonèl ki konvèti vizitè yo nan klian yo',
    'services.automation.title': 'Otomatizasyon Sistèm',
    'services.automation.desc': 'Simplifye workflow ou yo ak solisyon otomatizasyon entelijan',
    'services.consulting.title': 'Konsèy Estratejik',
    'services.consulting.desc': 'Gid ekspè pou optimize estratèji ak operasyon teknoloji ou',
    
    // About
    'about.title': 'Konsènan Theonetwork',
    'about.subtitle': 'Ap dirije lavni transfòmasyon dijital la',
    'about.mission.title': 'Misyon Nou',
    'about.mission.desc': 'Pou bay biznis yo pouvwa ak solisyon teknoloji inovatè ki kondwi kwasans ak efikasite.',
    'about.owner.title': 'Konèt Fondatè Nou',
    'about.owner.name': 'Theshneider Avril',
    'about.owner.role': 'Fondatè ak PDG',
    'about.owner.bio': 'Ak ane eksperyans nan konsèy ak devlopman teknoloji, Theshneider ap mennen Theonetwork ak yon vizyon pou transfòme kijan biznis yo ap tire pati nan teknoloji.',
    
    // Contact
    'contact.title': 'Rete Konekte',
    'contact.subtitle': 'Pare pou transfòme biznis ou? Ann diskite pwojè ou.',
    'contact.form.name': 'Non Konplè',
    'contact.form.email': 'Adrès Imèl',
    'contact.form.subject': 'Sijè',
    'contact.form.message': 'Mesaj',
    'contact.form.submit': 'Voye Mesaj',
    'contact.info.email': 'hello@theonetwork.com',
    'contact.info.phone': '+1 (774) 506-9615',
    'contact.info.address': 'Pennsylvania, USA',
    
    // Footer
    'footer.tagline': 'Solisyon teknoloji pwofesyonèl pou biznis modèn yo',
    'footer.services.title': 'Sèvis yo',
    'footer.company.title': 'Konpayi',
    'footer.support.title': 'Sipò',
    'footer.rights': '2025 Theonetwork. Tout dwa yo rezève.',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.consultation': 'Réserver Consultation',
    
    // Home page
    'home.hero.title': 'Transformez Votre Entreprise avec des Solutions Tech Professionnelles',
    'home.hero.subtitle': 'Développement d\'applications expert, création web, automatisation système et conseil stratégique pour élever votre présence digitale.',
    'home.hero.cta': 'Réserver une Consultation',
    'home.hero.secondary': 'Voir Notre Travail',
    'home.promo.badge': 'Temps Limité',
    'home.promo.title': 'Semaine de Consultation Gratuite',
    'home.promo.subtitle': 'Obtenez des conseils d\'expert gratuitement cette semaine seulement',
    
    // Services
    'services.title': 'Nos Services',
    'services.subtitle': 'Solutions technologiques complètes adaptées aux besoins de votre entreprise',
    'services.app.title': 'Développement d\'Applications',
    'services.app.desc': 'Applications mobiles et web personnalisées construites avec une technologie de pointe',
    'services.web.title': 'Création de Sites Web',
    'services.web.desc': 'Sites web professionnels qui convertissent les visiteurs en clients',
    'services.automation.title': 'Automatisation Système',
    'services.automation.desc': 'Optimisez vos workflows avec des solutions d\'automatisation intelligentes',
    'services.consulting.title': 'Conseil Stratégique',
    'services.consulting.desc': 'Guidance experte pour optimiser votre stratégie et opérations technologiques',
    
    // About
    'about.title': 'À Propos de Theonetwork',
    'about.subtitle': 'Menant l\'avenir de la transformation digitale',
    'about.mission.title': 'Notre Mission',
    'about.mission.desc': 'Autonomiser les entreprises avec des solutions technologiques innovantes qui stimulent la croissance et l\'efficacité.',
    'about.owner.title': 'Rencontrez Notre Fondateur',
    'about.owner.name': 'Theshneider Avril',
    'about.owner.role': 'Fondateur et PDG',
    'about.owner.bio': 'Avec des années d\'expérience en conseil technologique et développement, Theshneider dirige Theonetwork avec une vision pour transformer la façon dont les entreprises exploitent la technologie.',
    
    // Contact
    'contact.title': 'Contactez-Nous',
    'contact.subtitle': 'Prêt à transformer votre entreprise ? Discutons de votre projet.',
    'contact.form.name': 'Nom Complet',
    'contact.form.email': 'Adresse Email',
    'contact.form.subject': 'Sujet',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Envoyer Message',
    'contact.info.email': 'hello@theonetwork.com',
    'contact.info.phone': '+1 (774) 506-9615',
    'contact.info.address': 'Pennsylvania, USA',
    
    // Footer
    'footer.tagline': 'Solutions technologiques professionnelles pour entreprises modernes',
    'footer.services.title': 'Services',
    'footer.company.title': 'Entreprise',
    'footer.support.title': 'Support',
    'footer.rights': '2025 Theonetwork. Tous droits réservés.',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};