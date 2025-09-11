import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle, Smartphone, Globe, Cog, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);

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
      icon: <Smartphone className="w-8 h-8" />,
      title: t('services.app.title'),
      description: t('services.app.desc'),
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('services.web.title'),
      description: t('services.web.desc'),
    },
    {
      icon: <Cog className="w-8 h-8" />,
      title: t('services.automation.title'),
      description: t('services.automation.desc'),
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: t('services.consulting.title'),
      description: t('services.consulting.desc'),
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      content: 'Theo Network transformed our digital presence completely. Their expertise in app development is unmatched.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      company: 'GrowthCorp',
      content: 'The automation solutions they provided saved us countless hours. Exceptional service and results.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      company: 'InnovateLab',
      content: 'Professional, reliable, and innovative. Theo Network delivered exactly what we needed on time.',
      rating: 5,
    },
  ];

  const stats = [
    { number: '100+', label: 'Projects Completed' },
    { number: '50+', label: 'Happy Clients' },
    { number: '5+', label: 'Years Experience' },
    { number: '24/7', label: 'Support Available' },
  ];

  return (
    <div className="min-h-screen">
      {/* Free Consultation Promo Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-3 animate-slide-in-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center text-center">
            <span className="bg-white text-orange-600 text-xs font-bold px-2 py-1 rounded-full mr-3 animate-scale-in">
              {t('home.promo.badge')}
            </span>
            <span className="font-semibold">{t('home.promo.title')}</span>
            <span className="hidden sm:inline ml-2">- {t('home.promo.subtitle')}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-slate-50 to-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center animate-on-scroll">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight animate-fade-in">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in animate-delay-200">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-300">
              <a
                href="https://wa.me/+17745069615?text=Hi! I'd like to book a consultation with Theo Network."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 btn-animate"
              >
                {t('home.hero.cta')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <Link
                to="/services"
                className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-50 text-slate-800 font-semibold rounded-lg shadow-lg border border-gray-200 transition-all duration-300 hover-lift"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

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

      {/* Services Preview */}
      <section ref={servicesRef} className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 animate-fade-in">
              {t('services.title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto animate-fade-in animate-delay-200">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 animate-on-scroll hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-orange-600 mb-4 animate-scale-in" style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-on-scroll">
            <Link
              to="/services"
              className="inline-flex items-center px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors duration-300 btn-animate"
            >
              View All Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Featured Work
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Showcasing our latest and most impactful projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'EliteShop',
                description: 'Premium e-commerce platform with modern design and seamless shopping experience',
                image: '/Capture d\'écran 2025-07-22 171005 copy.png',
                category: 'E-Commerce'
              },
              {
                title: 'Fylisca',
                description: 'Natural hair care platform promoting healthy hair growth solutions',
                image: '/Capture d\'écran 2025-05-26 021825 copy.png',
                category: 'Beauty & Wellness'
              },
              {
                title: 'Kayanu',
                description: 'Elegant skincare brand celebrating natural beauty with clean design',
                image: '/Capture d\'écran 2025-06-01 012837 copy.png',
                category: 'Skincare'
              }
            ].map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll hover-lift"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <a
                    href="https://wa.me/+17745069615?text=Hi! I'd like to learn more about this project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-200"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-slate-600">
              Don't just take our word for it
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-on-scroll hover-lift"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.name}</div>
                  <div className="text-slate-500 text-sm">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto animate-fade-in animate-delay-200">
            Join hundreds of satisfied clients who have elevated their digital presence with our expert solutions.
          </p>
          <a
            href="https://wa.me/+17745069615?text=Hi! I'm ready to transform my business with Theo Network."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 btn-animate animate-fade-in animate-delay-400"
          >
            Start Your Project Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;