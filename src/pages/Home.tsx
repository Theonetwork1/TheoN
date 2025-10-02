import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Smartphone, Globe, Cog, TrendingUp, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import EmailPopup from '../components/EmailPopup';

const Home = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // État pour les animations interactives
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  // Detect mobile device and set initial video state
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
      if (mobile) {
        setIsVideoMuted(true); // Mute on mobile only for autoplay compatibility
      } else {
        setIsVideoMuted(false); // Keep desktop with sound as it was working
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Video management - completely refactored
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let playAttempts = 0;
    const maxAttempts = 3;
    let currentVideoIndex = 0;
    const videoSources = ['/hero_banner_video_theo.mp4', '/theonetworkvideo.mp4'];

    const loadNextVideo = () => {
      if (currentVideoIndex < videoSources.length) {
        console.log(`Loading video source ${currentVideoIndex + 1}/${videoSources.length}: ${videoSources[currentVideoIndex]}`);
        video.src = videoSources[currentVideoIndex];
        video.load();
        currentVideoIndex++;
      } else {
        console.log('All video sources failed, showing error');
        setVideoError(true);
      }
    };

    const attemptPlay = async () => {
      try {
        console.log('Attempting to play video...', {
          muted: isVideoMuted,
          readyState: video.readyState,
          src: video.src,
          currentSrc: video.currentSrc
        });
        
        video.muted = isVideoMuted;
        video.playsInline = true;
        
        await video.play();
        console.log('Video playing successfully');
        setVideoLoaded(true);
        setVideoError(false);
      } catch (error) {
        console.log('Video play failed:', error);
        playAttempts++;
        
        if (playAttempts < maxAttempts) {
          console.log(`Retrying video play in ${1000 * playAttempts}ms (attempt ${playAttempts}/${maxAttempts})`);
          setTimeout(attemptPlay, 1000 * playAttempts);
        } else {
          console.log('Max play attempts reached, trying next video source');
          loadNextVideo();
        }
      }
    };

    const handleCanPlay = () => {
      console.log('Video can play event fired');
      attemptPlay();
    };

    const handleLoadedData = () => {
      console.log('Video loaded data event fired');
      attemptPlay();
    };

    const handleError = (e: Event) => {
      console.error('Video error occurred:', e);
      console.error('Video error details:', {
        error: video.error,
        networkState: video.networkState,
        readyState: video.readyState,
        src: video.src,
        currentSrc: video.currentSrc
      });
      
      // Try next video source
      loadNextVideo();
    };

    const handleLoadStart = () => {
      console.log('Video load start event fired');
      setVideoError(false);
    };

    const handleLoadedMetadata = () => {
      console.log('Video metadata loaded');
    };

    // Add event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Start loading the first video
    loadNextVideo();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [isVideoMuted]);

  // Handle user interaction
  const handleVideoInteraction = () => {
    const video = videoRef.current;
    if (video) {
      console.log('Video interaction triggered, current muted state:', isVideoMuted);
      setUserInteracted(true);
      
      // Toggle mute state
      if (isVideoMuted) {
        video.muted = false;
        setIsVideoMuted(false);
        console.log('Video unmuted - attempting to play with sound');
        
        // Force play after unmuting with user interaction
        video.play().then(() => {
          console.log('Video playing with sound successfully');
        }).catch((error) => {
          console.log('Video play with sound failed:', error);
          // If play fails, try muted play
          video.muted = true;
          video.play().catch(console.log);
        });
      } else {
        video.muted = true;
        setIsVideoMuted(true);
        console.log('Video muted');
        video.play().catch(console.log);
      }
    }
  };

  // Handle scroll to play/pause video based on hero section visibility
  useEffect(() => {
    const handleScroll = () => {
      const video = videoRef.current;
      const heroSection = heroRef.current;
      
      if (video && heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const isHeroVisible = heroRect.bottom > 0 && heroRect.top < window.innerHeight;
        
        if (isHeroVisible) {
          // Play video when hero section is visible
          video.muted = isVideoMuted; // Ensure mute state is respected
          video.play().catch(console.log);
          console.log('Video playing due to scroll to hero section');
        } else {
          // Pause video when leaving hero section
          video.pause();
          console.log('Video paused due to scroll away from hero section');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVideoMuted, userInteracted]);

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

  // Gestion du mouvement de la souris pour les effets parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Afficher le popup email après 10 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEmailPopup(true);
    }, 10000); // 10 secondes

    return () => clearTimeout(timer);
  }, []);

  // Auto-rotation des témoignages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 6);
    }, 5000);

    return () => clearInterval(interval);
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
      name: 'Jean-Baptiste Pierre',
      nationality: 'Haitian',
      content: 'Theonetwork a transformé complètement notre présence numérique. Leur expertise en développement d\'applications et automatisation de systèmes nous a fait économiser des mois de travail.',
      rating: 5,
    },
    {
      name: 'Marie-Claire François',
      nationality: 'Haitian',
      content: 'Service professionnel, fiable et innovant. L\'équipe a livré exactement ce dont nous avions besoin et a dépassé nos attentes.',
      rating: 5,
    },
    {
      name: 'Sarah Johnson',
      nationality: 'American',
      content: 'Theonetwork transformed our digital presence completely. Their expertise in app development and system automation saved us months of work.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      nationality: 'American',
      content: 'Professional, reliable, and innovative. The team delivered exactly what we needed and exceeded our expectations.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      nationality: 'Canadian',
      content: 'Outstanding service and support. They helped us streamline our operations and increase our productivity significantly.',
      rating: 5,
    },
    {
      name: 'David Thompson',
      nationality: 'Canadian',
      content: 'Exceptional quality and attention to detail. Theonetwork\'s strategic consulting helped us optimize our tech strategy and achieve remarkable results.',
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
      {/* Main Hero Banner - Technology/Digital Focused */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden" style={{ marginBottom: 0 }}>
        {/* Background Video - Full Screen */}
        <div className="absolute inset-0" onClick={handleVideoInteraction}>
          <video
            ref={videoRef}
            autoPlay
            loop
            playsInline
            muted={isVideoMuted}
            preload="auto"
            webkit-playsinline="true"
            className="absolute inset-0 w-full h-full object-cover hero-video"
            style={{ 
              objectPosition: 'center center',
              width: '100%',
              height: '100%',
              minHeight: '100vh',
              zIndex: 2
            }}
            onError={(e) => {
              console.log('Video failed to load:', e);
              setVideoError(true);
              setVideoLoaded(false);
            }}
            onLoadedData={(e) => {
              console.log('Video loaded successfully');
              setVideoLoaded(true);
              setVideoError(false);
            }}
            onCanPlay={(e) => {
              console.log('Video can play');
              setVideoLoaded(true);
              setVideoError(false);
            }}
            onLoadStart={() => {
              console.log('Video load started');
            }}
            onLoadedMetadata={() => {
              console.log('Video metadata loaded');
            }}
          >
            <source src="/hero_banner_video_theo.mp4" type="video/mp4" />
            <source src="/theonetworkvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Fallback background - only show if video fails to load */}
          {videoError && (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" style={{ zIndex: 1 }}>
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: 'url(/theonetworkbanner.jpg)',
                  backgroundPosition: 'center center'
                }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
            </div>
          )}
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-slate-800/30 to-transparent" style={{ zIndex: 3 }}></div>
          {/* Additional overlay for mobile text readability */}
          <div className="absolute inset-0 bg-black/30 sm:bg-transparent" style={{ zIndex: 3 }}></div>
          
          {/* Video controls - minimal for mobile sound activation */}
          <div className="absolute top-4 right-4" style={{ zIndex: 4 }}>
            {videoError && (
              <div className="bg-red-500/50 text-white px-3 py-2 rounded-lg text-sm mb-2">
                ⚠️ Video failed to load
              </div>
            )}
            {isMobile && (
              <div 
                className="bg-orange-600/80 text-white px-4 py-3 rounded-lg text-sm font-semibold cursor-pointer hover:bg-orange-700/80 transition-colors shadow-lg"
                onClick={handleVideoInteraction}
              >
                {isVideoMuted ? '🔊 Tap anywhere for sound' : '🔇 Sound on'}
              </div>
            )}
          </div>
        </div>

        {/* Main Content - Responsive and centered */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 hero-content">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-[90%] sm:max-w-3xl mx-auto animate-on-scroll">
              {/* Heading - responsive sizing */}
              <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold sm:font-bold text-white mb-6 sm:mb-6 md:mb-8 leading-tight animate-fade-in text-center hero-title">
                <span className="bg-gradient-to-r from-white via-orange-100 to-orange-200 bg-clip-text text-transparent">
                  Digital Innovation
                </span>
              </h1>
              
              {/* Subheading - responsive sizing with better spacing */}
              <p className="text-lg sm:text-lg md:text-xl lg:text-2xl text-orange-100 mb-8 sm:mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in animate-delay-200 text-center px-2 hero-subtitle">
                Transform your business with cutting-edge technology solutions. We build the future, today.
              </p>
              
              {/* CTA Buttons - responsive and stacked on mobile with better spacing */}
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-6 justify-center animate-fade-in animate-delay-300 hero-buttons mb-8 sm:mb-12 md:mb-16">
                <a
                  href="https://wa.me/+17745069615?text=Hi! I'd like to discuss a digital transformation project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center px-6 sm:px-8 md:px-12 py-4 sm:py-4 md:py-6 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold sm:font-bold text-base sm:text-base md:text-lg lg:text-xl rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-orange-500/25 btn-animate hero-button"
                >
                  Start Your Digital Journey
                  <ArrowRight className="ml-3 sm:ml-3 w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
                <Link
                  to="/services"
                  className="group inline-flex items-center justify-center px-6 sm:px-8 md:px-12 py-4 sm:py-4 md:py-6 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold sm:font-bold text-base sm:text-base md:text-lg lg:text-xl rounded-lg sm:rounded-xl md:rounded-2xl border border-white/20 transition-all duration-300 transform hover:scale-105 hover-lift hero-button"
                >
                  Explore Solutions
                  <ArrowRight className="ml-3 sm:ml-3 w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
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

      {/* Our Services - Interactive Cards */}
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
                className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 animate-on-scroll hover-lift cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-orange-600 mb-6 animate-scale-in group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                  {service.description}
                </p>
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-on-scroll">
            <Link
              to="/services"
              className="inline-flex items-center px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 btn-animate"
            >
              View All Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Banner Image Section with CTA */}
      <div className="relative w-full banner-section px-4 py-10" style={{ marginBottom: '4rem' }}>
        <img
          src="/theonetworkbanner.jpg"
          alt="Theonetwork Banner"
          className="w-full h-auto block"
          style={{ display: 'block', margin: 0, padding: 0, marginBottom: 0 }}
          onError={(e) => {
            console.log('Banner image failed to load:', e);
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-900/30 to-slate-900/60"></div>
        
        {/* Text Block and CTA Button - Responsive positioning */}
        <div className="absolute inset-0 flex items-center justify-end px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 banner-content">
          <div className="text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            {/* Two-line heading - responsive sizing */}
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-6 md:mb-8 leading-tight banner-title">
              <div className="bg-gradient-to-r from-white via-orange-100 to-orange-200 bg-clip-text text-transparent">
                Build Smarter with
              </div>
              <div className="bg-gradient-to-r from-white via-orange-100 to-orange-200 bg-clip-text text-transparent">
                Theonetwork
              </div>
            </h2>
            
            {/* Paragraph with responsive sizing and controlled wrapping */}
            <p className="text-xs sm:text-base md:text-lg lg:text-xl text-orange-100 mb-3 sm:mb-6 md:mb-8 leading-relaxed max-w-xs sm:max-w-sm mx-auto banner-subtitle">
              Professional digital solutions to bring your ideas to life
            </p>
            
            {/* CTA Button - centered with responsive sizing */}
            <div className="flex justify-center banner-button-container">
              <a
                href="https://wa.me/+17745069615?text=Hi! I'm interested in your services."
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center px-3 sm:px-6 md:px-8 py-1.5 sm:py-3 md:py-4 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold text-xs sm:text-base md:text-lg rounded-md sm:rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-orange-500/25 banner-button"
              >
                Get Started Today
                <ArrowRight className="ml-1.5 sm:ml-3 w-3 h-3 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Carousel */}
      <section ref={testimonialsRef} className="pt-64 pb-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-slate-600">
              Don't just take our word for it
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative overflow-hidden">
              <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-on-scroll hover-lift max-w-4xl mx-auto">
                    <div className="flex items-center justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                    <p className="text-slate-600 mb-8 leading-relaxed text-center text-lg">
                  "{testimonial.content}"
                </p>
                    <div className="text-center">
                      <div className="font-bold text-slate-900 text-xl mb-2">{testimonial.name}</div>
                      <div className="text-orange-600 font-semibold">{testimonial.nationality}</div>
                    </div>
                  </div>
                </div>
              ))}
                </div>
              </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={() => setCurrentTestimonial((prev) => prev === 0 ? 5 : prev - 1)}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-orange-50"
            >
              <ChevronLeft className="w-6 h-6 text-slate-600" />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-orange-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % 6)}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-orange-50"
            >
              <ChevronRight className="w-6 h-6 text-slate-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Animated Separator */}
      <section className="relative py-8 bg-gradient-to-r from-slate-900 via-slate-800 to-orange-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse"></div>
          </div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-4 text-white/60">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-orange-500"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-orange-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Enhanced with Animations */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute w-96 h-96 bg-orange-500 rounded-full blur-3xl" style={{ left: '-10%', top: '20%' }} />
          <div className="absolute w-64 h-64 bg-blue-500 rounded-full blur-2xl" style={{ right: '-5%', bottom: '30%' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 animate-fade-in">
              Our Process
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto animate-fade-in animate-delay-200">
              A proven methodology that delivers exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'We analyze your needs and define project requirements', icon: '🔍', color: 'from-blue-500 to-blue-600' },
              { step: '02', title: 'Planning', description: 'Create detailed roadmap and timeline for your project', icon: '📋', color: 'from-green-500 to-green-600' },
              { step: '03', title: 'Development', description: 'Build your solution using best practices and latest tech', icon: '⚡', color: 'from-orange-500 to-orange-600' },
              { step: '04', title: 'Launch', description: 'Deploy, test, and provide ongoing support and maintenance', icon: '🚀', color: 'from-purple-500 to-purple-600' },
            ].map((process, index) => (
              <div 
                key={index} 
                className="text-center animate-on-scroll group cursor-pointer" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${process.color} text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6 hover-lift transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                  {process.step}
                </div>
                <div className="text-5xl mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">{process.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4 transition-colors duration-300 group-hover:text-orange-600">{process.title}</h3>
                <p className="text-slate-600 leading-relaxed transition-colors duration-300 group-hover:text-slate-700">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced with Animations */}
      <section className="relative py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-orange-900 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse" style={{ left: '5%', top: '10%', animationDelay: '0s' }} />
            <div className="absolute w-64 h-64 bg-blue-500 rounded-full blur-2xl animate-pulse" style={{ right: '10%', top: '20%', animationDelay: '2s' }} />
            <div className="absolute w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ left: '50%', bottom: '10%', animationDelay: '4s' }} />
          </div>
          
          {/* Floating particles */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute w-2 h-2 bg-white rounded-full animate-float" style={{ left: '20%', top: '30%', animationDelay: '0s' }} />
            <div className="absolute w-3 h-3 bg-orange-400 rounded-full animate-float" style={{ right: '25%', top: '40%', animationDelay: '1s' }} />
            <div className="absolute w-2 h-2 bg-blue-400 rounded-full animate-float" style={{ left: '70%', top: '60%', animationDelay: '2s' }} />
            <div className="absolute w-4 h-4 bg-purple-400 rounded-full animate-float" style={{ right: '30%', bottom: '30%', animationDelay: '3s' }} />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-8 animate-scale-in hover-lift">
              <TrendingUp className="w-12 h-12 text-white animate-pulse" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">
              <span className="bg-gradient-to-r from-white via-orange-100 to-orange-200 bg-clip-text text-transparent">
            Ready to Transform Your Business?
              </span>
          </h2>
            
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto animate-fade-in animate-delay-200 leading-relaxed">
            Join hundreds of satisfied clients who have elevated their digital presence with our expert solutions.
              Let's build something extraordinary together.
          </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in animate-delay-400">
          <a
            href="https://wa.me/+17745069615?text=Hi! I'm ready to transform my business with Theonetwork."
            target="_blank"
            rel="noopener noreferrer"
                className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold text-lg rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-orange-500/25 btn-animate"
          >
            Start Your Project Today
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              
              <Link
                to="/contact"
                className="group inline-flex items-center px-10 py-5 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold text-lg rounded-2xl border border-white/20 transition-all duration-300 transform hover:scale-105 hover-lift"
              >
                Get In Touch
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Email Popup */}
      <EmailPopup 
        isOpen={showEmailPopup} 
        onClose={() => setShowEmailPopup(false)} 
      />
    </div>
  );
};

export default Home;