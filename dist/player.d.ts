import { PlayerOutput } from './player-types';
import { EsportalScraper } from './index';
export declare function getPlayer(this: EsportalScraper, steamID: string | bigint): Promise<PlayerOutput>;
