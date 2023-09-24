export type Dictionary = {
  id: string;
  title: string;
  themes?: Theme[];
};

export type Theme = {
  id: string;
  title: string;
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

export const mockDelay = 2000;

// export const dictionariesMockData: Dictionary[] = [
//   {
//     id: "d1a8e3",
//     name: "Finnish Language",
//     themes: [
//       {
//         id: "t4b2e1",
//         name: "Greetings",
//         description: "Common greetings in Finnish",
//         count: "100",
//         createdBy: { name: "John Doe", fallback: "JD" },
//         createdAt: "2023-09-22T12:00:00Z",
//         tags: ["language", "greetings"],
//       },
//       {
//         id: "t8c7f6",
//         name: "Grammar Basics",
//         description: "Foundational Finnish grammar rules",
//         count: "200",
//         createdBy: { name: "Alice Smith", fallback: "AS" },
//         createdAt: "2023-09-21T10:30:00Z",
//         tags: ["language", "grammar"],
//       },
//       {
//         id: "t2d5a3",
//         name: "Common Vocabulary",
//         description: "Frequently used Finnish words",
//         count: "500",
//         createdBy: { name: "Robert Johnson", fallback: "RJ" },
//         createdAt: "2023-09-20T14:15:00Z",
//         tags: ["language", "vocabulary"],
//       },
//       {
//         id: "t7f8c5",
//         name: "Travel Phrases",
//         description: "Useful phrases for travelers",
//         count: "150",
//         createdBy: { name: "Emma Brown", fallback: "EB" },
//         createdAt: "2023-09-19T09:45:00Z",
//         tags: ["language", "travel"],
//       },
//       {
//         id: "t9e2b1",
//         name: "Advanced Grammar",
//         description: "Complex Finnish grammar rules",
//         count: "300",
//         createdBy: { name: "Michael Wilson", fallback: "MW" },
//         createdAt: "2023-09-18T08:30:00Z",
//         tags: ["language", "grammar"],
//       },
//       {
//         id: "t6d5e2",
//         name: "Common Expressions",
//         description: "Everyday expressions in Finnish",
//         count: "250",
//         createdBy: { name: "Sophia Martin", fallback: "SM" },
//         createdAt: "2023-09-17T15:00:00Z",
//         tags: ["language", "expressions"],
//       },
//     ],
//   },
//   {
//     id: "d2f4e5",
//     name: "English Language",
//     themes: [
//       {
//         id: "t1a3b5",
//         name: "Basic Vocabulary",
//         description: "Essential English words",
//         count: "1000",
//         createdBy: { name: "William Taylor", fallback: "WT" },
//         createdAt: "2023-09-22T14:30:00Z",
//         tags: ["language", "vocabulary"],
//       },
//       {
//         id: "t7d8e9",
//         name: "Common Phrases",
//         description: "Frequently used English phrases",
//         count: "300",
//         createdBy: { name: "Olivia Davis", fallback: "OD" },
//         createdAt: "2023-09-21T11:00:00Z",
//         tags: ["language", "phrases"],
//       },
//       {
//         id: "t5c2b4",
//         name: "Idioms",
//         description: "Well-known English idioms",
//         count: "50",
//         createdBy: { name: "James Clark", fallback: "JC" },
//         createdAt: "2023-09-20T13:45:00Z",
//         tags: ["language", "idioms"],
//       },
//     ],
//   },
//   {
//     id: "d3b7c1",
//     name: "Spanish Language",
//     themes: [
//       {
//         id: "t3e2f1",
//         name: "Numbers",
//         description: "Counting in Spanish",
//         count: "200",
//         createdBy: { name: "Maria Rodriguez", fallback: "MR" },
//         createdAt: "2023-09-19T12:15:00Z",
//         tags: ["language", "numbers"],
//       },
//       {
//         id: "t2g4h6",
//         name: "Common Verbs",
//         description: "Frequently used Spanish verbs",
//         count: "400",
//         createdBy: { name: "Carlos Perez", fallback: "CP" },
//         createdAt: "2023-09-18T11:30:00Z",
//         tags: ["language", "verbs"],
//       },
//       {
//         id: "t9a2l3",
//         name: "Travel Vocabulary",
//         description: "Useful Spanish words for travelers",
//         count: "150",
//         createdBy: { name: "Ana Lopez", fallback: "AL" },
//         createdAt: "2023-09-17T09:00:00Z",
//         tags: ["language", "travel"],
//       },
//     ],
//   },
//   {
//     id: "d4f6r8",
//     name: "French Language",
//     themes: [
//       {
//         id: "t4g8r2",
//         name: "Greetings",
//         description: "Common greetings in French",
//         count: "100",
//         createdBy: { name: "Lucas Martin", fallback: "LM" },
//         createdAt: "2023-09-16T14:20:00Z",
//         tags: ["language", "greetings"],
//       },
//       {
//         id: "t3s5d2",
//         name: "Verb Conjugation",
//         description: "Conjugation of French verbs",
//         count: "300",
//         createdBy: { name: "Sophie Dupont", fallback: "SD" },
//         createdAt: "2023-09-15T10:45:00Z",
//         tags: ["language", "verbs"],
//       },
//       {
//         id: "t2f9c1",
//         name: "French Cuisine",
//         description: "French culinary terms",
//         count: "200",
//         createdBy: { name: "Pierre Leclerc", fallback: "PL" },
//         createdAt: "2023-09-14T09:30:00Z",
//         tags: ["language", "cuisine"],
//       },
//       {
//         id: "t1h3i5",
//         name: "Historical Events",
//         description: "Historical events in French history",
//         count: "75",
//         createdBy: { name: "Camille Moreau", fallback: "CM" },
//         createdAt: "2023-09-13T11:10:00Z",
//         tags: ["language", "history"],
//       },
//     ],
//   },
//   {
//     id: "d5g6e7",
//     name: "German Language",
//     themes: [
//       {
//         id: "t8r9a3",
//         name: "Travel Phrases",
//         description: "Useful German phrases for travelers",
//         count: "100",
//         createdBy: { name: "Hans Müller", fallback: "HM" },
//         createdAt: "2023-09-12T08:55:00Z",
//         tags: ["language", "travel"],
//       },
//       {
//         id: "t7d4e5",
//         name: "Common Verbs",
//         description: "Frequently used German verbs",
//         count: "350",
//         createdBy: { name: "Eva Schmidt", fallback: "ES" },
//         createdAt: "2023-09-11T09:20:00Z",
//         tags: ["language", "verbs"],
//       },
//       {
//         id: "t6k5w8",
//         name: "History and Culture",
//         description: "German history and culture",
//         count: "150",
//         createdBy: { name: "Klaus Wagner", fallback: "KW" },
//         createdAt: "2023-09-10T15:40:00Z",
//         tags: ["language", "history"],
//       },
//       {
//         id: "t5b2i1",
//         name: "Business German",
//         description: "German for business communication",
//         count: "200",
//         createdBy: { name: "Ingrid Becker", fallback: "IB" },
//         createdAt: "2023-09-09T13:25:00Z",
//         tags: ["language", "business"],
//       },
//     ],
//   },
//   // Add more dictionaries as needed
// ];
