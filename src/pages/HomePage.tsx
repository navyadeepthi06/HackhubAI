import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import SearchBar from '../components/SearchBar';
import HackathonCard from '../components/HackathonCard';
import {
  Trophy,
  Sparkles,
  Clock,
  Users,
  Zap,
  ArrowRight,
  Star,
  TrendingUp,
  Shield,
  Code2,
  Rocket,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

const HomePage: React.FC = () => {
  const { allHackathons } = useApp();
  const navigate = useNavigate();

  const featuredHackathons = allHackathons.slice(0, 3);

  const handleSearch = (query: string) => {
    navigate(`/hackathons?search=${encodeURIComponent(query)}`);
  };

  const stats = [
    { label: 'Active Hackathons', value: '1,200+', icon: Trophy, change: '+12%' },
    { label: 'Developers Joined', value: '50K+', icon: Users, change: '+28%' },
    { label: 'AI Matches Made', value: '100K+', icon: Sparkles, change: '+45%' },
    { label: 'Prizes Won', value: '$2M+', icon: Star, change: '+18%' },
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Recommendations',
      description: 'Get personalized hackathon suggestions based on your skills and interests with our advanced matching algorithm.',
      color: 'from-violet-500 to-purple-600',
      shadowColor: 'shadow-violet-500/30',
    },
    {
      icon: Clock,
      title: 'Smart Reminders',
      description: 'Never miss a deadline with intelligent countdown timers and push notifications.',
      color: 'from-blue-500 to-cyan-500',
      shadowColor: 'shadow-blue-500/30',
    },
    {
      icon: Lightbulb,
      title: 'Project Ideas Generator',
      description: 'Struggling with ideas? Let AI generate innovative project concepts tailored to each hackathon.',
      color: 'from-amber-500 to-orange-500',
      shadowColor: 'shadow-amber-500/30',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Full-Stack Developer',
      content: 'HackHub AI helped me find the perfect hackathons for my skill level. The AI recommendations were spot-on!',
      avatar: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      name: 'Marcus Johnson',
      role: 'ML Engineer',
      content: 'The countdown timers and reminders saved me from missing deadlines. Won my first hackathon thanks to this!',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      content: 'Love the AI project ideas feature. It gave me inspiration when I was stuck on the creative part.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
  ];

  return (
    <div className="min-h-screen bg-mesh">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl animate-float delay-300" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl animate-float delay-500" />

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700 shadow-lg mb-8 animate-fade-in-down">
              <div className="relative flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-violet-500" />
                <span className="text-sm font-medium bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                  AI-Powered Hackathon Discovery
                </span>
              </div>
              <div className="w-px h-4 bg-slate-300 dark:bg-slate-600" />
              <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Live Platform
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 animate-fade-in-up">
              <span className="block">Welcome to</span>
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                  HackHub AI
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-600/20 via-violet-600/20 to-purple-600/20 blur-xl" />
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
              Discover, Track, and Prepare for Hackathons with AI
              <span className="hidden md:inline"> — your personal hackathon assistant that finds the perfect events for your skills.</span>
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-10 animate-fade-in-up delay-300">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search hackathons by name, theme, technology..."
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-400">
              <Link
                to="/hackathons"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 text-white rounded-2xl font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 btn-premium"
              >
                <Trophy className="w-5 h-5" />
                <span>Explore Hackathons</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/recommendations"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl font-semibold text-lg hover:border-violet-300 dark:hover:border-violet-600 hover:bg-slate-50 dark:hover:bg-slate-700 hover:shadow-lg transition-all duration-300"
              >
                <Sparkles className="w-5 h-5 text-violet-500" />
                <span>Get AI Recommendations</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 flex items-center justify-center gap-6 text-slate-400 dark:text-slate-500 text-sm animate-fade-in-up delay-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Secure Platform</span>
              </div>
              <div className="w-px h-4 bg-slate-300 dark:bg-slate-600" />
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>10,000+ Users</span>
              </div>
              <div className="w-px h-4 bg-slate-300 dark:bg-slate-600" />
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>4.9 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-y border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="card p-6 text-center card-hover">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change} this month
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hackathons */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
                <Trophy className="w-4 h-4" />
                Featured Events
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                Top Trending Hackathons
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                Discover the most popular hackathons handpicked by our AI based on prize pools, participation, and industry relevance.
              </p>
            </div>
            <Link
              to="/hackathons"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHackathons.map((hackathon, index) => (
              <div
                key={hackathon.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <HackathonCard hackathon={hackathon} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              Powerful Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose HackHub AI?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              We combine cutting-edge AI technology with comprehensive hackathon data to help you find and prepare for the perfect event.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity`} />

                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 shadow-lg ${feature.shadowColor} group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Loved by Developers
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              See what developers are saying about HackHub AI and how it helped them in their hackathon journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-700"
                  />
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 p-8 md:p-16 shadow-2xl shadow-blue-500/30">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            {/* Floating Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float delay-300" />

            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
                <Rocket className="w-4 h-4" />
                Start Your Journey
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Find Your Next Hackathon?
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
                Join thousands of developers who use HackHub AI to discover, track, and prepare for hackathons worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/hackathons"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold hover:bg-blue-50 hover:shadow-lg transition-all"
                >
                  <Trophy className="w-5 h-5" />
                  Browse All Hackathons
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 rounded-2xl font-semibold hover:bg-white/30 transition-all"
                >
                  <Code2 className="w-5 h-5" />
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                HackHub AI
              </span>
            </div>
            <div className="text-slate-600 dark:text-slate-400 text-sm">
              © 2024 HackHub AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
