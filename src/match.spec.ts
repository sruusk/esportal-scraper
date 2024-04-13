/* eslint-disable no-console */
import { EsportalScraper } from './index';

jest.setTimeout(5 * 60 * 1000);
describe('The match scrapers', () => {
  let scraper: EsportalScraper;

  beforeAll(async () => {
    scraper = new EsportalScraper({ logger: console.log });
  });

  afterAll(async () => {
    await scraper.shutdown();
  });

  it('should throw when match is not found', async () => {
    await scraper.getMatch('0000000').catch((err) => {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(err).toBeInstanceOf(Error);
    });
  });

  it('should return all statistics for a match', async () => {
    const response = await scraper.getMatch('6132025');
    expect(response).toMatchObject({
      team1: expect.any(Array),
      team2: expect.any(Array),
    });
    expect(response.team1).toHaveLength(5);
    expect(response.team2).toHaveLength(5);

    response.team1.forEach((id) => {
      expect(/^7656119\d{10}$/.test(id)).toBe(true);
    });
    response.team2.forEach((id) => {
      expect(/^7656119\d{10}$/.test(id)).toBe(true);
    });
  });
});
