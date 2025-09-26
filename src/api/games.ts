import { getStore, setStore, generateId, GameSession } from '@/lib/store';

export interface Game {
  key: string;
  name: string;
  description: string;
  url: string;
  category: 'memory' | 'logic' | 'math' | 'strategy';
}

export const AVAILABLE_GAMES: Game[] = [
  {
    key: 'memory-game',
    name: 'Memory Challenge',
    description: 'Test your memory with this pattern matching game',
    url: 'https://www.mindgames.com/game/Memory',
    category: 'memory'
  },
  {
    key: 'logic-puzzle',
    name: 'Logic Puzzle',
    description: 'Solve complex logic puzzles to enhance reasoning',
    url: 'https://www.helpfulgames.com/subjects/brain-training/logic.html',
    category: 'logic'
  },
  {
    key: 'math-sprint',
    name: 'Math Sprint',
    description: 'Quick math challenges to boost calculation speed',
    url: 'https://www.mindgames.com/game/Math',
    category: 'math'
  },
  {
    key: 'strategy-chess',
    name: 'Chess Master',
    description: 'Play chess to develop strategic thinking',
    url: 'https://www.chess.com/play/computer',
    category: 'strategy'
  },
  {
    key: 'word-builder',
    name: 'Word Builder',
    description: 'Expand vocabulary with word building challenges',
    url: 'https://www.helpfulgames.com/subjects/word-games.html',
    category: 'logic'
  },
  {
    key: 'pattern-recognition',
    name: 'Pattern Recognition',
    description: 'Identify and complete visual patterns',
    url: 'https://www.mindgames.com/game/Pattern',
    category: 'logic'
  }
];

export function getGameHistory(userEmail?: string): GameSession[] {
  const store = getStore();
  if (userEmail) {
    return store.games
      .filter(g => g.userEmail === userEmail)
      .sort((a, b) => new Date(b.playedAt).getTime() - new Date(a.playedAt).getTime());
  }
  return store.games.sort((a, b) => new Date(b.playedAt).getTime() - new Date(a.playedAt).getTime());
}

export function saveGameSession(session: Omit<GameSession, 'id' | 'playedAt'>): GameSession {
  const store = getStore();
  const newSession: GameSession = {
    ...session,
    id: generateId(),
    playedAt: new Date().toISOString()
  };
  
  store.games.push(newSession);
  setStore(store);
  return newSession;
}

export function getGameByKey(key: string): Game | undefined {
  return AVAILABLE_GAMES.find(game => game.key === key);
}

export function getGameStats(userEmail: string) {
  const sessions = getGameHistory(userEmail);
  const totalGames = sessions.length;
  const totalTime = sessions.reduce((acc, s) => acc + s.seconds, 0);
  const avgScore = sessions.length > 0 
    ? sessions.reduce((acc, s) => acc + (s.score || 0), 0) / sessions.length 
    : 0;
  
  return {
    totalGames,
    totalTime,
    averageScore: Math.round(avgScore),
    favoriteCategory: getMostPlayedCategory(sessions)
  };
}

function getMostPlayedCategory(sessions: GameSession[]): string {
  const categoryCount: Record<string, number> = {};
  
  sessions.forEach(session => {
    const game = getGameByKey(session.gameKey);
    if (game) {
      categoryCount[game.category] = (categoryCount[game.category] || 0) + 1;
    }
  });
  
  return Object.entries(categoryCount)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'none';
}