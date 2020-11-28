# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [0.0.16] - 2020-11-28

### Added

- Formatting of SQL in tagged template literals (updated `typescript-sql-tagged-template-plugin`).

  Formatting uses [pgFormatter](https://github.com/darold/pgFormatter) and requires Perl. If you have Perl installed, it should work right away. If it doesn't work, make sure you're using the "TypeScript and JavaScript language features" formatter. Formatting will not work if you're using another formatter like Prettier.

## [0.0.15] - 2020-11-04

### Fixed

- Allow for escaped backticks in SQL queries:

  ```ts
  /*sql*/ `SELECT * FROM \`users\``;
  ```

## [0.0.14] - 2020-10-21

### Added

- Syntax highlighting for `sql` tag function, which has types or is part of an object:

  ```ts
  const myObj = {
    sql<T>(s: TemplateStringsArray, ...values: any[]) {},
  };

  myObj.sql<User>`SELECT * FROM users`;
  ```

## [0.0.13] - 2020-06-29

### Added

- Support for highlighting template literals with an `/* SQL */` comment in front, e.g.

  ```ts
  const query = /* SQL */ `
    SELECT * FROM users
  `;
  ```

  Thanks [@n1ru4l](https://github.com/n1ru4l).

## [0.0.12] - 2020-04-28

### Added

- Add new extension [SQL tagged template literals (syntax only)](https://marketplace.visualstudio.com/items?itemName=frigus02.vscode-sql-tagged-template-literals-syntax-only), which is the same extension but syntax highlighting only.

## [0.0.11] - 2019-09-19

### Added

- Add SQL syntax highlighting for `sqlFragment` tag, e.g.:

  ```ts
  const queryFragment = sqlFragment`
    WHERE user_id = 0
  `;
  ```

## [0.0.10] - 2019-09-10

### Fixed

- Type checking for nullable types like `string | null` (updated `typescript-sql-tagged-template-plugin`).

## [0.0.9] - 2019-09-03

### Fixed

- Type checking for builtin types like `Date` or `BigInt` (updated `typescript-sql-tagged-template-plugin`).

## [0.0.8] - 2019-09-01

### Added

- Support for type arguments and optional chaining for the sql function, e.g.:

  ```ts
  const query = foo.sql?.<User>("get-users")`
    SELECT * FROM users
  `;
  ```

## [0.0.7] - 2019-08-22

### Added

- Better resolution of database schema file for `typescript-sql-tagged-template-plugin`. The path can now be specified relative to the workspace, absolute or relative to the `tsconfig.json`.

## [0.0.6] - 2019-08-21

### Fixed

- Syntax and type checking did not work because the `typescript-sql-tagged-template-plugin` plugin had a bug, which caused it to crash while loading. Updated the plugin to fix this.

## [0.0.5] - 2019-08-21

### Added

- Simple syntax and type checking using the [typescript-sql-tagged-template-plugin](https://github.com/frigus02/typescript-sql-tagged-template-plugin).

## [0.0.4] - 2019-06-10

### Added

- Support for simple tagged templates (no function calls), e.g.:

  ```ts
  const query = sql`SELECT * FROM users`;
  ```

## [0.0.3] - 2019-06-10

### Added

- Support for sql functions with template literal params, e.g.:

  ```ts
  const query = sql(`get-users`)`
    SELECT * FROM users
  `;
  ```

## [0.0.2] - 2019-06-03

### Added

- Support for multiline sql function calls, e.g.:

  ```ts
  const query = sql(
    "get-users-with-a-very-very-very-very-very-very-very-long-name"
  )`
    SELECT * FROM users
  `;
  ```

## 0.0.1 - 2019-05-27

- First release.

[unreleased]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.16...HEAD
[0.0.16]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.15...v0.0.16
[0.0.15]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.14...v0.0.15
[0.0.14]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.13...v0.0.14
[0.0.13]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.12...v0.0.13
[0.0.12]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.11...v0.0.12
[0.0.11]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.10...v0.0.11
[0.0.10]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.9...v0.0.10
[0.0.9]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.8...v0.0.9
[0.0.8]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.7...v0.0.8
[0.0.7]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.1...v0.0.2
