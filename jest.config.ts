import type { Config } from 'jest'

const config: Config = {
  "transform": {
    ".(ts|tsx)": "ts-jest"
  },
  "testEnvironment": "jsdom",
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "/test/"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 90,
      "functions": 95,
      "lines": 95,
      "statements": 95
    }
  },
  "collectCoverageFrom": [
    "src/*.{js,ts}",
    "src/**/*.{js,ts}"
  ]
}

export default config