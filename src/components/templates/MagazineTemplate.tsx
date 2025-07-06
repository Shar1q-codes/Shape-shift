/**
 * Magazine Template
 * 
 * This template implements a magazine-style layout with editorial design principles,
 * grid layouts, and typographic hierarchy. Features article-like sections,
 * featured content blocks, and sidebar elements for a publication feel.
 */

import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Calendar, Clock, User, Tag, ArrowRight, Bookmark, Share, Eye } from 'lucide-react';
import { personalInfo, projects, skills } from '../../data/portfolio';

const MagazineTemplate: React.FC = () => {
  // State for dynamic content
  const [currentDate, setCurrentDate] = useState('');
  const [featuredProject, setFeaturedProject] = useState(0);

  /**
   * Set current date in magazine-style format
   */
  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  }, []);

  /**
   * Auto-rotate featured project
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedProject((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Group skills by category for organized display
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  // Mock articles for magazine feel
  const articles = [
    {
      title: "The Future of Web Development",
      excerpt: "Exploring emerging technologies and their impact on modern web applications.",
      readTime: "5 min read",
      category: "Technology"
    },
    {
      title: "Design Systems at Scale",
      excerpt: "Building consistent user experiences across large organizations.",
      readTime: "8 min read",
      category: "Design"
    },
    {
      title: "Data Science in Practice",
      excerpt: "Real-world applications of machine learning and analytics.",
      readTime: "12 min read",
      category: "Data"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Magazine Header with masthead */}
      <header className="border-b-4 border-gray-900 dark:border-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            {/* Magazine Title */}
            <div className="flex items-center space-x-4">
              <div className="text-4xl font-black tracking-tighter">
                DEV WEEKLY
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-300 dark:bg-gray-700"></div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {currentDate}
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="flex items-center space-x-8 text-sm font-medium">
              <a href="#featured" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">FEATURED</a>
              <a href="#portfolio" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">PORTFOLIO</a>
              <a href="#skills" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">EXPERTISE</a>
              <a href="#contact" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">CONTACT</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Magazine Cover Style */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-12 gap-8">
            {/* Main Feature */}
            <div className="col-span-12 lg:col-span-8">
              <div className="relative h-96 lg:h-[500px] bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end text-white">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">COVER STORY</span>
                      <span className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>Featured Developer</span>
                      </span>
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-black leading-tight">
                      {personalInfo.name}
                    </h1>
                    <p className="text-xl lg:text-2xl font-light opacity-90">
                      {personalInfo.title}
                    </p>
                    <p className="text-lg opacity-80 max-w-2xl">
                      {personalInfo.bio}
                    </p>
                  </div>
                </div>
                
                {/* Magazine-style corner fold */}
                <div className="absolute top-0 right-0 w-16 h-16">
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-16 border-b-16 border-l-transparent border-b-white border-opacity-20"></div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* Quick Info */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Bookmark className="w-5 h-5 mr-2" />
                  Quick Facts
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Education:</span>
                    <span className="font-medium">{personalInfo.education}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Experience:</span>
                    <span className="font-medium">4+ Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Projects:</span>
                    <span className="font-medium">50+ Completed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Location:</span>
                    <span className="font-medium">{personalInfo.location}</span>
                  </div>
                </div>
              </div>
              
              {/* Contact Card */}
              <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4">Get In Touch</h3>
                <div className="space-y-3">
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">Send Email</span>
                  </a>
                  <a 
                    href={`https://${personalInfo.linkedin}`}
                    className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="text-sm">Connect on LinkedIn</span>
                  </a>
                  <a 
                    href={`https://${personalInfo.github}`}
                    className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                  >
                    <Github className="w-5 h-5" />
                    <span className="text-sm">View GitHub</span>
                  </a>
                </div>
              </div>
              
              {/* Latest Articles */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4">Latest Articles</h3>
                <div className="space-y-4">
                  {articles.map((article, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0">
                      <h4 className="font-semibold text-sm mb-1">{article.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-500">{article.readTime}</span>
                        <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs">{article.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project Section */}
      <section id="featured" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-black">FEATURED PROJECT</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Updated daily</span>
            </div>
          </div>
          
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8">
              <div className="relative group">
                <div className="aspect-video overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
                  <img
                    src={projects[featuredProject].image}
                    alt={projects[featuredProject].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Project overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex space-x-4">
                      {projects[featuredProject].link && (
                        <a 
                          href={projects[featuredProject].link}
                          className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="text-sm font-medium">View Live</span>
                        </a>
                      )}
                      {projects[featuredProject].github && (
                        <a 
                          href={projects[featuredProject].github}
                          className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200"
                        >
                          <Github className="w-4 h-4" />
                          <span className="text-sm font-medium">Source</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-span-12 lg:col-span-4">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <Tag className="w-4 h-4" />
                    <span className="capitalize">{projects[featuredProject].category}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{projects[featuredProject].title}</h3>
                  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    {projects[featuredProject].description}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold mb-3">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {projects[featuredProject].tech.map((tech) => (
                      <span 
                        key={tech}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Project navigation */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Project {featuredProject + 1} of {projects.length}
                  </span>
                  <div className="flex space-x-2">
                    {projects.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setFeaturedProject(index)}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                          featuredProject === index 
                            ? 'bg-gray-900 dark:bg-white' 
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-12">PORTFOLIO</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <article key={project.id} className="group">
                <div className="aspect-video overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700 mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                      {project.category}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      Project #{index + 1}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex space-x-2">
                      {project.link && (
                        <a 
                          href={project.link}
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.github && (
                        <a 
                          href={project.github}
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-500">
                      <span>{project.tech.length} technologies</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section - Magazine Layout */}
      <section id="skills" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-12">EXPERTISE</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Skills Article */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6">Technical Proficiency</h3>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8">
                  A comprehensive skill set spanning full-stack development, data science, and modern web technologies. 
                  Each skill has been honed through real-world projects and continuous learning.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                    <div key={category} className="space-y-4">
                      <h4 className="font-bold text-lg capitalize border-b border-gray-200 dark:border-gray-700 pb-2">
                        {category.replace('-', ' ')}
                      </h4>
                      <div className="space-y-3">
                        {categorySkills.map((skill) => (
                          <div key={skill.name} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{skill.name}</span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full overflow-hidden">
                              <div
                                className="bg-gray-900 dark:bg-white h-full rounded-full transition-all duration-500"
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
            </div>
            
            {/* Skills Sidebar */}
            <div className="space-y-6">
              {/* Skill Highlights */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg">
                <h4 className="font-bold mb-4">Skill Highlights</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Frontend Development</span>
                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">Expert</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Backend Development</span>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">Advanced</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Science</span>
                    <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">Advanced</span>
                  </div>
                </div>
              </div>
              
              {/* Learning Path */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg">
                <h4 className="font-bold mb-4">Currently Learning</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Advanced React Patterns</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Cloud Architecture</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Machine Learning</span>
                  </div>
                </div>
              </div>
              
              {/* Certifications */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg">
                <h4 className="font-bold mb-4">Certifications</h4>
                <div className="space-y-2 text-sm">
                  <div>AWS Certified Developer</div>
                  <div>Google Analytics Certified</div>
                  <div>MongoDB Certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6">LET'S COLLABORATE</h2>
              <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-8">
                Ready to bring your next project to life? Let's discuss how we can work together 
                to create something extraordinary.
              </p>
              
              <div className="space-y-4">
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                >
                  <Mail className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <div>
                    <div className="font-semibold">Send an Email</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Direct communication</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 ml-auto" />
                </a>
                
                <a 
                  href={`https://${personalInfo.linkedin}`}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                >
                  <Linkedin className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <div>
                    <div className="font-semibold">Connect on LinkedIn</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Professional networking</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 ml-auto" />
                </a>
                
                <a 
                  href={`https://${personalInfo.github}`}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                >
                  <Github className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <div>
                    <div className="font-semibold">View GitHub</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Code repositories</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 ml-auto" />
                </a>
              </div>
            </div>
            
            {/* Contact Info Card */}
            <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Location</h4>
                  <p className="opacity-90">{personalInfo.location}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Availability</h4>
                  <p className="opacity-90">Open to new opportunities</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Response Time</h4>
                  <p className="opacity-90">Usually within 24 hours</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Preferred Contact</h4>
                  <p className="opacity-90">Email for initial discussions</p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white border-opacity-20 dark:border-gray-900 dark:border-opacity-20">
                <div className="flex items-center space-x-2 text-sm opacity-75">
                  <Calendar className="w-4 h-4" />
                  <span>Last updated: {currentDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Magazine Footer */}
      <footer className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-3xl font-black mb-4">DEV WEEKLY</div>
              <p className="opacity-75 mb-4">
                A digital magazine showcasing the work and expertise of {personalInfo.name}.
              </p>
              <div className="flex items-center space-x-4 text-sm opacity-75">
                <span>© 2024 All rights reserved</span>
                <span>•</span>
                <span>Portfolio Magazine</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Sections</h4>
              <div className="space-y-2 text-sm opacity-75">
                <div>Featured Projects</div>
                <div>Portfolio Gallery</div>
                <div>Technical Skills</div>
                <div>Contact Information</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <div className="space-y-2 text-sm opacity-75">
                <div>Email Newsletter</div>
                <div>Social Media</div>
                <div>Professional Network</div>
                <div>Code Repository</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MagazineTemplate;