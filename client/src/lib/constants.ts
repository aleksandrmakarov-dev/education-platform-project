export type Dictionary = {
  name: string;
  themes: Theme[];
};

export type Theme = {
  name: string;
  description: string;
  count: string;
  createdBy: User;
  createdAt: string;
  tags: string[];
};

export type User = {
  name: string;
  fallback: string;
};

export const dictionariesMockData: Dictionary[] = [
  {
    name: "Finnish Language",
    themes: [
      {
        name: "Greetings",
        description: "Common greetings in Finnish",
        count: "100",
        createdBy: { name: "John Doe", fallback: "JD" },
        createdAt: "2023-09-22T12:00:00Z",
        tags: ["language", "greetings"],
      },
      {
        name: "Grammar Basics",
        description: "Foundational Finnish grammar rules",
        count: "200",
        createdBy: { name: "Alice Smith", fallback: "AS" },
        createdAt: "2023-09-21T10:30:00Z",
        tags: ["language", "grammar"],
      },
      {
        name: "Common Vocabulary",
        description: "Frequently used Finnish words",
        count: "500",
        createdBy: { name: "Robert Johnson", fallback: "RJ" },
        createdAt: "2023-09-20T14:15:00Z",
        tags: ["language", "vocabulary"],
      },
      {
        name: "Travel Phrases",
        description: "Useful phrases for travelers",
        count: "150",
        createdBy: { name: "Emma Brown", fallback: "EB" },
        createdAt: "2023-09-19T09:45:00Z",
        tags: ["language", "travel"],
      },
      {
        name: "Advanced Grammar",
        description: "Complex Finnish grammar rules",
        count: "300",
        createdBy: { name: "Michael Wilson", fallback: "MW" },
        createdAt: "2023-09-18T08:30:00Z",
        tags: ["language", "grammar"],
      },
      {
        name: "Common Expressions",
        description: "Everyday expressions in Finnish",
        count: "250",
        createdBy: { name: "Sophia Martin", fallback: "SM" },
        createdAt: "2023-09-17T15:00:00Z",
        tags: ["language", "expressions"],
      },
    ],
  },
  {
    name: "English Language",
    themes: [
      {
        name: "Basic Vocabulary",
        description: "Essential English words",
        count: "1000",
        createdBy: { name: "William Taylor", fallback: "WT" },
        createdAt: "2023-09-22T14:30:00Z",
        tags: ["language", "vocabulary"],
      },
      {
        name: "Common Phrases",
        description: "Frequently used English phrases",
        count: "300",
        createdBy: { name: "Olivia Davis", fallback: "OD" },
        createdAt: "2023-09-21T11:00:00Z",
        tags: ["language", "phrases"],
      },
      {
        name: "Idioms",
        description: "Well-known English idioms",
        count: "50",
        createdBy: { name: "James Clark", fallback: "JC" },
        createdAt: "2023-09-20T13:45:00Z",
        tags: ["language", "idioms"],
      },
    ],
  },
  {
    name: "Spanish Language",
    themes: [
      {
        name: "Numbers",
        description: "Counting in Spanish",
        count: "200",
        createdBy: { name: "Maria Rodriguez", fallback: "MR" },
        createdAt: "2023-09-19T12:15:00Z",
        tags: ["language", "numbers"],
      },
      {
        name: "Common Verbs",
        description: "Frequently used Spanish verbs",
        count: "400",
        createdBy: { name: "Carlos Perez", fallback: "CP" },
        createdAt: "2023-09-18T11:30:00Z",
        tags: ["language", "verbs"],
      },
      {
        name: "Travel Vocabulary",
        description: "Useful Spanish words for travelers",
        count: "150",
        createdBy: { name: "Ana Lopez", fallback: "AL" },
        createdAt: "2023-09-17T09:00:00Z",
        tags: ["language", "travel"],
      },
    ],
  },
  {
    name: "French Language",
    themes: [
      {
        name: "Greetings",
        description: "Common greetings in French",
        count: "100",
        createdBy: { name: "Lucas Martin", fallback: "LM" },
        createdAt: "2023-09-16T14:20:00Z",
        tags: ["language", "greetings"],
      },
      {
        name: "Verb Conjugation",
        description: "Conjugation of French verbs",
        count: "300",
        createdBy: { name: "Sophie Dupont", fallback: "SD" },
        createdAt: "2023-09-15T10:45:00Z",
        tags: ["language", "verbs"],
      },
      {
        name: "French Cuisine",
        description: "French culinary terms",
        count: "200",
        createdBy: { name: "Pierre Leclerc", fallback: "PL" },
        createdAt: "2023-09-14T09:30:00Z",
        tags: ["language", "cuisine"],
      },
      {
        name: "Historical Events",
        description: "Historical events in French history",
        count: "75",
        createdBy: { name: "Camille Moreau", fallback: "CM" },
        createdAt: "2023-09-13T11:10:00Z",
        tags: ["language", "history"],
      },
    ],
  },
  {
    name: "German Language",
    themes: [
      {
        name: "Travel Phrases",
        description: "Useful German phrases for travelers",
        count: "100",
        createdBy: { name: "Hans Müller", fallback: "HM" },
        createdAt: "2023-09-12T08:55:00Z",
        tags: ["language", "travel"],
      },
      {
        name: "Common Verbs",
        description: "Frequently used German verbs",
        count: "350",
        createdBy: { name: "Eva Schmidt", fallback: "ES" },
        createdAt: "2023-09-11T09:20:00Z",
        tags: ["language", "verbs"],
      },
      {
        name: "History and Culture",
        description: "German history and culture",
        count: "150",
        createdBy: { name: "Klaus Wagner", fallback: "KW" },
        createdAt: "2023-09-10T15:40:00Z",
        tags: ["language", "history"],
      },
      {
        name: "Business German",
        description: "German for business communication",
        count: "200",
        createdBy: { name: "Ingrid Becker", fallback: "IB" },
        createdAt: "2023-09-09T13:25:00Z",
        tags: ["language", "business"],
      },
    ],
  },
  // Add more dictionaries as needed
];
