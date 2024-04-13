import Hero from '@ulixee/hero';
import { MatchOutput } from './player-types';
import { EsportalScraper } from './index';

const steamID3toSteamID64 = (steamID3: string): string => {
  steamID3 = steamID3.split(':')[2].split(']')[0];
  return (BigInt(steamID3) + BigInt(76561197960265728n)).toString();
};

async function fetch(hero: Omit<Hero, 'then'>, url: string): Promise<any> {
  const fetchResponse = await hero.fetch(url);
  // Check for page error
  const statusCode = await fetchResponse.status;
  if (statusCode !== 200) {
    throw new Error(`${url} returned a non-200 response: ${statusCode}`);
  }
  return fetchResponse.json();
}

export async function getMatch(this: EsportalScraper, matchID: string): Promise<MatchOutput> {
  const hero = await this.createHero();
  try {
    const origin = 'https://esportal.com';
    const matchUrl = `${origin}/api/match/get?_=${Date.now()}&id=${matchID}`;

    this.debug(`Going to ${origin}`);
    await hero.goto(`${origin}/en/match/${matchID}`, { timeoutMs: this.timeout });

    this.debug(`Fetching ${matchUrl}`);
    const match = await fetch(hero, matchUrl);

    const players = match.players.map((player: any) => {
      return {
        id: player.id,
        team: player.team,
      };
    });
    const team1 = players
      .filter((player: any) => player.team === 1)
      .map((player: any) => steamID3toSteamID64(`[U:1:${player.id}]`));
    const team2 = players
      .filter((player: any) => player.team === 2)
      .map((player: any) => steamID3toSteamID64(`[U:1:${player.id}]`));

    await hero.close();
    return {
      team1,
      team2,
    };
  } catch (err) {
    await hero.close();
    throw err;
  }
}
