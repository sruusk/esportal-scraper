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

  it('should return handle 10 simultaneous requests (status command)', async () => {
    const esportalIDs = [
      '154457808',
      '76561198031056688',
      '76561199023463910',
      '76561198865959505',
      '76561198082334236',
      '76561198169584876',
      '76561199003787046',
      '76561198392826184',
      '76561197998087687',
      '76561199415676347',
    ];

    const results = await Promise.all(
        esportalIDs.map(async (esportalId) => {
        const resp = await scraper.getPlayer(esportalId);
        expect(typeof resp.username).toBe('string');
        expect(resp.stats).toMatchObject({
          elo: expect.any(Number),
          matches: expect.any(Number),
          wins: expect.any(Number),
          losses: expect.any(Number),
          winRate: expect.any(Number),
          kd: expect.any(Number),
          hs: expect.any(Number),
        });
        expect(resp.country).toMatch(/^[A-Z]{2}$/);
        return resp;
      })
    );
    expect(results).toHaveLength(esportalIDs.length);
  });

  it('should return all statistics', async () => {
      const response = await scraper.getPlayer('205240369');
      expect(response).toMatchObject({
        username: expect.any(String),
        latestMatch: expect.any(Date),
        banReason: undefined,
        banExpires: undefined,
        stats: {
          elo: expect.any(Number),
          matches: expect.any(Number),
          wins: expect.any(Number),
          losses: expect.any(Number),
          winRate: expect.any(Number),
          kd: expect.any(Number),
          hs: expect.any(Number),
        },
        country: "FI"
      });
  });

  it('should return banned player', async () => {
    const response = await scraper.getPlayer('76561199215776711');
    expect(response).toMatchObject({
      username: expect.any(String),
      latestMatch: expect.any(Date),
      banReason: expect.any(String),
      banExpires: undefined,
      stats: {
        elo: expect.any(Number),
        matches: expect.any(Number),
        wins: expect.any(Number),
        losses: expect.any(Number),
        winRate: expect.any(Number),
        kd: expect.any(Number),
        hs: expect.any(Number),
      },
      country: expect.any(String)
    });
  });

  it('should throw when player is not found', async () => {
    await scraper.getPlayer('76561198107663925').catch((err) => {
        expect(err).toBeInstanceOf(Error);
    });
  });
});
