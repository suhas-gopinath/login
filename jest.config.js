module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/?(*.)+(test|spec).ts?(x)"],
  setupFilesAfterEnv: ["<rootDir>/src/SetupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
    "^container/useApi$": "<rootDir>/__mocks__/containerUseApiMock.ts",
    "^container/useMessage$": "<rootDir>/__mocks__/containerUseMessageMock.ts",
  },
};
