# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

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

[unreleased]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.11...HEAD
[0.0.11]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.10...v0.0.11
[0.0.8]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.7...v0.0.8
[0.0.4]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/frigus02/vscode-sql-tagged-template-literals/compare/v0.0.1...v0.0.2
