export interface Hackathon {
  id: string;
  name: string;
  theme: string;
  description: string;
  registrationDeadline: string;
  eventDate: string;
  prizePool: string;
  isOnline: boolean;
  location: string;
  organizer: string;
  website: string;
  skills: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  logo?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  skills: string[];
  interests: string[];
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  avatar?: string;
  savedHackathons: string[];
}

export interface AIRecommendation {
  hackathonId: string;
  matchPercentage: number;
  reason: string;
}
