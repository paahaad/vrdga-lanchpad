'use client'
import React, { useState } from 'react';
import { Filter, Star, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link'

// Sample data for upcoming launches
const launchesData = [
  {
    id: 1,
    name: 'MetaVerse Protocol',
    description: 'Next-gen virtual reality ecosystem on blockchain',
    image: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    raised: '2.4M',
    goal: '5M',
    price: '0.08',
    startDate: 'Jun 15, 2025',
    endDate: 'Jun 30, 2025',
    status: 'upcoming',
    category: 'GameFi',
    progress: 48,
  },
  {
    id: 2,
    name: 'DecentraLend',
    description: 'Decentralized lending protocol with AI credit scoring',
    image: 'https://images.pexels.com/photos/7876429/pexels-photo-7876429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    raised: '1.8M',
    goal: '3M',
    price: '0.12',
    startDate: 'Jun 10, 2025',
    endDate: 'Jun 25, 2025',
    status: 'upcoming',
    category: 'DeFi',
    progress: 60,
  },
  {
    id: 3,
    name: 'GreenChain',
    description: 'Carbon offset marketplace with transparent tracking',
    image: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    raised: '1.2M',
    goal: '2.5M',
    price: '0.05',
    startDate: 'Jun 20, 2025',
    endDate: 'Jul 10, 2025',
    status: 'upcoming',
    category: 'GreenTech',
    progress: 48,
  },
  {
    id: 4,
    name: 'CryptoHealth',
    description: 'Healthcare data management on blockchain',
    image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    raised: '1.5M',
    goal: '4M',
    price: '0.10',
    startDate: 'Jun 25, 2025',
    endDate: 'Jul 15, 2025',
    status: 'upcoming',
    category: 'HealthTech',
    progress: 38,
  },
];

const categories = [
  'All',
  'DeFi',
  'GameFi',
  'GreenTech',
  'HealthTech',
  'Infrastructure',
];

const ProjectCard = ({ project }: { project: typeof launchesData[0] }) => {
  return (
    <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden transition-all hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-500/30">
      <div className="h-48 overflow-hidden relative">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-purple-500/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
            {project.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-xl">{project.name}</h3>
          <button className="text-gray-400 hover:text-yellow-400 transition-colors">
            <Star className="h-5 w-5" />
          </button>
        </div>
        <p className="text-gray-400 text-sm mb-4">{project.description}</p>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">
              {project.raised} / {project.goal} USDC
            </span>
            <span className="text-purple-400">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-400 block">Token Price</span>
            <span className="font-medium">{project.price} USDC</span>
          </div>
          <div>
            <span className="text-gray-400 block">Launch Date</span>
            <span className="font-medium">{project.startDate}</span>
          </div>
        </div>

        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition-all flex items-center justify-center">
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const UpcomingLaunches = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects =
    activeCategory === 'All'
      ? launchesData
      : launchesData.filter((project) => project.category === activeCategory);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center">
              <Calendar className="h-8 w-8 mr-3 text-purple-400" />
              Upcoming Launches
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Discover and participate in the most promising token launches
              before they hit the market.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex items-center space-x-2 overflow-x-auto pb-2 max-w-full">
            <Filter className="h-5 w-5 text-purple-400 mr-1" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/project">
            <button className="inline-flex items-center px-6 py-3 border border-purple-500 rounded-lg text-purple-400 hover:bg-purple-500/10 transition-colors">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export { UpcomingLaunches };