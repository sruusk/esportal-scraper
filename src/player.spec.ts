/* eslint-disable no-console */
import { EsportalScraper } from './index';

jest.setTimeout(5 * 60 * 1000);
describe('The player scrapers', () => {
  let scraper: EsportalScraper;

  beforeAll(async () => {
    scraper = new EsportalScraper({ logger: console.log });
  });

  afterAll(async () => {
    await scraper.shutdown();
  });

  it('should return all statistics', async () => {
    const response = await scraper.getPlayer('147398197');
    expect(response).toMatchObject({
      username: expect.any(String),
      latestMatch: expect.any(Date),
      banned: expect.any(Boolean),
      banReason: undefined,
      banExpires: undefined,
      stats: {
        elo: expect.any(Number),
        rankLocked: expect.any(Boolean),
        matches: expect.any(Number),
        wins: expect.any(Number),
        losses: expect.any(Number),
        winRate: expect.any(Number),
        kd: expect.any(Number),
        hs: expect.any(Number),
      },
      country: 'FI',
    });
    expect(response.stats.kd).toBeGreaterThanOrEqual(0);
    expect(response.stats.kd).toBeLessThanOrEqual(10);
    expect(response.stats.hs).toBeGreaterThanOrEqual(0);
    expect(response.stats.hs).toBeLessThanOrEqual(100);
  });

  it('should return banned player', async () => {
    const response = await scraper.getPlayer('76561199215776711');
    expect(response).toMatchObject({
      username: expect.any(String),
      banned: true,
      latestMatch: expect.any(Date),
      banReason: expect.any(String),
      banExpires: undefined,
      stats: {
        elo: expect.any(Number),
        rankLocked: expect.any(Boolean),
        matches: expect.any(Number),
        wins: expect.any(Number),
        losses: expect.any(Number),
        winRate: expect.any(Number),
        kd: expect.any(Number),
        hs: expect.any(Number),
      },
      country: expect.any(String),
    });
  });

  it('should throw when player is not found', async () => {
    await scraper.getPlayer('76561198107663925').catch((err) => {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(err).toBeInstanceOf(Error);
    });
  });
});
