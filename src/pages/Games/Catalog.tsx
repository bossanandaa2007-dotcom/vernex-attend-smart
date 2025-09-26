import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GameTile } from '@/components/GameTile';
import { Trophy, Clock, TrendingUp } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { AVAILABLE_GAMES, getGameStats, Game } from '@/api/games';

export function GamesCatalog() {
  const user = getCurrentUser();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  if (!user) return null;

  const stats = getGameStats(user.email);
  const categories = ['all', ...Array.from(new Set(AVAILABLE_GAMES.map(game => game.category)))];
  
  const filteredGames = selectedCategory === 'all' 
    ? AVAILABLE_GAMES 
    : AVAILABLE_GAMES.filter(game => game.category === selectedCategory);

  const handlePlayGame = (game: Game) => {
    // Open game in new tab and navigate to play page
    window.open(game.url, '_blank');
    // Store that we're playing this game for timing
    localStorage.setItem('vernex_current_game', JSON.stringify({
      key: game.key,
      name: game.name,
      startTime: Date.now()
    }));
    // Navigate to play page for timer
    window.location.href = `/games/play/${game.key}`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'memory': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'logic': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'math': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'strategy': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">IQ Games</h1>
        <p className="text-muted-foreground">Challenge your mind with these brain training games</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Games Played</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalGames}</div>
            <p className="text-xs text-muted-foreground">
              Total games completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.averageScore}</div>
            <p className="text-xs text-muted-foreground">
              Performance average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(stats.totalTime / 60)}m
            </div>
            <p className="text-xs text-muted-foreground">
              Total play time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? '' : 'hover:bg-accent'}
          >
            {category === 'all' ? 'All Games' : (
              <Badge variant="secondary" className={getCategoryColor(category)}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Games Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGames.map((game) => (
          <GameTile key={game.key} game={game} onPlay={handlePlayGame} />
        ))}
      </div>

      {filteredGames.length === 0 && (
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">No games found</h3>
              <p className="text-muted-foreground">
                No games match your current filter selection.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">1</span>
                Choose a Game
              </h4>
              <p className="text-muted-foreground">Select from our curated collection of brain training games.</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">2</span>
                Play & Learn
              </h4>
              <p className="text-muted-foreground">The game opens in a new tab. Play at your own pace.</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">3</span>
                Track Progress
              </h4>
              <p className="text-muted-foreground">Return here to log your completion and track your progress.</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">4</span>
                View Analytics
              </h4>
              <p className="text-muted-foreground">Monitor your improvement over time in your game history.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}