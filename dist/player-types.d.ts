export interface PlayerStats {
    elo: number;
    matches: number;
    wins: number;
    losses: number;
    winRate: number;
    kd: number;
    hs: number;
}
export interface PlayerOutput {
    username: string;
    banReason: string | undefined;
    banExpires: Date | undefined;
    latestMatch: Date | undefined;
    country: string | undefined;
    stats: PlayerStats;
}
