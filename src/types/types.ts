export enum GameState {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  END = 'END',
}

export interface GameObjective {
  name: string;
  maxHealth: number;
  image: string;
}
