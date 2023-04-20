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
      '974465',
      '2746569',
      '440390',
      '2742648',
      '2570455',
      '2572609',
      '751769',
      '2487672',
      '2573516',
      '2738955',
    ];

    const results = await Promise.all(
        esportalIDs.map(async (esportalId) => {
        const resp = await scraper.getPlayer(esportalId);
        expect(resp.summary).toMatchObject({
          age: expect.any(Number),
          alias: expect.any(String),
          id: expect.any(Number),
        });
        return resp;
      })
    );
    expect(results).toHaveLength(esportalIDs.length);
  });

  it('should throw on invalid get', async () => {
    await expect(scraper.getPlayer('208493849384/adw/')).rejects.toThrow(
      'https://play.esportal.net/api/users/208493849384/adw/ returned a non-200 response: 404'
    );
  });

  it('should return all statistics', async () => {
      const response = await scraper.getPlayer('440390');
      expect(response.summary).toMatchObject({
        age: expect.any(Number),
        alias: expect.any(String),
        id: expect.any(Number),
        tier: expect.any(String),
      });
      expect(response.stats).toMatchObject({
        killDeathRatio: expect.any(Number),
        kills: expect.any(Number),
        deaths: expect.any(Number),
        wins: expect.any(Number),
        rank: expect.any(String),
        mmr: expect.any(Number),
        lastGameDate: expect.any(String),
        matches: expect.any(Number),
        headshotRate: expect.any(Number),
        averageDamageRound: expect.any(Number),
      });
  });
});
