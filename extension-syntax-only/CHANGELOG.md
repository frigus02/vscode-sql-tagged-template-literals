# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [0.0.17] - 2021-01-15

### Changed

- Updated TypeScript grammar to latest version

### Fixed

- Fixed incorrect syntax highlighting when using `sql` as a regular function ([#16](https://github.com/frigus02/vscode-sql-tagged-template-literals/issues/16))

## [0.0.16] - 2020-12-04

### Added

- Support syntax highlighting in \*.svelte files

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

## [0.0.8] - 2019-09-01

### Added

- Support for type arguments and optional chaining for the sql function, e.g.:

  ```ts
  const query = foo.sql?.<User>("get-users")`
    SELECT * FROM users
  `;
  ```

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

[unreleased]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.17...HEAD
[0.0.17]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.16...v0.0.17
[0.0.16]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.15...v0.0.16
[0.0.15]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.14...v0.0.15
[0.0.14]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.13...v0.0.14
[0.0.13]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.12...v0.0.13
[0.0.12]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.11...v0.0.12
[0.0.11]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.8...v0.0.11
[0.0.8]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.4...v0.0.8
[0.0.4]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.1...v0.0.2
