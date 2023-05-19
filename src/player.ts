import Hero from '@ulixee/hero';
import { PlayerOutput } from './player-types';
import { EsportalScraper } from './index';
import {esportalCountries} from "./constats";

async function fetch(hero: Omit<Hero, 'then'>, url: string): Promise<any> {
  const fetchResponse = await hero.fetch(url);
  // Check for page error
  const statusCode = await fetchResponse.status;
  if (statusCode !== 200) {
    throw new Error(`${url} returned a non-200 response: ${statusCode}`);
  }
  return fetchResponse.json();
}

const matchSteamID64 = (id: string): boolean => {
  return /^7656119\d{10}$/.test(id);
};

const steamID64toSteamID3 = (steamID64: string): string => {
  return (BigInt(steamID64) - BigInt(76561197960265728n)).toString();
};

export async function getPlayer(
  this: EsportalScraper,
  steamID: string | bigint
): Promise<PlayerOutput> {
  const hero = await this.createHero();
  try {
    if(matchSteamID64(steamID.toString())) steamID = steamID64toSteamID3(steamID.toString());

    let origin = 'https://esportal.com';
    let userUrl = `${origin}/api/user_profile/get?_=${Date.now()}&id=${steamID}&bans=1`;
    let latestMatchUrl = `${origin}/api/user_profile/get_latest_matches?_=${Date.now()}&id=${steamID}&page=1&v=2`;

    this.debug(`Going to ${origin}`);
    const originResponse = await hero.goto(origin, { timeoutMs: this.timeout });
    const statusCode = originResponse.response.statusCode;

    this.debug(`Fetching ${userUrl}`);
    const user = await fetch(hero, userUrl);

    this.debug(`Fetching ${latestMatchUrl}`);
    const latestMatch = await fetch(hero, latestMatchUrl);

    await hero.close();
    return {
      username: user.username,
      banReason: user.ban?.reason,
      banExpires: user.ban?.expires ? new Date(user.ban.expires * 1000) : undefined,
      latestMatch: latestMatch ? new Date(latestMatch[0].inserted * 1000) : undefined,
      stats: {
        elo: user.elo,
        matches: user.wins + user.losses,
        wins: user.wins,
        losses: user.losses,
        winRate: Math.round((user.wins / (user.wins + user.losses)) * 100),
        kd: parseFloat((user.kills / user.deaths).toFixed(2)),
        hs: Math.round((user.headshots / user.kills) * 100),
      },
      country: user.country_id ? esportalCountries[user.country_id.toString()] : undefined,
    };

  } catch (err) {
    await hero.close();
    throw err;
  }
}
