## AI Tools used

I used ChatGPT to assist with
 - generating typescript models
 - debugging unit tests
 - writing unit tests

## Example prompts

### Generating TypeScript models

Example prompt
```geef mij het TS model voor deze json: { "meta": { "success": true }, "data": { "id": "V1jxGX", "code": "btc", "dirtyCode": "BTC", "name": "Bitcoin", "slug": "bitcoin", "priceInUSD": 73095.9003, "availableSupply": 0, "totalSupply": 0, "marketCapRank": 1, "volume24hInUSD": 42348771688, "marketCapInUSD": 1462115072920.866, "percentChange1h": -0.7814268045084689, "percentChange24h": 1.6661971075832345, "percentChange7d": 7.816231707703156, "showDisclaimer": false } }```


### Debugging Test Issues
Followed the steps on [expo unit testing](https://docs.expo.dev/develop/unit-testing/)  but still got an error when trying to run a test (Incorrect version of "react-test-renderer" detected. Expected "19.2.4", but found "19.1.0".)

```Waarom krijg ik deze error: Test suite failed to run Incorrect version of "react-test-renderer" detected. Expected "19.2.4", but found "19.1.0". Fix it by running: npm install -D react-test-renderer@19.2.4 1 | import React from "react"; > 2 | import { render, fireEvent } from "@testing-library/react-native"; | ^ 3 | import Index from "@/app/index"; 4 | 5 | jest.mock("expo-router", () => ({ at Object.ensurePeerDeps (node_modules/@testing-library/react-native/src/helpers/ensure-peer-deps.ts:36:3) at Object.require (node_modules/@testing-library/react-native/src/index.ts:1:1) at Object.require (__tests__/index.test.tsx:2:1) Test Suites: 1 failed, 1 total Tests: 0 total Snapshots: 0 total Time: 0.535 s Ran all test suites.```

eventually was able to fix it by removing the package.lock.json and reinstalling the dependencies
