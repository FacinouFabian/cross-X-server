type Player = {
  name: string;
  points: number;
  isLeader: boolean;
};

type Game = {
  id: string;
  themeId: number;
  players: Player[];
  state: string;
  isEnded: boolean;
  round: number;
};

const games: Game[] = [
  {
    id: "fbjhfbdjklfjdlk-5120qs",
    themeId: 2,
    players: [
      {
        name: "fabian",
        points: 0,
        isLeader: true,
      },
      {
        name: "eddy",
        points: 0,
        isLeader: false,
      },
    ],
    state: "waiting",
    isEnded: false,
    round: 0,
  },
];

export default games;
