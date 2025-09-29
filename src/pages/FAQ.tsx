import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

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

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      category: "General Questions",
      questions: [
        {
          question: "What services does Theonetwork offer?",
          answer: "We specialize in app development, website creation, system automation, and strategic consulting. Our team creates custom mobile and web applications, professional websites, automated business processes, and provides expert technology guidance to help businesses grow."
        },
        {
          question: "How long does a typical project take?",
          answer: "Project timelines vary based on complexity and scope. Simple websites typically take 2-4 weeks, while complex applications can take 2-6 months. We provide detailed timelines and milestones during our initial consultation to ensure clear expectations."
        },
        {
          question: "Do you work with businesses of all sizes?",
          answer: "Yes! We work with startups, small businesses, and large enterprises. Our solutions are scalable and tailored to meet the specific needs and budget of each client, regardless of company size."
        },
        {
          question: "What makes Theonetwork different from other tech companies?",
          answer: "We combine technical expertise with personalized service, offering multilingual support and focusing on long-term partnerships. Our founder, Theshneider Avril, brings years of experience and ensures every project receives personal attention and innovative solutions."
        }
      ]
    },
    {
      category: "Technical Questions",
      questions: [
        {
          question: "What technologies do you use?",
          answer: "We use modern, industry-standard technologies including React, Next.js, Node.js, Python, React Native, and cloud platforms like AWS and Vercel. We select the best technology stack for each project based on your specific requirements and goals."
        },
        {
          question: "Do you provide ongoing support and maintenance?",
          answer: "Absolutely! We offer comprehensive support and maintenance packages to ensure your solution continues to perform optimally after launch. This includes updates, security patches, performance monitoring, and feature enhancements."
        },
        {
          question: "Can you integrate with existing systems?",
          answer: "Yes, we specialize in system integration and can connect your new solution with existing software, databases, and third-party services. We ensure seamless data flow and maintain system compatibility."
        },
        {
          question: "Do you offer mobile app development?",
          answer: "Yes, we develop both native iOS and Android applications as well as cross-platform solutions using React Native. We also create Progressive Web Apps (PWAs) that work seamlessly across all devices."
        }
      ]
    },
    {
      category: "Business & Pricing",
      questions: [
        {
          question: "How do you price your services?",
          answer: "We provide custom quotes based on project scope, complexity, and timeline. We offer transparent pricing with no hidden fees and can work within various budget ranges. Contact us for a free consultation and detailed quote."
        },
        {
          question: "Do you offer payment plans?",
          answer: "Yes, we offer flexible payment plans to accommodate different business needs. We typically structure payments in milestones throughout the project, making it easier to manage cash flow."
        },
        {
          question: "What is included in the free consultation?",
          answer: "Our free consultation includes project assessment, technology recommendations, timeline estimation, and a detailed proposal. We'll discuss your goals, challenges, and provide expert advice on the best approach for your project."
        },
        {
          question: "Do you sign NDAs and confidentiality agreements?",
          answer: "Absolutely. We understand the importance of protecting your business ideas and sensitive information. We're happy to sign NDAs and confidentiality agreements before discussing your project details."
        }
      ]
    },
    {
      category: "Process & Communication",
      questions: [
        {
          question: "What is your development process?",
          answer: "We follow a proven 4-step process: Discovery (analyzing needs and requirements), Planning (creating roadmap and timeline), Development (building with regular updates), and Launch (deployment with ongoing support). We maintain clear communication throughout."
        },
        {
          question: "How do you handle project communication?",
          answer: "We provide regular updates through your preferred communication channels (email, WhatsApp, video calls). You'll have direct access to our team and receive progress reports, demos, and can provide feedback at every stage."
        },
        {
          question: "Do you work with international clients?",
          answer: "Yes! We serve clients worldwide and offer multilingual support in English, French, and Haitian Creole. We're experienced in working across different time zones and can accommodate various business cultures and requirements."
        },
        {
          question: "Can I make changes during development?",
          answer: "Yes, we understand that requirements can evolve. We build flexibility into our process to accommodate reasonable changes. We'll discuss any impact on timeline and budget upfront to ensure transparency."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-slate-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center animate-scale-in">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about our services, process, and how we can help transform your business
            </p>
          </div>
        </div>
      </header>

      {/* FAQ Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12 animate-on-scroll" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
              <h2 className="text-2xl font-bold text-slate-900 mb-8 pb-4 border-b border-gray-200">
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 100 + itemIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <article
                      key={itemIndex}
                      className="bg-slate-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 animate-slide-in-left"
                      style={{ animationDelay: `${categoryIndex * 0.1 + itemIndex * 0.05}s` }}
                    >
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-100 transition-colors duration-200"
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${globalIndex}`}
                      >
                        <span className="text-lg font-semibold text-slate-900 pr-4">
                          {item.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-orange-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div id={`faq-answer-${globalIndex}`} className="px-6 pb-4 animate-fade-in">
                          <p className="text-slate-600 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 animate-on-scroll hover-lift">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center animate-scale-in">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our team is here to help. 
              Get in touch and we'll respond within 24 hours.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/+17745069615?text=Hi! I have a question about your services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-300 btn-animate"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Chat
              </a>
              <a
                href="mailto:hello@theonetwork.com?subject=Question about your services"
                className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-300 btn-animate"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-slate-300 mb-6">
            Book your free consultation today and let's discuss your project
          </p>
          <a
            href="https://wa.me/+17745069615?text=Hi! I'd like to book a free consultation with Theonetwork."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 btn-animate"
          >
            Book Free Consultation
          </a>
        </div>
      </section>
    </div>
  );
};

export default FAQ;