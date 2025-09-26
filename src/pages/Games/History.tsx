import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Trophy, Calendar, TrendingUp, Filter } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { getGameHistory, getGameByKey, getGameStats } from '@/api/games';
import { format } from 'date-fns';

export function GameHistory() {
  const user = getCurrentUser();
  const [filter, setFilter] = useState<string>('all');
  
  if (!user) return null;

  const history = getGameHistory(user.email);
  const stats = getGameStats(user.email);
  
  const categories = ['all', ...Array.from(new Set(history.map(session => {
    const game = getGameByKey(session.gameKey);
    return game?.category || 'unknown';
  })))];

  const filteredHistory = filter === 'all' 
    ? history 
    : history.filter(session => {
        const game = getGameByKey(session.gameKey);
        return game?.category === filter;
      });

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Game History</h1>
          <p className="text-muted-foreground">Track your progress and performance over time</p>
        </div>
        
        <Link to="/games">
          <Button className="bg-gradient-primary hover:opacity-90">
            Play More Games
          </Button>
        </Link>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Games</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalGames}</div>
            <p className="text-xs text-muted-foreground">games completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(stats.totalTime / 60)}m
            </div>
            <p className="text-xs text-muted-foreground">time spent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.averageScore}</div>
            <p className="text-xs text-muted-foreground">performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorite</CardTitle>
            <Badge className={getCategoryColor(stats.favoriteCategory)}>
              {stats.favoriteCategory.charAt(0).toUpperCase() + stats.favoriteCategory.slice(1)}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {stats.favoriteCategory.charAt(0).toUpperCase() + stats.favoriteCategory.slice(1)}
            </div>
            <p className="text-xs text-muted-foreground">category</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(category)}
            >
              {category === 'all' ? 'All Games' : category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">No games played yet</h3>
                <p className="text-muted-foreground">
                  {filter === 'all' 
                    ? "Start playing games to see your history here!"
                    : `No ${filter} games played yet.`
                  }
                </p>
              </div>
              <Link to="/games">
                <Button className="bg-gradient-primary hover:opacity-90">
                  <Trophy className="w-4 h-4 mr-2" />
                  Start Playing
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          filteredHistory.map((session) => {
            const game = getGameByKey(session.gameKey);
            return (
              <Card key={session.id} className="hover:shadow-card transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{session.gameName}</h3>
                        {game && (
                          <Badge className={getCategoryColor(game.category)}>
                            {game.category}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(session.playedAt), 'MMM dd, yyyy HH:mm')}
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatDuration(session.seconds)}
                        </div>
                        
                        {session.score && (
                          <div className="flex items-center gap-1">
                            <Trophy className="w-4 h-4" />
                            Score: {session.score}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {game && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(game.url, '_blank')}
                        >
                          Play Again
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Performance Insights */}
      {history.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-medium">Recent Trend</h4>
                <p className="text-sm text-muted-foreground">
                  {history.length >= 5 
                    ? "You've been consistently active with brain training games!"
                    : "Keep playing to see more detailed insights about your progress."
                  }
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Recommendation</h4>
                <p className="text-sm text-muted-foreground">
                  {stats.favoriteCategory !== 'none'
                    ? `You excel at ${stats.favoriteCategory} games. Try exploring other categories to develop different cognitive skills.`
                    : "Try playing games from different categories to discover your strengths."
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}