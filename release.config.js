/**
 * @type {import('semantic-release').GlobalConfig}
 */
const releaseConfig = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [
          { type: 'chore', release: 'patch' },
          { type: 'feat', release: 'minor' },
          { type: 'fix', release: 'patch' },
          { type: 'refactor', release: 'patch' },
        ],
      },
    ],
    '@semantic-release/release-notes-generator',
    'semantic-release-vsce',
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: '*.vsix',
          },
        ],
      },
    ],
  ],
};

export default releaseConfig;
