import { Debugger } from 'debug';
import Hero, { IHeroCreateOptions } from '@ulixee/hero';
import PQueue from 'p-queue';
import { getPlayer } from './player';
export * from './player-types';
export interface ScraperOptions {
    /**
     * The default timeout for web scraping events
     * @default 120000
     */
    timeout?: number;
    /**
     * Any overrides you directly want to set on the Hero instance
     */
    heroOverrides?: IHeroCreateOptions;
    /**
     * If true, a Hero core will run locally, rather than using a configured remote core
     * @default true
     */
    useLocalHero?: boolean;
    /**
     * The number of requests that can be run concurrently. Any extra will be queued.
     * @default 10
     */
    concurrency?: number;
    /**
     * A custom logger, if you don't want to use [debug](https://www.npmjs.com/package/debug)
     */
    logger?: (...args: any[]) => void;
}
export declare class EsportalScraper {
    protected heroOptions: IHeroCreateOptions;
    protected debug: Debugger;
    protected timeout: number;
    protected queue: PQueue;
    private useLocalHero;
    private Core?;
    private heroCore?;
    constructor(options?: ScraperOptions);
    shutdown(): Promise<void>;
    protected createHero(): Promise<Hero>;
    getPlayer(...args: Parameters<typeof getPlayer>): ReturnType<typeof getPlayer>;
}
