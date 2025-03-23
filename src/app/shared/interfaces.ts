export interface Player {
    id: number;
    number: number;
    firstName: string;
    lastName: string;
    photoUrl: string;
    position?: string;
  }
  
  export interface Position {
    id: string;
    x: number;
    y: number;
    occupied: boolean;
    playerId?: number;
  }