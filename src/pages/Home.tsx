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
      <section ref={heroRef} className="relative py-20 overflow-hidden min-h-screen flex items-center">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
          >
            <source
              src="https://videos.pexels.com/video-files/3129957/3129957-uhd_3840_2160_30fps.mp4"
              type="video/mp4"
            />
            <source
              src="https://videos.pexels.com/video-files/3129957/3129957-hd_1920_1080_30fps.mp4"
              type="video/mp4"
            />
            {/* Fallback image for browsers that don't support video */}
            <img
              src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
              alt="Technology workspace background"
              className="w-full h-full object-cover"
            />
          </video>
          
          {/* Video Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-orange-900/50"></div>
          
          {/* Additional overlay for mobile optimization */}
          <div className="absolute inset-0 bg-black/20 md:bg-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center animate-on-scroll">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in drop-shadow-2xl">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in animate-delay-200 drop-shadow-lg">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-300">
              <a
                href="https://wa.me/+17745069615?text=Hi! I'd like to book a consultation with Theo Network."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-105 btn-animate backdrop-blur-sm"
              >
                {t('home.hero.cta')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <Link
                to="/services"
                className="inline-flex items-center px-8 py-4 bg-white/90 hover:bg-white text-slate-800 font-semibold rounded-lg shadow-2xl border border-white/20 transition-all duration-300 hover-lift backdrop-blur-sm"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative z-10">
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

      {/* Second Video Banner */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
          >
            <source
              src="https://videos.pexels.com/video-files/3195394/3195394-uhd_3840_2160_25fps.mp4"
              type="video/mp4"
            />
            <source
              src="https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4"
              type="video/mp4"
            />
            <img
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
              alt="Innovation and technology workspace"
              className="w-full h-full object-cover"
            />
          </video>
          
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/70 to-orange-900/80"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl">
              Innovation Meets Excellence
            </h2>
            <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              We combine cutting-edge technology with creative vision to deliver solutions that transform businesses and exceed expectations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-300">
              <a
                href="https://wa.me/+17745069615?text=Hi! I want to innovate with Theo Network."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white/90 hover:bg-white text-slate-800 font-semibold rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                Start Innovation
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="https://wa.me/+17745069615?text=Hi! I'd like to see your portfolio."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-orange-600/90 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-2xl border border-white/20 transition-all duration-300 hover-lift backdrop-blur-sm"
              >
                View Portfolio
              </a>
            </div>
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

      {/* Interactive Separator */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
          
          {/* Gradient Waves */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path 
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                fill="rgba(255,255,255,0.1)"
                className="animate-wave"
              />
            </svg>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center space-x-4 animate-pulse-slow">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-orange-500"></div>
              <div className="w-4 h-4 bg-orange-500 rounded-full animate-ping"></div>
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-orange-500"></div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-8 mb-4 animate-fade-in">
              Ready to Transform Your Vision?
            </h2>
            <p className="text-lg text-gray-300 animate-fade-in animate-delay-200">
              Let's create something extraordinary together
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #ea580c 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #ea580c 2px, transparent 2px)`,
            backgroundSize: '60px 60px',
            animation: 'float 20s ease-in-out infinite'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll relative z-10">
            <div className="inline-block mb-6">
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold animate-bounce-slow">
                Notre Méthodologie
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 animate-slide-in-up">
              Our Process
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto animate-slide-in-up animate-delay-200">
              A proven methodology that delivers exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {[
              { step: '01', title: 'Discovery', description: 'We analyze your needs and define project requirements', icon: '🔍' },
              { step: '02', title: 'Planning', description: 'Create detailed roadmap and timeline for your project', icon: '📋' },
              { step: '03', title: 'Development', description: 'Build your solution using best practices and latest tech', icon: '⚡' },
              { step: '04', title: 'Launch', description: 'Deploy, test, and provide ongoing support and maintenance', icon: '🚀' },
            ].map((process, index) => (
              <div key={index} className="text-center animate-on-scroll group" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto hover-lift transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
                    {process.step}
                  </div>
                  {/* Connecting Line */}
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-orange-300 to-transparent transform -translate-x-10 animate-pulse-slow"></div>
                  )}
                </div>
                <div className="text-5xl mb-6 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-6">{process.icon}</div>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform group-hover:-translate-y-2 border border-gray-100">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">{process.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{process.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Process Flow Animation */}
          <div className="mt-16 text-center animate-on-scroll">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-slate-700 font-medium">Processus Éprouvé</span>
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Geometric Shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/10 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll relative z-10">
          <div className="transform transition-all duration-700 hover:scale-105">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-slide-in-up">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto animate-slide-in-up animate-delay-200">
              Join hundreds of satisfied clients who have elevated their digital presence with our expert solutions.
            </p>
            
            <div className="relative inline-block animate-slide-in-up animate-delay-400">
              {/* Glowing Effect */}
              <div className="absolute inset-0 bg-orange-600 rounded-lg blur-xl opacity-30 animate-pulse-slow"></div>
              <a
                href="https://wa.me/+17745069615?text=Hi! I'm ready to transform my business with Theo Network."
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 btn-animate"
              >
                Start Your Project Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
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