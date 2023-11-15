module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'scope-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']],
        'subject-case': [2, 'always', 'sentence-case'],
    },
  };