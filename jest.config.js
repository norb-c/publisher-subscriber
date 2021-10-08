module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/publisher/dist/'],
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/publisher/dist/']
};
