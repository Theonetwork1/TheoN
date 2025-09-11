import React, { useEffect } from 'react';
import { Smartphone, Globe, Cog, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Services = () => {
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

  const services = [
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: t('services.app.title'),
      description: t('services.app.desc'),
      features: [
        'Native iOS & Android Development',
        'Cross-platform Solutions',
        'Progressive Web Apps',
        'App Store Optimization',
        'Maintenance & Updates',
      ],
      color: 'from-blue-500 to-purple-600',
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: t('services.web.title'),
      description: t('services.web.desc'),
      features: [
        'Responsive Web Design',
        'E-commerce Solutions',
        'Content Management Systems',
        'SEO Optimization',
        'Performance Optimization',
      ],
      color: 'from-green-500 to-teal-600',
    },
    {
      icon: <Cog className="w-12 h-12" />,
      title: t('services.automation.title'),
      description: t('services.automation.desc'),
      features: [
        'Workflow Automation',
        'API Integration',
        'Database Management',
        'Custom Software Solutions',
        'Process Optimization',
      ],
      color: 'from-orange-500 to-red-600',
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: t('services.consulting.title'),
      description: t('services.consulting.desc'),
      features: [
        'Technology Strategy',
        'Digital Transformation',
        'Technical Audits',
        'Architecture Planning',
        'Team Training',
      ],
      color: 'from-purple-500 to-pink-600',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-slate-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('services.title')}
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </header>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <article
                key={index}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll hover-lift"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Service Header */}
                <div className={`bg-gradient-to-r ${service.color} p-8 text-white`}>
                  <div className="flex items-center mb-4 animate-scale-in" style={{ animationDelay: `${index * 0.2 + 0.1}s` }}>
                    {service.icon}
                    <h2 className="text-2xl font-bold ml-4">{service.title}</h2>
                  </div>
                  <p className="text-lg opacity-90 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Service Features */}
                <div className="p-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">What's Included:</h3>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center animate-slide-in-left" style={{ animationDelay: `${index * 0.2 + featureIndex * 0.1}s` }}>
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a
                    href="https://wa.me/+17745069615?text=Hi! I'm interested in your services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-300 btn-animate"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              A proven methodology that delivers exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'We analyze your needs and define project requirements', icon: '🔍' },
              { step: '02', title: 'Planning', description: 'Create detailed roadmap and timeline for your project', icon: '📋' },
              { step: '03', title: 'Development', description: 'Build your solution using best practices and latest tech', icon: '⚡' },
              { step: '04', title: 'Launch', description: 'Deploy, test, and provide ongoing support and maintenance', icon: '🚀' },
            ].map((process, index) => (
              <div key={index} className="text-center animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 hover-lift">
                  {process.step}
                </div>
                <div className="text-4xl mb-4">{process.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{process.title}</h3>
                <p className="text-slate-600 leading-relaxed">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and see how we can help you achieve your goals.
          </p>
          <a
            href="https://wa.me/+17745069615?text=Hi! I'm ready to get started with Theo Network services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 btn-animate"
          >
            {t('nav.consultation')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;