export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'chore', 'refactor', 'style', 'add'],
    ],
    'subject-case': [0],
    'header-pattern': [2, 'always', /^\[([a-z]+)\] (.+)$/],
    'type-case': [2, 'always', 'lower-case'],
  },
};
