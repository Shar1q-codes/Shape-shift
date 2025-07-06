/**
 * Time Machine Mode Template
 * 
 * This template implements a time-travel concept that shows portfolio content
 * across different time periods. Features timeline controls, particle effects,
 * and era-specific content that changes as the user travels through time.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Clock, Calendar, History, FastForward, Rewind, Play, Pause, RotateCcw, Timer, Hourglass } from 'lucide-react';
import { personalInfo, projects, skills } from '../../data/portfolio';

// Interface for different time eras
interface TimeEra {
  id: string;
  name: string;
  year: number;
  color: string;
  description: string;
  technologies: string[];
  projects: typeof projects;
  skills: typeof skills;
}

const TimeMachineModeTemplate: React.FC = () => {
  // State for time travel functionality
  const [currentEra, setCurrentEra] = useState(0);
  const [isTimeTravel, setIsTimeTravel] = useState(false);
  const [timeSpeed, setTimeSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timelinePosition, setTimelinePosition] = useState(0);
  const [particleField, setParticleField] = useState<Array<{ id: number; x: number; y: number; speed: number; size: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Define different time eras
  const timeEras: TimeEra[] = [
    {
      id: 'past',
      name: 'The Beginning',
      year: 2020,
      color: 'from-amber-600 to-orange-700',
      description: 'Where it all started - learning the fundamentals',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Basic Python'],
      projects: projects.slice(0, 1),
      skills: skills.filter(skill => ['HTML', 'CSS', 'JavaScript', 'Python'].includes(skill.name))
    },
    {
      id: 'learning',
      name: 'The Learning Phase',
      year: 2021,
      color: 'from-blue-600 to-indigo-700',
      description: 'Diving deep into frameworks and libraries',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      projects: projects.slice(0, 2),
      skills: skills.filter(skill => skill.level >= 60)
    },
    {
      id: 'growth',
      name: 'The Growth Era',
      year: 2022,
      color: 'from-green-600 to-emerald-700',
      description: 'Building complex applications and mastering tools',
      technologies: ['TypeScript', 'Next.js', 'PostgreSQL', 'Docker'],
      projects: projects.slice(0, 3),
      skills: skills.filter(skill => skill.level >= 70)
    },
    {
      id: 'mastery',
      name: 'The Mastery Period',
      year: 2023,
      color: 'from-purple-600 to-violet-700',
      description: 'Advanced concepts and full-stack expertise',
      technologies: ['Advanced React', 'Microservices', 'Cloud', 'AI/ML'],
      projects: projects,
      skills: skills.filter(skill => skill.level >= 80)
    },
    {
      id: 'present',
      name: 'The Present',
      year: 2024,
      color: 'from-red-600 to-pink-700',
      description: 'Current state - ready for new challenges',
      technologies: ['All Technologies', 'AI Integration', 'Modern Frameworks'],
      projects: projects,
      skills: skills
    },
    {
      id: 'future',
      name: 'The Future',
      year: 2025,
      color: 'from-cyan-600 to-teal-700',
      description: 'What lies ahead - endless possibilities',
      technologies: ['Quantum Computing', 'Advanced AI', 'Neural Interfaces'],
      projects: [
        ...projects,
        {
          id: 'future-1',
          title: 'Neural Interface Dashboard',
          description: 'Brain-computer interface for seamless human-AI collaboration',
          tech: ['NeuroJS', 'Quantum React', 'AI Mesh'],
          image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
          category: 'future' as any
        }
      ],
      skills: [
        ...skills,
        { name: 'Quantum Computing', category: 'data-science' as any, level: 95 },
        { name: 'Neural Interfaces', category: 'frontend' as any, level: 90 }
      ]
    }
  ];

  /**
   * Initialize particle field for time travel effect
   */
  useEffect(() => {
    const particles = Array(50).fill(0).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.1 + Math.random() * 0.5,
      size: 1 + Math.random() * 3
    }));
    setParticleField(particles);
  }, []);

  /**
   * Animate particles during time travel
   */
  useEffect(() => {
    if (!isTimeTravel) return;

    const interval = setInterval(() => {
      setParticleField(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speed * timeSpeed) % 100,
        y: (particle.y + particle.speed * timeSpeed * 0.5) % 100
      })));
    }, 50);

    return () => clearInterval(interval);
  }, [isTimeTravel, timeSpeed]);

  /**
   * Auto-play timeline
   */
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTimelinePosition(prev => {
        const newPos = prev + timeSpeed;
        if (newPos >= 100) {
          setIsPlaying(false);
          return 100;
        }
        
        // Update era based on timeline position
        const eraIndex = Math.floor((newPos / 100) * timeEras.length);
        if (eraIndex !== currentEra && eraIndex < timeEras.length) {
          setCurrentEra(eraIndex);
          triggerTimeTravel();
        }
        
        return newPos;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, timeSpeed, currentEra]);

  /**
   * Trigger time travel animation
   */
  const triggerTimeTravel = () => {
    setIsTimeTravel(true);
    setTimeout(() => setIsTimeTravel(false), 1000);
  };

  /**
   * Travel to specific era
   */
  const travelToEra = (eraIndex: number) => {
    if (eraIndex === currentEra) return;
    
    setCurrentEra(eraIndex);
    setTimelinePosition((eraIndex / (timeEras.length - 1)) * 100);
    triggerTimeTravel();
  };

  /**
   * Toggle timeline playback
   */
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  /**
   * Reset timeline to beginning
   */
  const resetTimeline = () => {
    setCurrentEra(0);
    setTimelinePosition(0);
    setIsPlaying(false);
    triggerTimeTravel();
  };

  // Get current era data
  const currentEraData = timeEras[currentEra];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950 dark:via-orange-950 dark:to-red-950 text-gray-900 dark:text-white relative overflow-hidden"
    >
      {/* Time Travel Particle Field */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particleField.map(particle => (
          <div
            key={particle.id}
            className={`absolute rounded-full transition-all duration-100 ${
              isTimeTravel 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse' 
                : 'bg-gray-400 dark:bg-gray-600'
            }`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: isTimeTravel ? 0.8 : 0.3,
              transform: isTimeTravel ? `scale(${1 + timeSpeed})` : 'scale(1)'
            }}
          />
        ))}
      </div>

      {/* Time Travel Effect Overlay */}
      {isTimeTravel && (
        <div className="fixed inset-0 pointer-events-none z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-orange-500/30 to-red-500/20 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/10 to-transparent animate-ping"></div>
        </div>
      )}

      {/* Time Machine Control Panel */}
      <div className="fixed top-2 sm:top-4 md:top-6 left-2 sm:left-4 md:left-6 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-2xl border border-gray-200 dark:border-gray-700 w-[calc(100%-1rem)] sm:w-auto sm:min-w-[20rem]">
        <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-4">
          <div className={`p-2 sm:p-3 bg-gradient-to-r ${currentEraData.color} rounded-lg sm:rounded-xl`}>
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg">Time Machine</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Currently in {currentEraData.year}</p>
          </div>
        </div>

        {/* Era Display */}
        <div className="mb-3 sm:mb-4 p-2 sm:p-3 md:p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg sm:rounded-xl">
          <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">{currentEraData.name}</h4>
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">{currentEraData.description}</p>
          <div className="flex flex-wrap gap-1 text-xs">
            {currentEraData.technologies.slice(0, 3).map(tech => (
              <span key={tech} className="text-xs bg-white dark:bg-gray-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                {tech}
              </span>
            ))}
            {currentEraData.technologies.length > 3 && (
              <span className="text-xs text-gray-500">+{currentEraData.technologies.length - 3} more</span>
            )}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-3 sm:mb-4">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">
            <span>2020</span>
            <span>Timeline</span>
            <span>2025</span>
          </div>
          <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`absolute left-0 top-0 h-full bg-gradient-to-r ${currentEraData.color} transition-all duration-500`}
              style={{ width: `${timelinePosition}%` }}
            />
            <div 
              className="absolute top-0 w-4 h-4 bg-white border-2 border-gray-400 rounded-full transform -translate-y-1 -translate-x-2 transition-all duration-500"
              style={{ left: `${timelinePosition}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-2 sm:mb-0">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={resetTimeline}
              className="p-1 sm:p-2 bg-gray-200 dark:bg-gray-700 rounded-md sm:rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              title="Reset to beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTimeSpeed(Math.max(0.5, timeSpeed - 0.5))}
              className="p-1 sm:p-2 bg-gray-200 dark:bg-gray-700 rounded-md sm:rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              title="Slower"
            >
              <Rewind className="w-4 h-4" />
            </button>
            <button
              onClick={togglePlayback}
              className={`p-1 sm:p-2 rounded-md sm:rounded-lg transition-colors ${
                isPlaying 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setTimeSpeed(Math.min(3, timeSpeed + 0.5))}
              className="p-1 sm:p-2 bg-gray-200 dark:bg-gray-700 rounded-md sm:rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              title="Faster"
            >
              <FastForward className="w-4 h-4" />
            </button>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Speed: {timeSpeed}x
          </div>
        </div>

        {/* Era Navigation */}
        <div className="mt-2 sm:mt-4 grid grid-cols-3 gap-1 sm:gap-2">
          {timeEras.map((era, index) => (
            <button
              key={era.id}
              onClick={() => travelToEra(index)}
              className={`p-1 sm:p-2 rounded-md sm:rounded-lg text-xs font-medium transition-all duration-300 ${
                currentEra === index
                  ? `bg-gradient-to-r ${era.color} text-white shadow-lg`
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {era.year}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className={`relative z-20 transition-all duration-1000 ${isTimeTravel ? 'blur-sm scale-105' : ''}`}>
        {/* Header */}
        <header className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="text-center">
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
                <div className={`p-2 sm:p-3 md:p-4 bg-gradient-to-r ${currentEraData.color} rounded-full`}>
                  <Calendar className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
                    {personalInfo.name}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">
                    {currentEraData.year} • {currentEraData.name}
                  </p>
                </div>
              </div>
              
              <div className={`inline-block p-3 sm:p-4 md:p-6 bg-gradient-to-r ${currentEraData.color} text-white rounded-xl sm:rounded-2xl shadow-xl mb-4 sm:mb-6`}>
                <p className="text-lg sm:text-xl md:text-2xl font-bold">{personalInfo.title}</p>
                <p className="text-sm sm:text-base md:text-lg opacity-90">{personalInfo.education}</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
              <a 
                href={`mailto:${personalInfo.email}`}
                className={`group bg-gradient-to-r ${currentEraData.color} text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2 mb-2 sm:mb-0`}
              >
                <Mail className="w-6 h-6" />
                <span className="font-semibold">Contact from {currentEraData.year}</span>
              </a>
              <a 
                href={`https://${personalInfo.linkedin}`}
                className="group bg-white/20 backdrop-blur-sm text-gray-900 dark:text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2 border border-gray-300 dark:border-gray-600 mb-2 sm:mb-0"
              >
                <Linkedin className="w-6 h-6" />
                <span className="font-semibold">LinkedIn</span>
              </a>
              <a 
                href={`https://${personalInfo.github}`}
                className="group bg-white/20 backdrop-blur-sm text-gray-900 dark:text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2 border border-gray-300 dark:border-gray-600"
              >
                <Github className="w-6 h-6" />
                <span className="font-semibold">GitHub</span>
              </a>
            </div>
          </div>
        </header>

        {/* About Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r ${currentEraData.color} bg-clip-text text-transparent`}>
                About Me in {currentEraData.year}
              </h2>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4 sm:mb-6">
                  {personalInfo.bio}
                </p>
                <div className={`p-3 sm:p-4 bg-gradient-to-r ${currentEraData.color} text-white rounded-lg sm:rounded-xl`}>
                  <p className="font-semibold">{currentEraData.description}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className={`bg-gradient-to-r ${currentEraData.color} text-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold">{currentEraData.year}</div>
                    <div className="text-sm opacity-90">Current Era</div>
                  </div>
                  <History className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 opacity-80" />
                </div>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{currentEraData.projects.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Projects Available</div>
                  </div>
                  <Timer className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-600 dark:text-gray-400" />
                </div>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{currentEraData.skills.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Skills Mastered</div>
                  </div>
                  <Hourglass className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-600 dark:text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r ${currentEraData.color} bg-clip-text text-transparent`}>
              Projects from {currentEraData.year}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {currentEraData.projects.length === 0 
                ? "No projects available in this era yet" 
                : `Showcasing ${currentEraData.projects.length} project${currentEraData.projects.length > 1 ? 's' : ''} from this time period`}
            </p>
          </div>
          
          {currentEraData.projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {currentEraData.projects.map((project, index) => (
                <div
                  key={project.id}
                  className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-200 dark:border-gray-700"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="absolute top-4 right-4">
                      <div className={`px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r ${currentEraData.color} text-white text-xs sm:text-sm font-bold rounded-full`}>
                        {currentEraData.year}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6 md:p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                      <span className="hidden sm:inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium capitalize">
                        {project.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                      {project.tech.map((tech) => (
                        <span 
                          key={tech} 
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-xs sm:text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-4">
                      {project.link && (
                        <a 
                          href={project.link} 
                          className={`bg-gradient-to-r ${currentEraData.color} text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>View</span>
                        </a>
                      )}
                      {project.github && (
                        <a 
                          href={project.github} 
                          className="bg-white/20 backdrop-blur-sm text-gray-900 dark:text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2 border border-gray-300 dark:border-gray-600"
                        >
                          <Github className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className={`inline-block p-4 sm:p-6 md:p-8 bg-gradient-to-r ${currentEraData.color} text-white rounded-xl sm:rounded-2xl shadow-xl`}>
                <Clock className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 opacity-80" />
                <h3 className="text-xl sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">Time Paradox</h3>
                <p className="text-base sm:text-lg opacity-90">No projects exist in this timeline yet!</p>
              </div>
            </div>
          )}
        </section>

        {/* Skills Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r ${currentEraData.color} bg-clip-text text-transparent`}>
              Skills Timeline: {currentEraData.year}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Technologies and expertise available in this era
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {currentEraData.skills.length > 0 ? (
              (() => {
                const groupedSkills = currentEraData.skills.reduce((acc, skill) => {
                  if (!acc[skill.category]) acc[skill.category] = [];
                  acc[skill.category].push(skill);
                  return acc;
                }, {} as Record<string, typeof skills>);

                return Object.entries(groupedSkills).map(([category, categorySkills], index) => (
                  <div 
                    key={category} 
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="text-center mb-6">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br ${currentEraData.color} rounded-full flex items-center justify-center text-white shadow-lg`}>
                        <Clock className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white capitalize">
                        {category.replace('-', ' ')}
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      {categorySkills.map((skill) => (
                        <div key={skill.name} className="group">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`bg-gradient-to-r ${currentEraData.color} h-2 rounded-full transition-all duration-1000 relative overflow-hidden`}
                              style={{ width: `${skill.level}%` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()
            ) : (
              <div className="col-span-full text-center py-20">
                <div className={`inline-block p-4 sm:p-6 md:p-8 bg-gradient-to-r ${currentEraData.color} text-white rounded-xl sm:rounded-2xl shadow-xl`}>
                  <Hourglass className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 opacity-80" />
                  <h3 className="text-xl sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">Skills Loading...</h3>
                  <p className="text-base sm:text-lg opacity-90">Knowledge is still being acquired in this timeline!</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="text-center">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r ${currentEraData.color} bg-clip-text text-transparent`}>
              Contact Across Time
            </h2>
            
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
              <p className="text-xl sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight text-gray-800 dark:text-gray-200 max-w-2xl mx-auto">
                Ready to collaborate across the timeline?<br />
                <span className={`bg-gradient-to-r ${currentEraData.color} bg-clip-text text-transparent`}>
                  Let's build the future together from {currentEraData.year}.
                </span>
              </p>
              
              <a 
                href={`mailto:${personalInfo.email}`}
                className={`inline-block bg-gradient-to-r ${currentEraData.color} text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                  <span className="text-lg sm:text-xl md:text-2xl font-bold">Send Message to {currentEraData.year}</span>
                  <Clock className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                </div>
              </a>
            </div>
            
            <div className="mt-4 sm:mt-6 md:mt-8 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-lg inline-block">
              <p className="font-semibold text-gray-700 dark:text-gray-300">
                📍 {personalInfo.location} • Timeline: {currentEraData.year}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TimeMachineModeTemplate;