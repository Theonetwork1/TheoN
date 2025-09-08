import React from 'react';
import { CheckCircle, Users, Award, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

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
      <section className="bg-gradient-to-br from-slate-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
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
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {t('about.mission.title')}
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {t('about.mission.desc')}
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Founded with a vision to bridge the gap between technology and business success, 
                Theo Network has grown to become a trusted partner for companies looking to 
                leverage technology for competitive advantage.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <img 
                    src="/TheoNetwork Logo (1).png"
                    alt="Theo Network Logo" 
                    className="w-32 h-32 object-contain mx-auto mb-4"
                  />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t('about.owner.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white font-bold text-5xl">TA</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{t('about.owner.name')}</h3>
                  <p className="text-slate-600">{t('about.owner.role')}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {t('about.owner.name')}
              </h3>
              <p className="text-orange-600 font-semibold mb-6">
                {t('about.owner.role')}
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                {t('about.owner.bio')}
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Theshneider's commitment to excellence and innovation has made Theo Network 
                a leading choice for businesses seeking reliable technology partners. His 
                multilingual approach ensures that clients from diverse backgrounds receive 
                personalized service in their preferred language.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
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
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-orange-600 mb-4">{value.icon}</div>
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
    </div>
  );
};

export default About;