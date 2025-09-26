import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Clock } from 'lucide-react';
import { Game } from '@/api/games';

interface GameTileProps {
  game: Game;
  onPlay: (game: Game) => void;
}

export function GameTile({ game, onPlay }: GameTileProps) {
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
    <Card className="group hover:shadow-elegant transition-all duration-200 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {game.name}
              </h3>
              <Badge className={getCategoryColor(game.category)}>
                {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
              </Badge>
            </div>
            <Clock className="w-5 h-5 text-muted-foreground" />
          </div>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            {game.description}
          </p>
          
          <div className="flex gap-2">
            <Button
              onClick={() => onPlay(game)}
              className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Play Game
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}