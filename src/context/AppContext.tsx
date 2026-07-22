import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, Hackathon, AIRecommendation } from '../types';
import { hackathons } from '../data/mockData';

interface AppContextType {
  user: User | null;
  isLoggedIn: boolean;
  savedHackathons: Hackathon[];
  allHackathons: Hackathon[];
  recommendations: AIRecommendation[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  saveHackathon: (id: string) => void;
  unsaveHackathon: (id: string) => void;
  isSaved: (id: string) => boolean;
  updateUser: (updates: Partial<User>) => void;
}

const defaultUser: User = {
  id: '1',
  name: 'Alex Developer',
  email: 'alex@example.com',
  skills: ['React', 'TypeScript', 'Node.js', 'Python'],
  interests: ['Web Development', 'Artificial Intelligence', 'Open Source'],
  experienceLevel: 'Intermediate',
  avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
  savedHackathons: ['1', '5'],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('hackhub_user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const savedUser = localStorage.getItem('hackhub_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    if (email && password.length >= 6) {
      setUser({ ...defaultUser, email });
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string): boolean => {
    if (name && email && password.length >= 6) {
      setUser({ ...defaultUser, name, email });
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('hackhub_user');
  };

  const saveHackathon = (id: string) => {
    if (user && !user.savedHackathons.includes(id)) {
      const updatedUser = {
        ...user,
        savedHackathons: [...user.savedHackathons, id],
      };
      setUser(updatedUser);
    }
  };

  const unsaveHackathon = (id: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        savedHackathons: user.savedHackathons.filter(hId => hId !== id),
      };
      setUser(updatedUser);
    }
  };

  const isSaved = (id: string): boolean => {
    return user?.savedHackathons.includes(id) || false;
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const getRecommendations = (): AIRecommendation[] => {
    if (!user) return [];

    return hackathons.map(hackathon => {
      const userSkills = user.skills.map(s => s.toLowerCase());
      const hackathonSkills = hackathon.skills.map(s => s.toLowerCase());
      const userInterests = user.interests.map(i => i.toLowerCase());
      const hackathonTags = hackathon.tags.map(t => t.toLowerCase());

      const skillMatches = hackathonSkills.filter(skill =>
        userSkills.some(userSkill => userSkill.includes(skill) || skill.includes(userSkill))
      ).length;

      const interestMatches = hackathonTags.filter(tag =>
        userInterests.some(interest => interest.includes(tag) || tag.includes(interest))
      ).length;

      const totalPossible = hackathonSkills.length + hackathonTags.length;
      const totalMatches = skillMatches + interestMatches;

      let matchPercentage = Math.min(95, Math.round((totalMatches / totalPossible) * 100));
      if (matchPercentage < 30) matchPercentage = 30 + Math.floor(Math.random() * 20);

      const reasons = [
        `Matches your ${user.skills.slice(0, 2).join(' and ')} skills`,
        `Aligns with your interest in ${user.interests[0]}`,
        `Perfect for ${user.experienceLevel} level developers`,
        `Similar hackathons you've saved before`,
        `Trending in your areas of expertise`,
      ];

      return {
        hackathonId: hackathon.id,
        matchPercentage,
        reason: reasons[Math.floor(Math.random() * reasons.length)],
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);
  };

  const savedHackathonsList = user
    ? hackathons.filter(h => user.savedHackathons.includes(h.id))
    : [];

  return (
    <AppContext.Provider
      value={{
        user,
        isLoggedIn,
        savedHackathons: savedHackathonsList,
        allHackathons: hackathons,
        recommendations: getRecommendations(),
        login,
        register,
        logout,
        saveHackathon,
        unsaveHackathon,
        isSaved,
        updateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
