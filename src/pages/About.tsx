import React, { useEffect } from 'react';
import { CheckCircle, Users, Award, Globe, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: '100+', label: 'Projects Completed' },
    { number: '50+', label: 'Happy Clients' },
    { number: '5+', label: 'Years Experience' },
    { number: '24/7', label: 'Support Available' },
  ];

  const values = [
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Quality First',
      description: 'We never compromise on quality and always deliver excellence in every project.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Client-Focused',
      description: 'Your success is our success. We work closely with you to achieve your goals.',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Innovation',
      description: 'We stay ahead of technology trends to provide cutting-edge solutions.',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Reach',
      description: 'Serving clients worldwide with localized solutions and multilingual support.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-slate-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-on-scroll">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll animate-slide-in-left">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {t('about.mission.title')}
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {t('about.mission.desc')}
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Founded with a vision to bridge the gap between technology and business success, 
                Theonetwork has grown to become a trusted partner for companies looking to 
                leverage technology for competitive advantage.
              </p>
            </div>
            <div className="relative animate-on-scroll animate-slide-in-right">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-8 h-96 flex items-center justify-center hover-lift">
                <div className="text-center">
                  <img 
                    src="/TheoNetwork Logo (1).png"
                    alt="Theonetwork Logo" 
                    className="w-32 h-32 object-contain mx-auto mb-4 animate-scale-in"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t('about.owner.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative animate-on-scroll animate-slide-in-left">
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-8 h-96 flex items-center justify-center hover-lift">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                    <span className="text-white font-bold text-5xl">TA</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{t('about.owner.name')}</h3>
                  <p className="text-slate-600">{t('about.owner.role')}</p>
                </div>
              </div>
            </div>
            <div className="animate-on-scroll animate-slide-in-right">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {t('about.owner.name')}
              </h3>
              <p className="text-orange-600 font-semibold mb-6">
                {t('about.owner.role')}
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                {t('about.owner.bio')}
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Theshneider's commitment to excellence and innovation has made Theonetwork 
                a leading choice for businesses seeking reliable technology partners. His 
                multilingual approach ensures that clients from diverse backgrounds receive 
                personalized service in their preferred language.
              </p>
              <a
                href="https://wa.me/+17745069615?text=Hi! I'd like to connect with Theshneider."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-300 btn-animate"
              >
                Connect with Theshneider
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-orange-600 mb-4 animate-scale-in" style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help transform your business with innovative technology solutions.
          </p>
          <a
            href="https://wa.me/+17745069615?text=Hi! I'm ready to work with Theonetwork."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 btn-animate"
          >
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;