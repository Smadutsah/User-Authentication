module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  verbose: true,
  roots: ['<rootDir>'],
  projects: [
    {
      preset: 'ts-jest',
      testEnvironment: 'node',
      displayName: 'famba',
      globalSetup: './src/test_utils/setup.ts',
      setupFiles: ['./src/test_utils/set_env_vars.ts'],
      setupFilesAfterEnv: ['./src/test_utils/db_setup.ts']
    }
  ]
};
