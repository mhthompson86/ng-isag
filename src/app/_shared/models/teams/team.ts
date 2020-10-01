import { Player } from '../player';

export class Team {
  _id: string;
  year: number;

  playerA: Player;
  playerB: Player;
  constructor(year: number) {
    this.year = year;
    this.playerA = new Player('A', 'Player');
    this.playerB = new Player('B',  'Player');
  }
}
