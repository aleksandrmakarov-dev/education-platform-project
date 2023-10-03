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
  dictionary: string;
  words?: Word[];
};

export type Word = {
  id: string;
  text: string;
  translation: string;
  context?: string;
  contextTranslation?: string;
  createdAt: string;
  theme: string;
  image?: string;
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
