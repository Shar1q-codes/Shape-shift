/**
 * Animated Isometric Template
 * 
 * This template creates a 3D isometric view of portfolio content using SVG.
 * It features interactive blocks representing different content types,
 * camera movement based on mouse position, and animated transformations.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Box, Layers, Zap, Star, Code, Database, Server, Terminal, Cpu, Monitor } from 'lucide-react';
import { personalInfo, projects, skills } from '../../data/portfolio';

// Interface defining an isometric block in 3D space
interface IsometricBlock {
  id: string;
  x: number;          // X position in 3D space
  y: number;          // Y position in 3D space
  z: number;          // Z position (height) in 3D space
  width: number;      // Block width
  height: number;     // Block height
  depth: number;      // Block depth
  color: string;      // Block color
  content?: string;   // Text content to display
  type: 'skill' | 'project' | 'info' | 'decoration';
  data?: any;         // Associated data (project/skill info)
}

const AnimatedIsometricTemplate: React.FC = () => {
  // State for mouse tracking and camera control
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [cameraAngle, setCameraAngle] = useState({ x: 30, y: 45 });
  const [blocks, setBlocks] = useState<IsometricBlock[]>([]);
  const [animationPhase, setAnimationPhase] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Initialize isometric blocks
   * Creates a 3D grid of blocks representing different content types
   */
  useEffect(() => {
    const initialBlocks: IsometricBlock[] = [];
    let blockId = 0;

    // Create base platform (decorative blocks)
    for (let x = 0; x < 12; x++) {
      for (let y = 0; y < 8; y++) {
        initialBlocks.push({
          id: `base-${blockId++}`,
          x: x * 50,
          y: y * 50,
          z: 0,
          width: 50,
          height: 20,
          depth: 50,
          color: '#e5e7eb',
          type: 'decoration'
        });
      }
    }

    // Personal info tower (central prominent block)
    initialBlocks.push({
      id: 'info-tower',
      x: 100,
      y: 100,
      z: 20,
      width: 100,
      height: 200,
      depth: 100,
      color: '#3b82f6',
      content: 'Personal Info',
      type: 'info',
      data: personalInfo
    });

    // Project blocks (varying heights and positions)
    projects.forEach((project, index) => {
      const x = 250 + (index % 3) * 120;
      const y = 50 + Math.floor(index / 3) * 120;
      initialBlocks.push({
        id: `project-${index}`,
        x,
        y,
        z: 20,
        width: 100,
        height: 80 + Math.random() * 60,
        depth: 100,
        color: ['#ef4444', '#f59e0b', '#10b981', '#8b5cf6'][index % 4],
        content: project.title,
        type: 'project',
        data: project
      });
    });

    // Skill towers (height based on skill level)
    const skillCategories = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, typeof skills>);

    Object.entries(skillCategories).forEach(([category, categorySkills], index) => {
      const x = 50 + index * 100;
      const y = 300;
      const avgLevel = categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length;
      
      initialBlocks.push({
        id: `skill-${category}`,
        x,
        y,
        z: 20,
        width: 80,
        height: 40 + (avgLevel / 100) * 120,
        depth: 80,
        color: ['#06b6d4', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981'][index % 5],
        content: category.replace('-', ' ').toUpperCase(),
        type: 'skill',
        data: categorySkills
      });
    });

    setBlocks(initialBlocks);
  }, []);

  /**
   * Mouse tracking for camera movement
   * Updates camera angle based on mouse position for 3D effect
   */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        
        setMousePosition({ x, y });
        
        // Subtle camera movement based on mouse position
        setCameraAngle({
          x: 30 + y * 3,
          y: 45 + x * 5
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  /**
   * Animation phases for dynamic effects
   * Cycles through different animation states
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  /**
   * Convert 3D coordinates to 2D isometric projection
   * Applies camera angle and isometric transformation
   */
  const projectToIsometric = (x: number, y: number, z: number) => {
    const radX = (cameraAngle.x * Math.PI) / 180;
    const radY = (cameraAngle.y * Math.PI) / 180;
    
    const isoX = (x - y) * Math.cos(radY);
    const isoY = (x + y) * Math.sin(radY) - z * Math.sin(radX);
    
    return {
      x: isoX + 600,
      y: isoY + 400
    };
  };

  /**
   * Render individual isometric block
   * Creates SVG representation of 3D block with faces and content
   */
  const renderBlock = (block: IsometricBlock) => {
    const { x: screenX, y: screenY } = projectToIsometric(block.x, block.y, block.z);
    const { x: topX, y: topY } = projectToIsometric(block.x, block.y, block.z + block.height);
    
    const isSelected = selectedBlock === block.id;
    const animationOffset = animationPhase * 10;
    
    // Calculate animation based on type and phase
    let animatedHeight = block.height;
    let animatedZ = block.z;
    
    if (block.type === 'skill') {
      animatedHeight = block.height + Math.sin(animationPhase + block.x * 0.01) * 10;
    } else if (block.type === 'project') {
      animatedZ = block.z + Math.cos(animationPhase + block.y * 0.01) * 5;
    }

    // Scale factor for better visibility
    const scale = 0.8;
    const scaledWidth = block.width * scale;
    const scaledDepth = block.depth * scale;

    return (
      <g
        key={block.id}
        className={`cursor-pointer transition-all duration-300 ${isSelected ? 'filter drop-shadow-lg' : ''}`}
        onClick={() => setSelectedBlock(isSelected ? null : block.id)}
        style={{
          transform: `translate(${screenX}px, ${screenY}px)`,
          transformOrigin: 'center'
        }}
      >
        {/* Block faces - Top face */}
        <polygon
          points={`0,0 ${scaledWidth * 0.5},${-scaledDepth * 0.25} ${scaledWidth * 0.5 - scaledWidth},${-scaledDepth * 0.25 + scaledDepth * 0.5} ${-scaledWidth * 0.5},${scaledDepth * 0.25}`}
          fill={block.color}
          stroke="#000"
          strokeWidth="1"
          opacity={isSelected ? 0.9 : 0.8}
          className="hover:opacity-100 transition-opacity duration-200"
        />
        
        {/* Left face */}
        <polygon
          points={`0,0 ${-scaledWidth * 0.5},${scaledDepth * 0.25} ${-scaledWidth * 0.5},${scaledDepth * 0.25 + animatedHeight * 0.5} 0,${animatedHeight * 0.5}`}
          fill={block.color}
          stroke="#000"
          strokeWidth="1"
          opacity={0.6}
          style={{ filter: 'brightness(0.7)' }}
        />
        
        {/* Right face */}
        <polygon
          points={`0,0 ${scaledWidth * 0.5},${-scaledDepth * 0.25} ${scaledWidth * 0.5},${-scaledDepth * 0.25 + animatedHeight * 0.5} 0,${animatedHeight * 0.5}`}
          fill={block.color}
          stroke="#000"
          strokeWidth="1"
          opacity={0.7}
          style={{ filter: 'brightness(0.8)' }}
        />
        
        {/* Content label */}
        {block.content && (
          <text
            x="0"
            y={-animatedHeight * 0.25}
            textAnchor="middle"
            className="text-xs font-bold fill-white"
            style={{ 
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              fontSize: block.type === 'info' ? '12px' : '8px'
            }}
          >
            {block.content}
          </text>
        )}
        
        {/* Type icon */}
        {block.type !== 'decoration' && (
          <foreignObject x="-8" y={-animatedHeight * 0.5 - 16} width="16" height="16">
            <div className="flex items-center justify-center w-full h-full">
              {block.type === 'skill' && <Code className="w-3 h-3 text-white drop-shadow-lg" />}
              {block.type === 'project' && <Box className="w-3 h-3 text-white drop-shadow-lg" />}
              {block.type === 'info' && <Star className="w-3 h-3 text-white drop-shadow-lg" />}
            </div>
          </foreignObject>
        )}
      </g>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950 overflow-hidden relative"
    >
      {/* Floating particles for ambient effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        {Array(20).fill(0).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header with personal information */}
      <header className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              {personalInfo.name}
            </h1>
            <p className="text-2xl text-gray-700 dark:text-gray-300 mb-2">{personalInfo.title}</p>
            <p className="text-gray-600 dark:text-gray-400">{personalInfo.education}</p>
          </div>
          
          {/* Contact buttons */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
            <a 
              href={`mailto:${personalInfo.email}`}
              className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <Mail className="w-6 h-6" />
              <span className="font-semibold">Email</span>
            </a>
            <a 
              href={`https://${personalInfo.linkedin}`}
              className="group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <Linkedin className="w-6 h-6" />
              <span className="font-semibold">LinkedIn</span>
            </a>
            <a 
              href={`https://${personalInfo.github}`}
              className="group bg-gradient-to-r from-gray-600 to-gray-800 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <Github className="w-6 h-6" />
              <span className="font-semibold">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Isometric World - Main 3D visualization */}
      <div className="relative z-10 flex items-center justify-center py-10 sm:py-16 md:py-20 overflow-hidden">
        <svg
          width="100%"
          height="800"
          viewBox="0 0 1200 800"
          className="max-w-full h-auto"
          style={{
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
          }}
        >
          {blocks.map(renderBlock)}
        </svg>
      </div>

      {/* Selected Block Details Panel */}
      {selectedBlock && (
        <div className="fixed bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 right-3 sm:right-4 md:right-6 z-30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-2xl border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
          {(() => {
            const block = blocks.find(b => b.id === selectedBlock);
            if (!block || block.contentType === 'decoration') return null;

            // Render different content based on block type
            switch (block.type) {
              case 'info':
                return ( 
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Personal Information</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-semibold">Name:</span> {block.data?.name}</p>
                      <p><span className="font-semibold">Title:</span> {block.data.title}</p>
                      <p><span className="font-semibold">Location:</span> {block.data.location}</p>
                      <p className="mt-3 text-gray-700 dark:text-gray-300">{block.data.bio}</p>
                    </div>
                  </div>
                );

              case 'project':
                return ( 
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                        <Box className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{block.data.title}</h3>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-700 dark:text-gray-300">{block.data.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {block.data.tech.map((tech: string) => (
                          <span key={tech} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-3 pt-2">
                        {block.data.link && (
                          <a href={block.data.link} className="text-blue-600 hover:text-blue-800 flex items-center space-x-1 text-sm">
                            <ExternalLink className="w-4 h-4" />
                            <span>View Live</span>
                          </a>
                        )}
                        {block.data.github && (
                          <a href={block.data.github} className="text-gray-600 hover:text-gray-800 flex items-center space-x-1 text-sm">
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
                      <div className="p-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg">
                        <Code className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{block.content}</h3>
                    </div>
                    <div className="space-y-3">
                      {block.data.map((skill: any) => (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );

              default:
                return null;
            }
          })()}
          
          {/* Close button */}
          <button
            onClick={() => setSelectedBlock(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      {/* Controls panel */}
      <div className="fixed top-20 sm:top-24 md:top-28 right-3 sm:right-4 md:right-6 z-30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Isometric View</div>
        <div className="flex items-center space-x-2 text-xs">
          <Layers className="w-4 h-4" />
          <span>Click blocks to explore</span>
        </div>
        <div className="flex items-center space-x-2 text-xs mt-1">
          <Monitor className="w-4 h-4" />
          <span>Mouse to rotate camera</span>
        </div>
      </div>

      {/* Legend */}
      <div className="fixed bottom-20 sm:bottom-24 md:bottom-28 right-3 sm:right-4 md:right-6 z-30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Legend</div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Personal Info</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Projects</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Skills</span>
          </div>
        </div>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedIsometricTemplate;