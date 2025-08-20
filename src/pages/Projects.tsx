import React, { useState } from 'react';
import { ExternalLink, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Projects = () => {
  // Load projects from localStorage
  const [projects, setProjects] = React.useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  React.useEffect(() => {
    const savedProjects = localStorage.getItem('theo-network-projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Default projects with multiple images
      const defaultProjects = [
        {
          id: '1',
          title: 'EliteShop - Premium E-Commerce Platform',
          category: 'Web Development',
          description: 'Premium e-commerce platform featuring modern design, secure payments, and seamless shopping experience. Built with advanced product discovery and customer engagement features.',
          images: [
            '/Capture d\'écran 2025-07-22 171005 copy.png',
            '/Capture d\'écran 2025-07-22 171005.png',
            'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800'
          ],
          featured: true,
        },
        {
          id: '2',
          title: 'Fylisca - Natural Hair Care Platform',
          category: 'Web Development',
          description: 'Beautiful hair care e-commerce platform promoting natural hair growth solutions with educational content and product recommendations.',
          images: [
            '/Capture d\'écran 2025-05-26 021825 copy.png',
            '/Capture d\'écran 2025-05-26 021825.png',
            'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800'
          ],
          featured: true,
        },
        {
          id: '3',
          title: 'Kayanu - Natural Skincare Brand',
          category: 'Web Development',
          description: 'Elegant skincare brand website celebrating natural beauty with clean design, product showcases, and inclusive messaging.',
          images: [
            '/Capture d\'écran 2025-06-01 012837 copy.png',
            '/Capture d\'écran 2025-06-01 012837.png',
            'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800'
          ],
          featured: true,
        },
        {
          id: '4',
          title: 'Chef Cassy - Culinary Experience Platform',
          category: 'Web Development',
          description: 'Authentic Haitian cuisine platform featuring chef profiles, recipe collections, and culinary storytelling with rich cultural elements.',
          images: [
            '/Capture d\'écran 2025-06-03 122156.png',
            'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800'
          ],
          featured: false,
        },
        {
          id: '5',
          title: 'Belvys - Fitness & Body Sculpting',
          category: 'E-Commerce',
          description: 'Premium fitness equipment and supplements platform with body transformation focus, featuring workout guides and nutrition plans.',
          images: [
            '/Capture d\'écran 2025-06-06 020142.png',
            'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=800'
          ],
          featured: false,
        },
        {
          id: '6',
          title: 'Healthcare Management System',
          category: 'Custom Software',
          description: 'HIPAA-compliant healthcare management system with patient records, scheduling, and billing.',
          images: [
            'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800'
          ],
          featured: false,
        },
      ];
      setProjects(defaultProjects);
      localStorage.setItem('theo-network-projects', JSON.stringify(defaultProjects));
    }
  }, []);

  const featuredProjects = projects.filter(project => project.featured);
  const regularProjects = projects.filter(project => !project.featured);

  const openProjectGallery = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Our Projects
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover how we've helped businesses transform their digital presence with innovative solutions
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our most impactful and innovative solutions
            </p>
          </div>

          <div className="space-y-20">
            {featuredProjects.map((project, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:direction-rtl' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="relative group cursor-pointer" onClick={() => openProjectGallery(project)}>
                    <img
                      src={project.images ? project.images[0] : project.image}
                      alt={project.title}
                      className="w-full h-96 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <span className="bg-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <span className="text-white text-sm font-medium">
                        {project.images ? project.images.length : 1} images
                      </span>
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">
                    {project.title}
                  </h3>
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex space-x-4">
                    <button 
                      onClick={() => openProjectGallery(project)}
                      className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-300"
                    >
                      View Gallery
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </button>
                    <a
                      href="https://wa.me/17745069615?text=Hi! I'd like to see a case study for this project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors duration-300"
                    >
                      Case Study
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regular Projects Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              More Projects
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Additional work showcasing our diverse expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularProjects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative cursor-pointer" onClick={() => openProjectGallery(project)}>
                  <img
                    src={project.images ? project.images[0] : project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-white text-xs font-medium">
                      {project.images ? project.images.length : 1}
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

                  <button 
                    onClick={() => openProjectGallery(project)}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors duration-300"
                  >
                    View Gallery
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            {selectedProject.images && selectedProject.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors duration-200"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors duration-200"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image */}
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src={selectedProject.images ? selectedProject.images[currentImageIndex] : selectedProject.image}
                alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              
              {/* Image Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {selectedProject.title}
                </h3>
                <p className="text-slate-600 mb-4">
                  {selectedProject.description}
                </p>
                
                {/* Image Counter */}
                {selectedProject.images && selectedProject.images.length > 1 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">
                      Image {currentImageIndex + 1} of {selectedProject.images.length}
                    </span>
                    
                    {/* Thumbnail Navigation */}
                    <div className="flex space-x-2">
                      {selectedProject.images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                            index === currentImageIndex ? 'border-orange-600' : 'border-transparent'
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Let's create something amazing together. Get in touch to discuss your vision.
          </p>
          <a
            href="https://wa.me/17745069615?text=Hi! I'm ready to start my project with Theo Network."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Start Your Project
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Projects;