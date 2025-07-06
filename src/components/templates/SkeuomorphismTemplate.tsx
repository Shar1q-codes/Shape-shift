/**
 * Skeuomorphism Template
 * 
 * This template implements a skeuomorphic design that mimics real-world objects
 * with textures, shadows, and 3D effects. Features wood grain, leather, metal,
 * and paper textures with realistic lighting and depth.
 */

import React, { useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Award, Users, Clock, Star, Code, Database, Server, Terminal, Book, Briefcase } from 'lucide-react';
import { personalInfo, projects, skills } from '../../data/portfolio';

const SkeuomorphismTemplate: React.FC = () => {
  // State for project display
  const [activeProject, setActiveProject] = useState(0);

  // Group skills by category for organized display
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  /**
   * Get appropriate icon for skill category
   */
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend': return <Code className="w-6 h-6" />;
      case 'backend': return <Server className="w-6 h-6" />;
      case 'database': return <Database className="w-6 h-6" />;
      case 'tools': return <Terminal className="w-6 h-6" />;
      case 'data-science': return <Book className="w-6 h-6" />;
      default: return <Code className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-800">
      {/* Leather-textured Header */}
      <header className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 shadow-xl-pressed">
        {/* Leather texture overlay */}
        <div className="absolute inset-0 opacity-30 hidden sm:block" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0,0,0,0.1) 1px, transparent 1px),
                           radial-gradient(circle at 80% 50%, rgba(0,0,0,0.1) 1px, transparent 1px),
                           radial-gradient(circle at 40% 20%, rgba(0,0,0,0.05) 1px, transparent 1px)`,
          backgroundSize: '30px 30px, 25px 25px, 40px 40px'
        }}></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-5 md:px-6 py-10 sm:py-16 md:py-20">
          <div className="text-center">
            {/* Embossed Profile Picture Frame */}
            <div className="mb-8 relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto relative">
                {/* Wooden frame */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-700 via-amber-600 to-amber-800 rounded-full shadow-xl p-4">
                  <div className="w-full h-full bg-gradient-to-br from-amber-100 via-amber-50 to-amber-200 rounded-full shadow-inner-lg border-4 border-amber-800 flex items-center justify-center">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-800 drop-shadow-lg">
                      {personalInfo.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                
                {/* Brass corner decorations */}
                <div className="absolute -top-2 -left-2 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-md border border-yellow-700"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-md border border-yellow-700"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-md border border-yellow-700"></div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-md border border-yellow-700"></div>
              </div>
            </div>

            {/* Embossed Text */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-amber-100 drop-shadow-lg" style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.5), inset 1px 1px 2px rgba(255,255,255,0.3)'
              }}>
                {personalInfo.name}
              </h1>
              
              {/* Brass nameplate */}
              <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 p-2 sm:p-3 md:p-4 rounded-lg shadow-xl border-2 border-yellow-700 mb-2 sm:mb-3 md:mb-4 inline-block">
                <p className="text-base sm:text-lg md:text-xl font-bold text-yellow-900 uppercase tracking-wider drop-shadow-sm">{personalInfo.title}</p>
              </div>
              
              {/* Engraved education */}
              <div className="bg-gradient-to-br from-amber-200 to-amber-300 p-2 sm:p-2.5 md:p-3 rounded-md shadow-inner-md border border-amber-400 inline-block">
                <p className="text-amber-800 font-semibold text-sm sm:text-base md:text-lg">{personalInfo.education}</p>
              </div>
            </div>

            {/* Wooden Button Set */}
            <div className="flex justify-center flex-wrap gap-4">
              <a 
                href={`mailto:${personalInfo.email}`}
                className="group bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl shadow-xl border-2 border-blue-700 hover:shadow-md-pressed transition-all duration-200 transform hover:translate-y-1 mb-2 sm:mb-0"
              >
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 drop-shadow-sm" />
                  <span className="font-bold uppercase tracking-wider drop-shadow-sm text-sm sm:text-base md:text-lg">Contact</span>
                </div>
              </a>
              
              <a 
                href={`https://${personalInfo.linkedin}`}
                className="group bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl shadow-xl border-2 border-indigo-700 hover:shadow-md-pressed transition-all duration-200 transform hover:translate-y-1 mb-2 sm:mb-0"
              >
                <div className="flex items-center space-x-2">
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 drop-shadow-sm" />
                  <span className="font-bold uppercase tracking-wider drop-shadow-sm text-sm sm:text-base md:text-lg">LinkedIn</span>
                </div>
              </a>
              
              <a 
                href={`https://${personalInfo.github}`}
                className="group bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl shadow-xl border-2 border-gray-900 hover:shadow-md-pressed transition-all duration-200 transform hover:translate-y-1"
              >
                <div className="flex items-center space-x-2">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 drop-shadow-sm" />
                  <span className="font-bold uppercase tracking-wider drop-shadow-sm text-sm sm:text-base md:text-lg">GitHub</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* About Section - Paper Texture */}
      <section className="py-20 relative">
        {/* Paper background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-amber-25 to-amber-100 hidden sm:block" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(139, 69, 19, 0.1) 25px),
                           repeating-linear-gradient(90deg, transparent, transparent 24px, rgba(139, 69, 19, 0.05) 25px)`
        }}></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Embossed heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-amber-800 drop-shadow-lg">
                About Me
              </h2>
              
              {/* Parchment-style bio - Responsive */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-lg shadow-inner-lg border-2 border-amber-200 relative">
                {/* Aged paper effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-100/50 to-amber-200/30 rounded-lg"></div>
                <div className="relative z-10">
                  <p className="text-lg leading-relaxed text-amber-900 font-medium">
                    {personalInfo.bio}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Wooden plaques for stats */}
              <div className="bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 p-4 sm:p-5 md:p-6 rounded-lg shadow-xl border-2 border-amber-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%),
                                   linear-gradient(-45deg, rgba(0,0,0,0.1) 25%, transparent 25%)`
                }}></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 drop-shadow-lg">4+</div>
                    <div className="text-amber-200 font-semibold text-sm sm:text-base md:text-lg">Years Experience</div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-2 sm:p-2.5 md:p-3 rounded-full shadow-lg border border-yellow-700">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-900" />
                  </div>
                </div> 
              </div>
              
              <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-6 rounded-lg shadow-xl border-2 border-blue-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%),
                                   linear-gradient(-45deg, rgba(0,0,0,0.1) 25%, transparent 25%)`
                }}></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-100 drop-shadow-lg">50+</div>
                    <div className="text-blue-200 font-semibold text-sm sm:text-base md:text-lg">Projects Completed</div>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 p-3 rounded-full shadow-lg border border-cyan-700">
                    <Users className="w-8 h-8 text-cyan-900" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 p-6 rounded-lg shadow-xl border-2 border-green-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%),
                                   linear-gradient(-45deg, rgba(0,0,0,0.1) 25%, transparent 25%)`
                }}></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-100 drop-shadow-lg">24/7</div>
                    <div className="text-green-200 font-semibold text-sm sm:text-base md:text-lg">Support Available</div>
                  </div>
                  <div className="bg-gradient-to-br from-lime-400 to-lime-600 p-3 rounded-full shadow-lg border border-lime-700">
                    <Clock className="w-8 h-8 text-lime-900" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Cork Board Style */}
      <section className="py-20 bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300 relative">
        {/* Cork texture */}
        <div className="absolute inset-0 opacity-40 hidden sm:block" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 69, 19, 0.3) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, rgba(160, 82, 45, 0.2) 1px, transparent 1px),
                           radial-gradient(circle at 50% 50%, rgba(139, 69, 19, 0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px, 15px 15px, 25px 25px'
        }}></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-amber-900 drop-shadow-lg">
              Featured Projects
            </h2>
            <p className="text-xl text-amber-800 max-w-2xl mx-auto font-medium">
              Showcasing innovative solutions with attention to detail and craftsmanship
            </p>
          </div>
          
          {/* Pinned project cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 md:gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative transform hover:scale-105 transition-all duration-300"
                style={{ 
                  transform: `rotate(${index % 2 === 0 ? '-2deg' : '2deg'})`,
                  transformOrigin: 'top center'
                }}
              >
                {/* Push pin */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg border-2 border-red-700 relative">
                    <div className="absolute inset-1 bg-gradient-to-br from-red-200 to-red-300 rounded-full"></div>
                  </div>
                </div>
                
                {/* Polaroid-style card */}
                <div className="bg-white p-4 pb-8 rounded-lg shadow-xl border border-gray-200 group-hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-video overflow-hidden rounded-md mb-4 shadow-inner-md">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Handwritten-style title */}
                  <h3 className="text-2xl font-bold mb-3 text-gray-800" style={{
                    fontFamily: 'cursive, sans-serif',
                    transform: 'rotate(-1deg)'
                  }}>
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-gradient-to-br from-blue-400 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md capitalize">
                      {project.category} 
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="bg-gradient-to-br from-amber-200 to-amber-300 text-amber-800 px-3 py-1 rounded-md text-sm font-medium shadow-inner-sm border border-amber-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    {project.link && (
                      <a 
                        href={project.link} 
                        className="bg-gradient-to-br from-green-400 to-green-600 text-white px-3 sm:px-3.5 md:px-4 py-1.5 sm:py-1.75 md:py-2 rounded-lg shadow-lg border border-green-700 hover:shadow-md-pressed transition-all duration-200 transform hover:translate-y-1 flex items-center space-x-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="font-semibold">View</span>
                      </a>
                    )}
                    {project.github && (
                      <a 
                        href={project.github} 
                        className="bg-gradient-to-br from-gray-600 to-gray-800 text-white px-3 sm:px-3.5 md:px-4 py-1.5 sm:py-1.75 md:py-2 rounded-lg shadow-lg border border-gray-900 hover:shadow-md-pressed transition-all duration-200 transform hover:translate-y-1 flex items-center space-x-2"
                      >
                        <Github className="w-4 h-4" />
                        <span className="font-semibold">Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section - Toolbox Style */}
      <section className="py-20 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 relative">
        {/* Metal texture */}
        <div className="absolute inset-0 opacity-20 hidden sm:block" style={{
          backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                           linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%)`,
          backgroundSize: '4px 4px'
        }}></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-gray-100 drop-shadow-lg">
              Skills & Expertise
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A comprehensive toolkit for building modern applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div 
                key={category} 
                className="bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-xl border-2 border-amber-900 relative overflow-hidden"
              >
                {/* Wood grain texture */}
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: `repeating-linear-gradient(90deg, 
                    rgba(139, 69, 19, 0.3) 0px, 
                    rgba(160, 82, 45, 0.2) 2px, 
                    rgba(139, 69, 19, 0.3) 4px)`
                }}></div>
                
                <div className="relative z-10">
                  {/* Brass nameplate */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-2 sm:p-3 md:p-4 rounded-lg shadow-lg border-2 border-yellow-700">
                      <div className="text-yellow-900">
                        {getCategoryIcon(category)}
                      </div>
                    </div>
                  </div>
                   
                  <h3 className="text-2xl font-bold text-amber-100 mb-6 capitalize text-center drop-shadow-lg">
                    {category.replace('-', ' ')}
                  </h3>
                  
                  <div className="space-y-4">
                    {categorySkills.map((skill) => (
                      <div key={skill.name} className="group">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-amber-200 font-semibold">{skill.name}</span>
                          <span className="text-amber-100 text-sm font-bold">{skill.level}%</span>
                        </div>
                        
                        {/* Gauge-style progress bar - Responsive */}
                        <div className="w-full bg-gradient-to-r from-amber-900 to-amber-800 rounded-full h-3 shadow-inner-md border border-amber-900 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 h-full rounded-full shadow-lg transition-all duration-500 relative"
                            style={{ width: `${skill.level}%` }}
                          >
                            {/* Metallic shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Vintage Desk Style */}
      <section className="py-20 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 relative">
        {/* Leather desk texture */}
        <div className="absolute inset-0 opacity-40 hidden sm:block" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(0,0,0,0.2) 1px, transparent 1px),
                           radial-gradient(circle at 70% 60%, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px, 35px 35px'
        }}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-amber-100 drop-shadow-lg">
            Let's Work Together
          </h2>
          
          {/* Vintage letter/envelope style */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-12 rounded-lg shadow-xl border-4 border-amber-200 relative">
            {/* Wax seal */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full shadow-lg border-2 border-red-900 flex items-center justify-center">
                <Star className="w-6 h-6 text-red-200" />
              </div>
            </div>
            
            <div className="relative z-10">
              <p className="text-2xl font-bold mb-8 leading-tight text-amber-900">
                Ready to bring your vision to life?<br />
                <span className="text-amber-700">Let's create something extraordinary together.</span>
              </p>
              
              <a 
                href={`mailto:${personalInfo.email}`}
                className="inline-block bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 rounded-lg sm:rounded-xl shadow-xl border-2 border-blue-800 hover:shadow-md-pressed transition-all duration-200 transform hover:translate-y-1"
              >
                <div className="flex items-center space-x-4">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 drop-shadow-sm" />
                  <span className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider drop-shadow-sm">Send Message</span>
                  <Briefcase className="w-8 h-8 drop-shadow-sm" />
                </div>
              </a>
            </div>
          </div>
          
          {/* Brass location plaque */}
          <div className="mt-4 sm:mt-6 md:mt-8 bg-gradient-to-br from-yellow-400 to-yellow-600 p-3 sm:p-4 md:p-6 rounded-lg shadow-lg border-2 border-yellow-700 inline-block">
            <p className="font-bold tracking-wider text-yellow-900">
              📍 {personalInfo.location}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkeuomorphismTemplate;