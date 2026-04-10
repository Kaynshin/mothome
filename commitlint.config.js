/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // nouvelle fonctionnalité
        'fix', // correction de bug
        'docs', // documentation
        'style', // formatage, sans changement logique
        'refactor', // refactoring, sans feat ni fix
        'perf', // amélioration de performance
        'test', // ajout ou modification de tests
        'build', // système de build, dépendances
        'ci', // configuration CI/CD
        'chore', // maintenance, scripts
        'revert', // revert d'un commit
      ],
    ],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 200],
  },
}

export default config
