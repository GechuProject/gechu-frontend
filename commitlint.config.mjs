export default {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^\[(feat|fix|chore|refactor|style|add)\]\s+(.+)$/,
      headerCorrespondence: ['type', 'subject'],
    },
  },
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'chore', 'refactor', 'style', 'add'],
    ],
    'subject-case': [0],
    'type-case': [2, 'always', 'lower-case'],
  },
};
