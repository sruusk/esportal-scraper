[![CodeQL](https://github.com/Apina-32/esportal-scraper/actions/workflows/codeql.yml/badge.svg)](https://github.com/Apina-32/esportal-scraper/actions/workflows/codeql.yml)
# esportal-scraper

A consumable Node package to scrape data from ESEA.
Due to ESEAs API being protected by Cloudflare, the best approach is to spin up a headless 
browser and scrape the API.  
[csgostatsgg-scraper](https://www.npmjs.com/package/csgostatsgg-scraper) is working as the base for this project.  
[Ulixee Hero](https://ulixee.org/docs/hero) is used to bypass Cloudflare and CORS.

## Usage

### Install

To start, it's best to run with a local Hero Core, so you should install `@ulixee/hero-core` as a peer dependency:

```shell
npm i esportal-scraper @ulixee/hero-core
```

Later, if you'd like to use a remote Hero Core, you can remove the `@ulixee/hero-core` peer dependency.

### Example Usage

```js
const esportalScraper = require("esportal-scraper");
const esportal = new esportalScraper.EsportalScraper;
await esportal.getPlayer("2570455")
```
