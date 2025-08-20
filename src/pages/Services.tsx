import React from 'react';
import { Smartphone, Globe, Cog, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();

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
      <section className="bg-gradient-to-br from-slate-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('services.title')}
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Service Header */}
                <div className={`bg-gradient-to-r ${service.color} p-8 text-white`}>
                  <div className="flex items-center mb-4">
                    {service.icon}
                    <h3 className="text-2xl font-bold ml-4">{service.title}</h3>
                  </div>
                  <p className="text-lg opacity-90 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Service Features */}
                <div className="p-8">
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">What's Included:</h4>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-300"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              A proven methodology that delivers exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'We analyze your needs and define project requirements' },
              { step: '02', title: 'Planning', description: 'Create detailed roadmap and timeline for your project' },
              { step: '03', title: 'Development', description: 'Build your solution using best practices and latest tech' },
              { step: '04', title: 'Launch', description: 'Deploy, test, and provide ongoing support and maintenance' },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{process.title}</h3>
                <p className="text-slate-600 leading-relaxed">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and see how we can help you achieve your goals.
          </p>
          <a
            href="https://wa.me/17745069615?text=Hi! I'm ready to get started with Theo Network services."
            className="inline-flex items-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
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