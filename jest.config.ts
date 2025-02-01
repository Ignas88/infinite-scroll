export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react-jsx',
      },
      diagnostics: {
        warnOnly: true,
      },
    },
  },
};