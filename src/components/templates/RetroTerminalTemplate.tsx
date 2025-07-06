/**
 * Retro Terminal Template
 * 
 * This template implements a vintage computer terminal interface with
 * monospace fonts, CRT effects, and command-line interactions. Features
 * boot sequence, command execution, and terminal-style output display.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Terminal, Code, Database, Server, Cpu, Zap, User, Folder, FileText, Monitor } from 'lucide-react';
import { personalInfo, projects, skills } from '../../data/portfolio';

// Interface for terminal line objects
interface TerminalLine {
  id: number;
  text: string;
  type: 'command' | 'output' | 'error' | 'success' | 'info';
  delay?: number;
}

const RetroTerminalTemplate: React.FC = () => {
  // State for terminal functionality
  const [currentPath, setCurrentPath] = useState('~');
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [bootSequence, setBootSequence] = useState(true);
  const [currentSection, setCurrentSection] = useState('welcome');
  
  // Refs for DOM manipulation
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lineIdRef = useRef(0);

  /**
   * Boot sequence animation
   * Displays startup messages and ASCII art
   */
  useEffect(() => {
    const bootLines: TerminalLine[] = [
      { id: lineIdRef.current++, text: 'PORTFOLIO OS v2.1.0 - Initializing...', type: 'info', delay: 0 },
      { id: lineIdRef.current++, text: 'Loading kernel modules...', type: 'info', delay: 300 },
      { id: lineIdRef.current++, text: 'Loading kernel modules... [OK]', type: 'success', delay: 600 },
      { id: lineIdRef.current++, text: 'Mounting file systems...', type: 'info', delay: 800 },
      { id: lineIdRef.current++, text: 'Mounting file systems... [OK]', type: 'success', delay: 1000 },
      { id: lineIdRef.current++, text: 'Starting network services...', type: 'info', delay: 1200 },
      { id: lineIdRef.current++, text: 'Starting network services... [OK]', type: 'success', delay: 1400 },
      { id: lineIdRef.current++, text: 'Loading user profile...', type: 'info', delay: 1600 },
      { id: lineIdRef.current++, text: 'Loading user profile... [OK]', type: 'success', delay: 1800 },
      { id: lineIdRef.current++, text: '', type: 'output', delay: 2000 },
      { id: lineIdRef.current++, text: '########  #######  ########  ######## ########  #######  ##       ####  #######', type: 'success', delay: 2200 },
      { id: lineIdRef.current++, text: '##     ## ##     ## ##     ##    ##    ##       ##     ## ##        ##  ##     ##', type: 'success', delay: 2300 },
      { id: lineIdRef.current++, text: '########  ##     ## ########     ##    ######   ##     ## ##        ##  ##     ##', type: 'success', delay: 2400 },
      { id: lineIdRef.current++, text: '##        ##     ## ##   ##      ##    ##       ##     ## ##        ##  ##     ##', type: 'success', delay: 2500 },
      { id: lineIdRef.current++, text: '##         #######  ##     ##    ##    ##        #######  ######## ####  #######', type: 'success', delay: 2600 },
      { id: lineIdRef.current++, text: '', type: 'output', delay: 3000 },
      { id: lineIdRef.current++, text: `Welcome to ${personalInfo.name}'s Portfolio Terminal`, type: 'info', delay: 3200 },
      { id: lineIdRef.current++, text: 'Type "help" for available commands', type: 'info', delay: 3400 },
      { id: lineIdRef.current++, text: '', type: 'output', delay: 3600 }
    ];

    // Add boot lines with delays
    bootLines.forEach((line) => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, line]);
      }, line.delay || 0);
    });

    // End boot sequence
    setTimeout(() => {
      setBootSequence(false);
      setIsTyping(false);
    }, 4000);
  }, []);

  /**
   * Cursor blinking effect
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  /**
   * Auto-scroll to bottom of terminal
   */
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

  /**
   * Focus input when clicking on terminal
   */
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current && !bootSequence) {
        inputRef.current.focus();
      }
    };

    const terminal = terminalRef.current;
    if (terminal) {
      terminal.addEventListener('click', handleClick);
      return () => terminal.removeEventListener('click', handleClick);
    }
  }, [bootSequence]);

  /**
   * Add a line to the terminal
   */
  const addLine = (text: string, type: TerminalLine['type'] = 'output') => {
    setTerminalLines(prev => [...prev, { id: lineIdRef.current++, text, type }]);
  };

  /**
   * Type text with animation effect
   */
  const typeText = async (text: string, type: TerminalLine['type'] = 'output') => {
    setIsTyping(true);
    const words = text.split(' ');
    let currentText = '';
    
    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? ' ' : '') + words[i];
      setTerminalLines(prev => {
        const newLines = [...prev];
        const lastLineIndex = newLines.length - 1;
        if (lastLineIndex >= 0 && newLines[lastLineIndex].type === type) {
          newLines[lastLineIndex] = { ...newLines[lastLineIndex], text: currentText };
        } else {
          newLines.push({ id: lineIdRef.current++, text: currentText, type });
        }
        return newLines;
      });
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    setIsTyping(false);
  };

  /**
   * Execute terminal command
   * Handles different commands and displays appropriate output
   */
  const executeCommand = async (command: string) => {
    const cmd = command.trim().toLowerCase();
    addLine(`${currentPath} $ ${command}`, 'command');

    switch (cmd) {
      case 'help':
        addLine('Available commands:', 'info');
        addLine('  help          - Show this help message', 'output');
        addLine('  about         - Display personal information', 'output');
        addLine('  projects      - List all projects', 'output');
        addLine('  skills        - Show technical skills', 'output');
        addLine('  contact       - Display contact information', 'output');
        addLine('  ls            - List directory contents', 'output');
        addLine('  cat <file>    - Display file contents', 'output');
        addLine('  cd <dir>      - Change directory', 'output');
        addLine('  clear         - Clear terminal screen', 'output');
        addLine('  whoami        - Display current user', 'output');
        addLine('  date          - Show current date and time', 'output');
        addLine('  neofetch      - System information', 'output');
        break;

      case 'about':
        setCurrentSection('about');
        addLine('Loading personal information...', 'info');
        await new Promise(resolve => setTimeout(resolve, 500));
        addLine('', 'output');
        addLine('=== PERSONAL INFORMATION ===', 'success');
        addLine(`Name: ${personalInfo.name}`, 'output');
        addLine(`Title: ${personalInfo.title}`, 'output');
        addLine(`Education: ${personalInfo.education}`, 'output');
        addLine(`Location: ${personalInfo.location}`, 'output');
        addLine('', 'output');
        await typeText(personalInfo.bio, 'info');
        break;

      case 'projects':
        setCurrentSection('projects');
        addLine('Fetching project data...', 'info');
        await new Promise(resolve => setTimeout(resolve, 500));
        addLine('', 'output');
        addLine('=== PROJECT PORTFOLIO ===', 'success');
        projects.forEach((project, index) => {
          addLine('', 'output');
          addLine(`[${index + 1}] ${project.title}`, 'success');
          addLine(`    Category: ${project.category}`, 'output');
          addLine(`    Tech: ${project.tech.join(', ')}`, 'output');
          addLine(`    Description: ${project.description}`, 'info');
          if (project.link) addLine(`    Live: ${project.link}`, 'output');
          if (project.github) addLine(`    GitHub: ${project.github}`, 'output');
        });
        break;

      case 'skills':
        setCurrentSection('skills');
        addLine('Analyzing skill database...', 'info');
        await new Promise(resolve => setTimeout(resolve, 500));
        addLine('', 'output');
        addLine('=== TECHNICAL SKILLS ===', 'success');
        
        const groupedSkills = skills.reduce((acc, skill) => {
          if (!acc[skill.category]) acc[skill.category] = [];
          acc[skill.category].push(skill);
          return acc;
        }, {} as Record<string, typeof skills>);

        Object.entries(groupedSkills).forEach(([category, categorySkills]) => {
          addLine('', 'output');
          addLine(`${category.toUpperCase().replace('-', ' ')}:`, 'success');
          categorySkills.forEach(skill => {
            const bar = '█'.repeat(Math.floor(skill.level / 10)) + '░'.repeat(10 - Math.floor(skill.level / 10));
            addLine(`  ${skill.name.padEnd(15)} [${bar}] ${skill.level}%`, 'output');
          });
        });
        break;

      case 'contact':
        setCurrentSection('contact');
        addLine('Loading contact protocols...', 'info');
        await new Promise(resolve => setTimeout(resolve, 500));
        addLine('', 'output');
        addLine('=== CONTACT INFORMATION ===', 'success');
        addLine(`Email: ${personalInfo.email}`, 'output');
        addLine(`LinkedIn: ${personalInfo.linkedin}`, 'output');
        addLine(`GitHub: ${personalInfo.github}`, 'output');
        addLine(`Location: ${personalInfo.location}`, 'output');
        addLine('', 'output');
        addLine('Available for remote collaboration and exciting projects!', 'info');
        break;

      case 'ls':
        addLine('total 8', 'output');
        addLine('drwxr-xr-x  2 user user 4096 Dec 15 10:30 projects/', 'output');
        addLine('drwxr-xr-x  2 user user 4096 Dec 15 10:30 skills/', 'output');
        addLine('-rw-r--r--  1 user user 1024 Dec 15 10:30 about.txt', 'output');
        addLine('-rw-r--r--  1 user user  512 Dec 15 10:30 contact.txt', 'output');
        addLine('-rw-r--r--  1 user user  256 Dec 15 10:30 resume.pdf', 'output');
        break;

      case 'whoami':
        addLine(personalInfo.name.toLowerCase().replace(' ', ''), 'output');
        break;

      case 'date':
        addLine(new Date().toString(), 'output');
        break;

      case 'clear':
        setTerminalLines([]);
        break;

      case 'neofetch':
        addLine('', 'output');
        addLine('                    ###                  user@portfolio', 'success');
        addLine('                   #####                 ---------------', 'success');
        addLine('                  #######                OS: Portfolio Linux x86_64', 'success');
        addLine('                 #########               Host: Developer Workstation', 'success');
        addLine('                ###########              Kernel: 5.15.0-portfolio', 'success');
        addLine('               #############             Uptime: 4 years, 50 projects', 'success');
        addLine('              ###############            Packages: React, Node.js, Python', 'success');
        addLine('             #################           Shell: zsh 5.8', 'success');
        addLine('            ###################          Resolution: Full-stack', 'success');
        addLine('           #####################         DE: VS Code', 'success');
        addLine('          #######################        WM: Productivity', 'success');
        addLine('         #########     #########        Theme: Dark [GTK3]', 'success');
        addLine('        #########       #########       Icons: Lucide React', 'success');
        addLine('       #########         #########      Terminal: RetroTerm', 'success');
        addLine('      #########           #########     CPU: Brain (4) @ 3.2GHz', 'success');
        addLine('     #########             #########    Memory: Unlimited', 'success');
        addLine('    #########               #########   ', 'success');
        addLine('   #########                 #########  ', 'success');
        addLine('  #########                   ######### ', 'success');
        break;

      case '':
        break;

      default:
        // Handle cat command
        if (cmd.startsWith('cat ')) {
          const filename = cmd.substring(4);
          switch (filename) {
            case 'about.txt':
              await typeText(personalInfo.bio, 'info');
              break;
            case 'contact.txt':
              addLine(`Email: ${personalInfo.email}`, 'output');
              addLine(`LinkedIn: ${personalInfo.linkedin}`, 'output');
              addLine(`GitHub: ${personalInfo.github}`, 'output');
              break;
            case 'resume.pdf':
              addLine('Opening resume... (This would open a PDF in a real system)', 'info');
              break;
            default:
              addLine(`cat: ${filename}: No such file or directory`, 'error');
          }
        } 
        // Handle cd command
        else if (cmd.startsWith('cd ')) {
          const dir = cmd.substring(3);
          if (dir === '~' || dir === '/home/user') {
            setCurrentPath('~');
            addLine('', 'output');
          } else if (dir === 'projects') {
            setCurrentPath('~/projects');
            addLine('', 'output');
          } else if (dir === 'skills') {
            setCurrentPath('~/skills');
            addLine('', 'output');
          } else {
            addLine(`cd: ${dir}: No such file or directory`, 'error');
          }
        } else {
          addLine(`Command not found: ${cmd}`, 'error');
          addLine('Type "help" for available commands', 'info');
        }
    }
    addLine('', 'output');
  };

  /**
   * Handle key press events
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isTyping && !bootSequence) {
      executeCommand(currentInput);
      setCurrentInput('');
    }
  };

  /**
   * Get appropriate color for terminal line type
   */
  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'command': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      case 'success': return 'text-green-400';
      case 'info': return 'text-cyan-400';
      default: return 'text-green-300';
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      {/* CRT Effect Overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 opacity-20">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/3 to-transparent"></div>
      </div>

      {/* Scanlines */}
      <div 
        className="fixed inset-0 pointer-events-none z-20 opacity-30"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)',
          animation: 'scanlines 0.1s linear infinite'
        }}
      ></div>

      {/* Terminal Window */}
      <div className="relative z-30 h-screen flex flex-col">
        {/* Terminal Header */}
        <div className="bg-gray-900 border-b border-green-500 p-2 sm:p-3 flex items-center space-x-2 sm:space-x-3 mt-16 sm:mt-0">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center space-x-2 text-green-400">
            <Terminal className="w-4 h-4" />
            <span className="text-sm">portfolio@terminal:~</span>
          </div>
          <div className="ml-auto flex items-center space-x-4 text-xs text-green-500">
            <div className="flex items-center space-x-1">
              <Monitor className="w-3 h-3" />
              <span className="hidden sm:inline">CRT Mode</span>
            </div>
            <div className="flex items-center space-x-1">
              <Cpu className="w-3 h-3" />
              <span className="hidden sm:inline">80x24</span>
            </div>
          </div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="flex-1 p-2 sm:p-3 md:p-4 overflow-y-auto bg-black/95 backdrop-blur-sm font-mono text-xs sm:text-sm md:text-base"
          style={{
            textShadow: '0 0 5px currentColor',
            filter: 'contrast(1.2) brightness(1.1)'
          }} 
        >
          {/* Terminal Lines */}
          {terminalLines.map((line) => (
            <div key={line.id} className={`${getLineColor(line.type)} leading-relaxed whitespace-pre-wrap break-words`}>
              {line.text}
            </div>
          ))}

          {/* Current Input Line */}
          {!bootSequence && (
            <div className="flex items-center text-green-400">
              <span className="text-yellow-400">{currentPath} $ </span>
              <input 
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-transparent border-none outline-none flex-1 text-green-400 ml-1 font-mono"
                style={{ textShadow: '0 0 5px currentColor' }}
                disabled={isTyping}
                autoFocus
              />
              {showCursor && !isTyping && (
                <span className="text-green-400 animate-pulse">█</span>
              )}
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="bg-gray-900 border-t border-green-500 p-1 sm:p-2 flex items-center justify-between text-xs text-green-500 font-mono">
          <div className="flex items-center space-x-4">
            <span>Section: {currentSection}</span>
            <span className="hidden sm:inline">Lines: {terminalLines.length}</span>
            <span className="hidden md:inline">Mode: Interactive</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline">Encoding: UTF-8</span>
            <span className="hidden md:inline">Shell: portfolio-sh</span>
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Online</span>
            </span>
          </div>
        </div>
      </div>

      {/* Quick Access Buttons (Hidden by default, shown on hover) */}
      <div className="fixed bottom-2 sm:bottom-4 left-2 sm:left-4 z-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="bg-gray-900/90 border border-green-500 rounded-lg p-2 sm:p-3 space-y-1 sm:space-y-2">
          <div className="text-xs text-green-400 mb-2 font-mono">Quick Commands:</div>
          <button
            onClick={() => executeCommand('about')}
            className="block w-full text-left text-xs text-green-300 hover:text-green-100 transition-colors font-mono py-0.5"
          >
            → about
          </button>
          <button
            onClick={() => executeCommand('projects')}
            className="block w-full text-left text-xs text-green-300 hover:text-green-100 transition-colors font-mono py-0.5"
          >
            → projects
          </button>
          <button
            onClick={() => executeCommand('skills')}
            className="block w-full text-left text-xs text-green-300 hover:text-green-100 transition-colors font-mono py-0.5"
          >
            → skills
          </button>
          <button
            onClick={() => executeCommand('contact')}
            className="block w-full text-left text-xs text-green-300 hover:text-green-100 transition-colors font-mono py-0.5"
          >
            → contact
          </button>
        </div>
      </div>

      {/* CSS for CRT effects */}
      <style jsx>{`
        @keyframes scanlines {
          0% { transform: translateY(0px); }
          100% { transform: translateY(3px); }
        }
        
        /* CRT flicker effect */
        @keyframes flicker {
          0%, 100% { opacity: 1.0; }
          50% { opacity: 0.97; }
        }
        
        /* Apply subtle flicker to the entire terminal */
        .terminal-container {
          animation: flicker 0.08s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default RetroTerminalTemplate;