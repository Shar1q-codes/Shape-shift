/**
 * Escher Grid Template
 * 
 * This template creates an impossible tessellation inspired by M.C. Escher's work.
 * Features interactive tiles with perspective effects, mouse-controlled camera,
 * and geometric transformations that create optical illusions.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Hexagon, Triangle, Square, Circle, Layers, Eye, Infinity, RotateCw, Zap, Grid } from 'lucide-react';
import { personalInfo, projects, skills } from '../../data/portfolio';

// Interface defining an Escher-style tile
interface EscherTile {
  id: string;
  x: number;           // X position in grid
  y: number;           // Y position in grid
  rotation: number;    // Rotation angle
  scale: number;       // Scale factor
  type: 'hexagon' | 'triangle' | 'square' | 'circle';
  content?: any;       // Associated content data
  contentType?: 'skill' | 'project' | 'info' | 'decoration';
  color: string;       // Tile color
  depth: number;       // Z-depth for 3D effect
}

const EscherGridTemplate: React.FC = () => {
  // State for grid management and interactions
  const [tiles, setTiles] = useState<EscherTile[]>([]);
  const [selectedTile, setSelectedTile] = useState<string | null>(null);
  const [gridRotation, setGridRotation] = useState(0);
  const [perspective, setPerspective] = useState(1000);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animationPhase, setAnimationPhase] = useState(0);
  const [isTransforming, setIsTransforming] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Initialize Escher-style tessellation
   * Creates a grid of tiles with different shapes and content
   */
  useEffect(() => {
    const initialTiles: EscherTile[] = [];
    let tileId = 0;

    // Create tessellating pattern
    const gridSize = 8;
    const tileSize = 80;
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const x = col * tileSize;
        const y = row * tileSize;
        
        // Create different tile types based on position
        const tileType = ['hexagon', 'triangle', 'square', 'circle'][Math.floor(Math.random() * 4)] as EscherTile['type'];
        const rotation = (row + col) * 45;
        const depth = Math.sin((row + col) * 0.5) * 20;
        
        // Assign content based on position and type
        let content = null;
        let contentType: EscherTile['contentType'] = 'decoration';
        let color = '#e5e7eb';

        // Personal info tiles (center area)
        if (row >= 2 && row <= 3 && col >= 2 && col <= 3) {
          contentType = 'info';
          content = personalInfo;
          color = '#3b82f6';
        }
        // Project tiles
        else if (row >= 1 && row <= 4 && col >= 4 && col <= 6) {
          const projectIndex = (row - 1) * 3 + (col - 4);
          if (projectIndex < projects.length) {
            contentType = 'project';
            content = projects[projectIndex];
            color = ['#ef4444', '#f59e0b', '#10b981', '#8b5cf6'][projectIndex % 4];
          }
        }
        // Skill tiles
        else if (row >= 5 && row <= 6) {
          const skillIndex = (row - 5) * gridSize + col;
          if (skillIndex < skills.length) {
            contentType = 'skill';
            content = skills[skillIndex];
            color = '#06b6d4';
          }
        }

        initialTiles.push({
          id: `tile-${tileId++}`,
          x,
          y,
          rotation,
          scale: 0.8 + Math.random() * 0.4,
          type: tileType,
          content,
          contentType,
          color,
          depth
        });
      }
    }

    setTiles(initialTiles);
  }, []);

  /**
   * Mouse tracking for perspective effect
   * Adjusts camera perspective based on mouse movement
   */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        
        setMousePosition({ x, y });
        
        // Adjust perspective based on mouse position
        setPerspective(800 + Math.abs(x * y) * 400);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  /**
   * Animation phases for tessellation transformation
   * Creates dynamic morphing effects
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 8);
      
      // Trigger transformation every 4 phases
      if (animationPhase % 4 === 0) {
        setIsTransforming(true);
        setTimeout(() => setIsTransforming(false), 1000);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [animationPhase]);

  /**
   * Auto-rotate grid for dynamic effect
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setGridRotation(prev => (prev + 0.5) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  /**
   * Transform tiles based on animation phase
   * Updates tile properties for morphing effects
   */
  useEffect(() => {
    setTiles(prevTiles => 
      prevTiles.map(tile => ({
        ...tile,
        rotation: tile.rotation + animationPhase * 5,
        scale: tile.scale + Math.sin(animationPhase + tile.x * 0.01) * 0.1,
        depth: tile.depth + Math.cos(animationPhase + tile.y * 0.01) * 10
      }))
    );
  }, [animationPhase]);

  /**
   * Render individual tile with appropriate shape
   */
  const renderTile = (tile: EscherTile) => {
    const isSelected = selectedTile === tile.id;
    const transform = `
      translate3d(${tile.x}px, ${tile.y}px, ${tile.depth}px)
      rotateX(${mousePosition.y * 10}deg)
      rotateY(${mousePosition.x * 10}deg)
      rotateZ(${tile.rotation}deg)
      scale(${tile.scale})
    `;

    /**
     * Get SVG shape based on tile type
     */
    const getTileShape = () => {
      const size = 60;
      const halfSize = size / 2;
      
      switch (tile.type) {
        case 'hexagon':
          return (
            <polygon
              points={`${halfSize},0 ${size},${halfSize * 0.5} ${size},${halfSize * 1.5} ${halfSize},${size} 0,${halfSize * 1.5} 0,${halfSize * 0.5}`}
              fill={tile.color}
              stroke="#000"
              strokeWidth="1"
              opacity={isSelected ? 0.9 : 0.8}
            />
          );
        case 'triangle':
          return (
            <polygon
              points={`${halfSize},0 ${size},${size} 0,${size}`}
              fill={tile.color}
              stroke="#000"
              strokeWidth="1"
              opacity={isSelected ? 0.9 : 0.8}
            />
          );
        case 'square':
          return (
            <rect
              width={size}
              height={size}
              fill={tile.color}
              stroke="#000"
              strokeWidth="1"
              opacity={isSelected ? 0.9 : 0.8}
            />
          );
        case 'circle':
          return (
            <circle
              cx={halfSize}
              cy={halfSize}
              r={halfSize}
              fill={tile.color}
              stroke="#000"
              strokeWidth="1"
              opacity={isSelected ? 0.9 : 0.8}
            />
          );
      }
    };

    return (
      <div
        key={tile.id}
        className={`absolute cursor-pointer transition-all duration-500 ${
          isSelected ? 'z-20' : 'z-10'
        } ${isTransforming ? 'animate-pulse' : ''}`}
        style={{
          transform,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center'
        }}
        onClick={() => setSelectedTile(isSelected ? null : tile.id)}
      >
        <svg width="80" height="80" className="drop-shadow-lg">
          {getTileShape()}
          
          {/* Content overlay */}
          {tile.contentType !== 'decoration' && (
            <foreignObject x="10" y="10" width="60" height="60">
              <div className="flex items-center justify-center w-full h-full">
                {tile.contentType === 'skill' && <Zap className="w-6 h-6 text-white drop-shadow-lg" />}
                {tile.contentType === 'project' && <Grid className="w-6 h-6 text-white drop-shadow-lg" />}
                {tile.contentType === 'info' && <Eye className="w-6 h-6 text-white drop-shadow-lg" />}
              </div>
            </foreignObject>
          )}
          
          {/* Selection indicator */}
          {isSelected && (
            <circle
              cx="40"
              cy="40"
              r="35"
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              strokeDasharray="5,5"
              className="animate-spin"
            />
          )}
        </svg>
      </div>
    );
  };

  // Group skills by category for organized display
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-100 via-slate-50 to-gray-200 dark:from-gray-900 dark:via-slate-950 dark:to-gray-800 text-gray-900 dark:text-white relative overflow-hidden"
      style={{ perspective: `${perspective}px` }}
    >
      {/* Escher-style background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="escherPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              <polygon points="25,12.5 75,12.5 87.5,37.5 75,62.5 25,62.5 12.5,37.5" fill="none" stroke="currentColor" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#escherPattern)" />
        </svg>
      </div>

      {/* Control Panel */}
      <div className="fixed top-2 sm:top-4 md:top-6 right-2 sm:right-4 md:right-6 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-2xl border border-gray-200 dark:border-gray-700 max-w-[calc(100%-1rem)] sm:max-w-xs">
        <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-4">
          <div className="p-2 sm:p-3 bg-gradient-to-r from-gray-600 to-slate-700 rounded-lg sm:rounded-xl">
            <Hexagon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg">Escher Grid</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Impossible Tessellation</p>
          </div>
        </div>

        {/* Grid statistics */}
        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
          <div className="flex justify-between items-center">
            <span>Grid Rotation:</span>
            <span className="font-mono">{Math.round(gridRotation)}°</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Perspective:</span>
            <span className="font-mono">{Math.round(perspective)}px</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Animation Phase:</span>
            <span className="font-mono">{animationPhase}/8</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Tiles:</span>
            <span className="font-mono">{tiles.length}</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">Instructions:</div>
          <div className="space-y-0.5 sm:space-y-1 text-xs text-gray-700 dark:text-gray-300">
            <div>• Move mouse to adjust perspective</div>
            <div>• Click tiles to explore content</div>
            <div>• Watch the tessellation transform</div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-gray-700 via-slate-600 to-gray-800 bg-clip-text text-transparent">
              {personalInfo.name}
            </h1>
            <div className="relative inline-block">
              <div 
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
                style={{
                  transform: `rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <p className="text-2xl font-medium text-gray-700 dark:text-gray-300">{personalInfo.title}</p>
                <p className="text-gray-600 dark:text-gray-400">{personalInfo.education}</p>
              </div>
            </div>
          </div>
          
          {/* Contact buttons with perspective effects */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
            <a 
              href={`mailto:${personalInfo.email}`}
              className="group bg-gradient-to-r from-gray-600 to-slate-700 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              style={{
                transform: `rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="font-semibold">Email</span>
            </a>
            <a 
              href={`https://${personalInfo.linkedin}`}
              className="group bg-white/20 backdrop-blur-sm text-gray-900 dark:text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2 border border-gray-300 dark:border-gray-600"
              style={{
                transform: `rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="font-semibold">LinkedIn</span>
            </a>
            <a 
              href={`https://${personalInfo.github}`}
              className="group bg-white/20 backdrop-blur-sm text-gray-900 dark:text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2 border border-gray-300 dark:border-gray-600"
              style={{
                transform: `rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="font-semibold">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Escher Tessellation Grid */}
      <div className="relative z-10 flex items-center justify-center py-10 sm:py-16 md:py-20 overflow-x-hidden">
        <div 
          className="relative"
          style={{
            transform: `rotateX(${mousePosition.y * 15}deg) rotateY(${mousePosition.x * 15}deg) rotateZ(${gridRotation * 0.1}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {tiles.map(renderTile)}
        </div>
      </div>

      {/* Selected Tile Details Panel */}
      {selectedTile && (
        <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
          {(() => {
            const tile = tiles.find(t => t.id === selectedTile);
            if (!tile || tile.contentType === 'decoration') return null;

            // Render content based on tile type
            switch (tile.contentType) {
              case 'info':
                return ( 
                  <div> 
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Personal Information</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-semibold">Name:</span> {tile.content?.name}</p>
                      <p><span className="font-semibold">Title:</span> {tile.content.title}</p>
                      <p><span className="font-semibold">Location:</span> {tile.content.location}</p>
                      <p className="mt-3 text-gray-700 dark:text-gray-300">{tile.content.bio}</p>
                    </div>
                  </div>
                );

              case 'project':
                return (
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                        <Grid className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{tile.content.title}</h3>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-700 dark:text-gray-300">{tile.content.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {tile.content.tech.map((tech: string) => (
                          <span key={tech} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-3 pt-2">
                        {tile.content.link && (
                          <a href={tile.content.link} className="text-blue-600 hover:text-blue-800 flex items-center space-x-1 text-sm">
                            <ExternalLink className="w-4 h-4" />
                            <span>View Live</span>
                          </a>
                        )}
                        {tile.content.github && (
                          <a href={tile.content.github} className="text-gray-600 hover:text-gray-800 flex items-center space-x-1 text-sm">
                            <Github className="w-4 h-4" />
                            <span>Source</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );

              case 'skill':
                return (
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{tile.content.name}</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Proficiency Level</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{tile.content.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-teal-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${tile.content.level}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                        Category: {tile.content.category.replace('-', ' ')}
                      </div>
                    </div>
                  </div>
                );

              default:
                return null;
            }
          })()}
          
          {/* Close button */}
          <button
            onClick={() => setSelectedTile(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      {/* About Section */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-gray-700 to-slate-600 bg-clip-text text-transparent">
            Impossible Perspectives
          </h2>
          
          <div 
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto"
            style={{
              transform: `rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 md:mb-8">
              {personalInfo.bio}
            </p>
            
            {/* Statistics grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg sm:rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">∞</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Infinite Possibilities</div>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg sm:rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">{projects.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Dimensional Projects</div>
              </div>
              <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg sm:rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">{skills.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Tessellated Skills</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-gray-700 to-slate-600 bg-clip-text text-transparent">
            Connect Across Dimensions
          </h2>
          
          <div 
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
            style={{
              transform: `rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <p className="text-xl sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight text-gray-800 dark:text-gray-200 max-w-2xl mx-auto">
              Ready to explore impossible collaborations?<br />
              <span className="bg-gradient-to-r from-gray-700 to-slate-600 bg-clip-text text-transparent">
                Let's tessellate our ideas together.
              </span>
            </p>
            
            <a 
              href={`mailto:${personalInfo.email}`}
              className="inline-block bg-gradient-to-r from-gray-600 to-slate-700 text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              style={{
                transform: `rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="flex items-center space-x-4">
                <Mail className="w-8 h-8" />
                <span className="text-lg sm:text-xl md:text-2xl font-bold">Enter the Grid</span>
                <Infinity className="w-8 h-8" />
              </div>
            </a>
          </div>
          
          <div className="mt-4 sm:mt-6 md:mt-8 bg-gradient-to-r from-gray-100 to-slate-200 dark:from-gray-800 dark:to-slate-700 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-lg inline-block">
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              📍 {personalInfo.location} • Dimension: Reality
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EscherGridTemplate;