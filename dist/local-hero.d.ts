import DefaultHero, { IHeroCreateOptions } from '@ulixee/hero';
import type Core from '@ulixee/hero-core';
export default class LocalHero extends DefaultHero {
    static Core?: typeof Core;
    static create(createOptions?: IHeroCreateOptions): Promise<LocalHero>;
    constructor(createOptions?: IHeroCreateOptions);
}
