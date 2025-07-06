/**
 * Glassmorphism Template
 *
 * This template implements a glassmorphism design with frosted glass effects,
 * backdrop blur, and subtle transparency. Features floating background elements,
 * glass-like cards, and smooth hover transitions.
 */

import React from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Award,
  Users,
  Sparkles,
  Eye,
} from "lucide-react";
import { personalInfo, projects, skills } from "../../data/portfolio";

const GlassmorphismTemplate: React.FC = () => {
  // Group skills by category for organized display
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 text-gray-900 dark:text-white">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Large floating blob */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        {/* Medium floating blob */}
        <div
          className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-pink-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        {/* Small floating blob */}
        <div
          className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-purple-300/20 to-blue-300/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        {/* Glass card for header content */}
        <div className="backdrop-blur-md bg-white/20 dark:bg-gray-900/20 rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/30 dark:border-gray-700/30 shadow-2xl">
          <div className="text-center">
            <div className="mb-8">
              {/* Glass avatar */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-4 sm:mb-6 backdrop-blur-md bg-gradient-to-br from-white/30 to-white/10 dark:from-gray-800/30 dark:to-gray-800/10 rounded-full border border-white/40 dark:border-gray-600/40 flex items-center justify-center shadow-xl">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {personalInfo.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {personalInfo.name}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-1 sm:mb-2 font-light">
                {personalInfo.title}
              </p>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 md:mb-8">
                {personalInfo.education}
              </p>
            </div>

            {/* Glass contact buttons */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="backdrop-blur-md bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-700 dark:text-blue-300 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center space-x-2 mb-2 sm:mb-0"
              >
                <Mail className="w-5 h-5" />
                <span>Contact</span>
              </a>
              <a
                href={`https://${personalInfo.linkedin}`}
                className="backdrop-blur-md bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 text-purple-700 dark:text-purple-300 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center space-x-2 mb-2 sm:mb-0"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`https://${personalInfo.github}`}
                className="backdrop-blur-md bg-gray-500/20 hover:bg-gray-500/30 border border-gray-400/30 text-gray-700 dark:text-gray-300 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center space-x-2"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="backdrop-blur-md bg-white/15 dark:bg-gray-900/15 rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/25 dark:border-gray-700/25 shadow-2xl">
          <div className="backdrop-blur-md bg-white/15 dark:bg-gray-900/15 rounded-3xl p-12 border border-white/25 dark:border-gray-700/25 shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                {personalInfo.bio}
              </p>
            </div>

            {/* Stats with glass cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <div className="text-center backdrop-blur-md bg-white/20 dark:bg-gray-800/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/30 dark:border-gray-600/30">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 backdrop-blur-md bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full flex items-center justify-center border border-blue-400/40">
                  <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">
                  4+
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Years Experience
                </p>
              </div>
              <div className="text-center backdrop-blur-md bg-white/20 dark:bg-gray-800/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/30 dark:border-gray-600/30">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 backdrop-blur-md bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full flex items-center justify-center border border-purple-400/40">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1 sm:mb-2">
                  50+
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Projects Completed
                </p>
              </div>
              <div className="text-center backdrop-blur-md bg-white/20 dark:bg-gray-800/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/30 dark:border-gray-600/30">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 backdrop-blur-md bg-gradient-to-br from-pink-500/30 to-orange-500/30 rounded-full flex items-center justify-center border border-pink-400/40">
                  <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-pink-600 dark:text-pink-400 mb-1 sm:mb-2">
                  ∞
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Creative Solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Showcasing innovative solutions that blend creativity with
            cutting-edge technology
          </p>
        </div>

        {/* Project cards with glass effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group backdrop-blur-md bg-white/15 dark:bg-gray-900/15 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-white/25 dark:border-gray-700/25 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Quick action buttons on hover */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="flex space-x-2">
                    {project.link && (
                      <a
                        href={project.link}
                        className="backdrop-blur-md bg-white/20 p-2 rounded-full border border-white/30 hover:bg-white/30 transition-colors"
                      >
                        <Eye className="w-4 h-4 text-white" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        className="backdrop-blur-md bg-white/20 p-2 rounded-full border border-white/30 hover:bg-white/30 transition-colors"
                      >
                        <Github className="w-4 h-4 text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <span className="hidden sm:inline-block backdrop-blur-md bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300 border border-blue-400/30 capitalize">
                    {project.category}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {project.description}
                </p>

                {/* Technology tags */}
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="backdrop-blur-md bg-white/20 dark:bg-gray-800/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 border border-white/30 dark:border-gray-600/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project links */}
                <div className="flex space-x-4">
                  {project.link && (
                    <a
                      href={project.link}
                      className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">View Live</span>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm font-medium">Source Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="backdrop-blur-md bg-white/15 dark:bg-gray-900/15 rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/25 dark:border-gray-700/25 shadow-2xl">
          <div className="backdrop-blur-md bg-white/15 dark:bg-gray-900/15 rounded-3xl p-12 border border-white/25 dark:border-gray-700/25 shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Skills & Expertise
              </h2>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                A comprehensive toolkit for building modern, scalable
                applications
              </p>
            </div>

            {/* Skills grid with glass cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {Object.entries(groupedSkills).map(
                ([category, categorySkills]) => (
                  <div
                    key={category}
                    className="backdrop-blur-md bg-white/20 dark:bg-gray-800/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/30 dark:border-gray-600/30 hover:bg-white/25 dark:hover:bg-gray-800/25 transition-all duration-300"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 capitalize text-center">
                      {category.replace("-", " ")}
                    </h3>
                    <div className="space-y-4">
                      {categorySkills.map((skill) => (
                        <div key={skill.name} className="group">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                              {skill.name}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {skill.level}%
                            </span>
                          </div>
                          {/* Glass progress bar */}
                          <div className="w-full backdrop-blur-md bg-white/30 dark:bg-gray-700/30 rounded-full h-2 border border-white/40 dark:border-gray-600/40">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500 group-hover:from-purple-500 group-hover:to-pink-500"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="backdrop-blur-md bg-white/15 dark:bg-gray-900/15 rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/25 dark:border-gray-700/25 shadow-2xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Let's Create Something Amazing
            </h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto">
              Ready to bring your vision to life? Let's collaborate and build
              something extraordinary together.
            </p>

            {/* Glass contact button */}
            <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
              <a
                href={`mailto:${personalInfo.email}`}
                className="backdrop-blur-md bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-400/30 text-blue-700 dark:text-blue-300 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center space-x-2 sm:space-x-3 text-base sm:text-lg font-semibold"
              >
                <Mail className="w-6 h-6" />
                <span>Start a Conversation</span>
              </a>
            </div>

            {/* Glass location badge */}
            <div className="backdrop-blur-md bg-white/20 dark:bg-gray-800/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/30 dark:border-gray-600/30 inline-block">
              <p className="text-gray-600 dark:text-gray-400">
                📍 {personalInfo.location}
              </p>
            </div>
          </div>
        </section>
      </section>

      {/* Footer */}
    </div>
  );
};

export default GlassmorphismTemplate;
