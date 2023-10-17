export type Dictionary = {
  id: string;
  title: string;
  createdAt: Date;
  slug: string;
  themes?: Theme[];
};

export type Theme = {
  id: string;
  title: string;
  description: string;
  slug: string;
  image?: string;
  createdAt: Date;
  languageFrom: string;
  languageTo: string;
  dictionary: string;
  words?: Word[];
};

export type Word = {
  id: string;
  text: string;
  definition: string;
  textContext?: string;
  definitionContext?: string;
  createdAt: string;
  theme: string;
  image?: string;
  textAudioUrl?: string;
  definitionAudioUrl?: string;
};

export type User = {
  name: string;
  fallback: string;
};

export type Meta = {
  count: number;
};

export type SignData = {
  signature: string;
  timestamp: number;
  cloudname: string;
  apiKey: string;
  path: string;
};

export type SearchParams = {
  page: number;
  limit: number;
  searchQuery?: string;
};
