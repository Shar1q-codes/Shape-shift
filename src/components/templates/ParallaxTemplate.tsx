/**
 * Parallax Template
 * 
 * This template implements parallax scrolling effects with multiple layers
 * moving at different speeds. Features fixed navigation, floating elements,
 * and scroll-based animations for a dynamic, depth-rich experience.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, Star, Quote, Calendar, MapPin } from 'lucide-react';
import { personalInfo, projects, skills } from '../../data/portfolio';

const ParallaxTemplate: React.FC = () => {
  // State for scroll tracking and navigation
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);

  /**
   * Track scroll position and update active section
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Update active section based on scroll position
      const sections = sectionsRef.current;
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section, index) => {
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Smooth scroll to section
   */
  const scrollToSection = (index: number) => {
    const section = sectionsRef.current[index];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Mock testimonials data for display
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      content: "Shariq delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise are outstanding.",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO at DataFlow",
      content: "The analytics dashboard Shariq built transformed how we visualize our data. His full-stack skills and data science background made all the difference.",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Startup Founder",
      content: "Working with Shariq was a game-changer for our startup. He delivered a robust task management system that our team loves using every day.",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    }
  ];

  // Group skills by category for organized display
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed Navigation Dots */}
      <nav className="fixed top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 z-50">
        <div className="bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20">
          {['Landing', 'Work', 'Experience', 'Testimonials'].map((section, index) => (
            <button
              key={section}
              onClick={() => scrollToSection(index)}
              className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                activeSection === index
                  ? 'bg-blue-500 scale-150'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to ${section} section`}
            />
          ))}
        </div>
      </nav>

      {/* Parallax Background Layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Layer 1 - Slowest */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
        </div>

        {/* Layer 2 - Medium */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <div className="absolute top-40 right-40 w-64 h-64 bg-gradient-to-r from-green-400/30 to-blue-400/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-40 left-40 w-72 h-72 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-2xl"></div>
        </div>

        {/* Layer 3 - Fastest */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="absolute top-60 left-1/2 w-48 h-48 bg-gradient-to-r from-yellow-400/40 to-red-400/40 rounded-full blur-xl"></div>
          <div className="absolute bottom-60 right-1/2 w-56 h-56 bg-gradient-to-r from-indigo-400/40 to-purple-400/40 rounded-full blur-xl"></div>
        </div>
      </div>

      {/* Section 1: Landing */}
      <section
        ref={(el) => el && (sectionsRef.current[0] = el)}
        className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 sm:px-6"
      >
        <div className="text-center text-white z-10 px-6">
          <div
            className="mb-8"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {personalInfo.name}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-2 sm:mb-4">{personalInfo.title}</p>
            <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-8">{personalInfo.education}</p>
          </div>

          <div
            className="flex flex-col sm:flex-row justify-center sm:space-x-4 md:space-x-6 space-y-3 sm:space-y-0 mb-8 sm:mb-12"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            <a
              href={`mailto:${personalInfo.email}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>Get In Touch</span>
            </a>
            <a
              href={`https://${personalInfo.linkedin}`}
              className="border border-white/30 hover:bg-white/10 text-white px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Linkedin className="w-5 h-5" />
              <span>Connect</span>
            </a>
          </div>

          <div className="animate-bounce">
            <button
              onClick={() => scrollToSection(1)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <ChevronDown className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Floating Elements */}
        <div
          className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full opacity-60"
          style={{
            transform: `translate(${Math.sin(scrollY * 0.01) * 20}px, ${Math.cos(scrollY * 0.01) * 20}px)`,
          }}
        ></div>
        <div
          className="absolute bottom-20 right-20 w-6 h-6 bg-purple-400 rounded-full opacity-40"
          style={{
            transform: `translate(${Math.cos(scrollY * 0.008) * 30}px, ${Math.sin(scrollY * 0.008) * 30}px)`,
          }}
        ></div>
      </section>

      {/* Section 2: Work */}
      <section
        ref={(el) => el && (sectionsRef.current[1] = el)}
        className="min-h-screen py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 relative z-10"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div
            className="text-center mb-16"
            style={{
              transform: `translateY(${Math.max(0, (scrollY - window.innerHeight) * 0.2)}px)`,
              opacity: Math.min(1, Math.max(0.3, 1 - (scrollY - window.innerHeight * 1.5) / (window.innerHeight * 0.8)))
            }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6">Featured Work</h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Showcasing innovative solutions that push the boundaries of technology
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative"
                style={{
                  transform: `translateY(${Math.max(0, (scrollY - window.innerHeight * 0.8) * (0.15 + index * 0.05))}px)`,
                  opacity: Math.min(1, Math.max(0.2, 1 - (scrollY - window.innerHeight * 2) / (window.innerHeight * 0.8)))
                }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <div className="flex space-x-2">
                        {project.link && (
                          <a
                            href={project.link}
                            className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 text-white" />
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
                          >
                            <Github className="w-4 h-4 text-white" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 md:p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                      <span className="hidden sm:inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium capitalize">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-xs sm:text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Experience & Skills */}
      <section
        ref={(el) => el && (sectionsRef.current[2] = el)}
        className="min-h-screen py-12 sm:py-16 md:py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative z-10"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div
            className="text-center mb-16"
            style={{
              transform: `translateY(${Math.max(0, (scrollY - window.innerHeight * 2) * 0.2)}px)`,
              opacity: Math.min(1, Math.max(0.3, 1 - (scrollY - window.innerHeight * 2.8) / (window.innerHeight * 0.8)))
            }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6">Experience & Skills</h2>
            <p className="text-lg sm:text-xl text-purple-200 max-w-2xl mx-auto">
              A comprehensive toolkit built through years of hands-on development
            </p>
          </div>

          {/* About Bio */}
          <div
            className="mb-16"
            style={{
              transform: `translateY(${Math.max(0, (scrollY - window.innerHeight * 2.1) * 0.15)}px)`,
              opacity: Math.min(1, Math.max(0.2, 1 - (scrollY - window.innerHeight * 3.2) / (window.innerHeight * 0.8)))
            }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 text-center">
              <p className="text-base sm:text-lg text-purple-100 leading-relaxed max-w-3xl mx-auto">
                {personalInfo.bio}
              </p>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {Object.entries(groupedSkills).map(([category, categorySkills], index) => (
              <div
                key={category}
                className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
                style={{
                  transform: `translateY(${Math.max(0, (scrollY - window.innerHeight * 2.2) * (0.1 + index * 0.03))}px)`,
                  opacity: Math.min(1, Math.max(0.2, 1 - (scrollY - window.innerHeight * 3.5) / (window.innerHeight * 0.8)))
                }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 md:mb-6 capitalize text-center">
                  {category.replace('-', ' ')}
                </h3>
                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-purple-100 font-medium">{skill.name}</span>
                        <span className="text-purple-300 text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-500 group-hover:from-purple-400 group-hover:to-pink-400"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Testimonials */}
      <section
        ref={(el) => el && (sectionsRef.current[3] = el)}
        className="min-h-screen py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 relative z-10"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div
            className="text-center mb-16"
            style={{
              transform: `translateY(${Math.max(0, (scrollY - window.innerHeight * 3) * 0.2)}px)`,
              opacity: Math.min(1, Math.max(0.3, 1 - (scrollY - window.innerHeight * 4) / (window.innerHeight * 0.8)))
            }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6">What Clients Say</h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Testimonials from satisfied clients and collaborators
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
                style={{
                  transform: `translateY(${Math.max(0, (scrollY - window.innerHeight * 3.1) * (0.1 + index * 0.03))}px)`,
                  opacity: Math.min(1, Math.max(0.2, 1 - (scrollY - window.innerHeight * 4.2) / (window.innerHeight * 0.8)))
                }}
              >
                <div className="flex items-center mb-4 sm:mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mb-2 sm:mb-4" />
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic text-sm sm:text-base">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div
            className="text-center"
            style={{
              transform: `translateY(${Math.max(0, (scrollY - window.innerHeight * 3.5) * 0.15)}px)`,
              opacity: Math.min(1, Math.max(0.2, 1 - (scrollY - window.innerHeight * 4.5) / (window.innerHeight * 0.8)))
            }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl max-w-2xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6">
                Ready to Start Your Project?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base">
                Let's discuss how we can bring your vision to life with cutting-edge technology and exceptional design.
              </p>
              <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-3 sm:space-y-0">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>Start Conversation</span>
                </a>
                <a
                  href={`https://${personalInfo.github}`}
                  className="border border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Github className="w-5 h-5" />
                  <span>View Work</span>
                </a>
              </div>
              <div className="flex items-center justify-center mt-4 sm:mt-6 text-gray-500 dark:text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParallaxTemplate;