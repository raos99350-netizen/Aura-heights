export interface RoomType {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: Date;
}

export enum AppSection {
  HOME = 'home',
  ROOMS = 'rooms',
  AMENITIES = 'amenities',
  CONTACT = 'contact'
}