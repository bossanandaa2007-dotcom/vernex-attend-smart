import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Clock, Trophy, Save } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { getGameByKey, saveGameSession } from '@/api/games';
import { useToast } from '@/hooks/use-toast';

export function PlayGame() {
  const { gameKey } = useParams<{ gameKey: string }>();
  const user = getCurrentUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [startTime, setStartTime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [score, setScore] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  if (!user || !gameKey) return null;

  const game = getGameByKey(gameKey);
  if (!game) {
    return (
      <div className="space-y-6">
        <Link to="/games">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Games
          </Button>
        </Link>
        <Card className="p-12 text-center">
          <h3 className="text-lg font-medium">Game not found</h3>
          <p className="text-muted-foreground mt-2">The game you're looking for doesn't exist.</p>
        </Card>
      </div>
    );
  }

  useEffect(() => {
    // Check if there's a current game session
    const currentGame = localStorage.getItem('vernex_current_game');
    if (currentGame) {
      try {
        const gameData = JSON.parse(currentGame);
        if (gameData.key === gameKey) {
          setStartTime(gameData.startTime);
        }
      } catch (error) {
        console.warn('Failed to parse current game data');
      }
    }

    if (!startTime) {
      setStartTime(Date.now());
    }

    // Update timer every second
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, [gameKey, startTime]);

  const elapsedSeconds = startTime > 0 ? Math.floor((currentTime - startTime) / 1000) : 0;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleComplete = async () => {
    if (elapsedSeconds === 0) return;

    setIsSaving(true);
    try {
      await saveGameSession({
        userEmail: user.email,
        gameKey: game.key,
        gameName: game.name,
        seconds: elapsedSeconds,
        score: score ? parseInt(score) : undefined
      });

      // Clear current game from localStorage
      localStorage.removeItem('vernex_current_game');

      toast({
        title: "Game completed!",
        description: `Your progress has been saved. Time: ${formatTime(elapsedSeconds)}${score ? `, Score: ${score}` : ''}`
      });

      setIsCompleted(true);
      
      // Navigate to history after a short delay
      setTimeout(() => {
        navigate('/games/history');
      }, 2000);

    } catch (error) {
      toast({
        title: "Save failed",
        description: "There was an error saving your game progress. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleRestart = () => {
    setStartTime(Date.now());
    setCurrentTime(Date.now());
    setScore('');
    setIsCompleted(false);
    
    // Save new game session to localStorage
    localStorage.setItem('vernex_current_game', JSON.stringify({
      key: game.key,
      name: game.name,
      startTime: Date.now()
    }));
    
    // Reopen the game
    window.open(game.url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link to="/games">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Games
        </Button>
      </Link>

      {/* Game Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{game.name}</span>
            <div className="flex items-center gap-2 text-lg font-mono">
              <Clock className="w-5 h-5" />
              {formatTime(elapsedSeconds)}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{game.description}</p>
          
          {!isCompleted ? (
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  The game is open in a new tab. Return here when you finish playing.
                </p>
                <Button 
                  onClick={() => window.open(game.url, '_blank')} 
                  variant="outline"
                  size="sm"
                >
                  Reopen Game
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="score">Final Score (Optional)</Label>
                  <Input
                    id="score"
                    type="number"
                    placeholder="Enter your score..."
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    min="0"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleComplete}
                    disabled={isSaving}
                    className="bg-gradient-primary hover:opacity-90"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Finish & Save Progress'}
                  </Button>
                  
                  <Button
                    onClick={handleRestart}
                    variant="outline"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Restart Timer
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                  Game Completed!
                </h3>
                <div className="space-y-1 text-sm text-green-700 dark:text-green-300">
                  <p>Time: {formatTime(elapsedSeconds)}</p>
                  {score && <p>Score: {score}</p>}
                  <p className="mt-3">Redirecting to game history...</p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How to Play</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">🎮 Playing</h4>
              <p className="text-muted-foreground">
                The game opens in a new browser tab. Play normally and complete the challenges.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">⏱️ Timing</h4>
              <p className="text-muted-foreground">
                Your timer started when you clicked "Play Game". We track your total time automatically.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">🏆 Scoring</h4>
              <p className="text-muted-foreground">
                Enter your final score (if the game provides one) to track your improvement over time.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">💾 Saving</h4>
              <p className="text-muted-foreground">
                Click "Finish & Save Progress" when done to log your session and view it in your history.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}