/* eslint-disable camelcase */

export interface PlayerStats {
  elo: number;
  rankLocked: boolean;
  matches: number;
  wins: number;
  losses: number;
  winRate: number;
  kd: number;
  hs: number;
}

export interface PlayerOutput {
  username: string;
  banned: boolean;
  banReason: string | undefined;
  banExpires: Date | undefined;
  banInserted: Date | undefined;
  latestMatch: Date | undefined;
  country: string | undefined;
  stats: PlayerStats;
}

export interface MatchOutput {
  team1: string[];
  team2: string[];
}
