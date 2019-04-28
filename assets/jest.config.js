module.exports = {
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage/",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(sa|sc|c)ss$": "<rootDir>/__mocks__/styleMock.js"
  },
  testEnvironment: 'node'
};
