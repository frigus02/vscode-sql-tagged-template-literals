# VS Code extension: SQL tagged template literals

A VS Code extension, which enables SQL syntax highlighting and simple type checking for template literals tagged with an `sql` or `sqlFragment` function in JavaScript and TypeScript files.

![GIF of code snippet showing SQL syntax highlighting and type errors](../docs/preview.gif)

Features:

- Syntax highlighting
- Syntax validation and type checking (TypeScript only)
- Formatting (VS Code TypeScript/JavaScript formatter only)

If you're not using PostgreSQL, syntax validation and type checking may not work properly. Have a look at [SQL tagged template literals (syntax only)](https://marketplace.visualstudio.com/items?itemName=frigus02.vscode-sql-tagged-template-literals-syntax-only), which is the same extension but syntax highlighting only.

## Syntax highlighting

Syntax highlighting works for `sql` and `sqlFragment` template tags and functions:

- Tagged template literals:

  ```ts
  sql`SELECT * FROM user`;
  sqlFragment`WHERE id = ${id}`;
  ```

- Functions returning a template tag:

  ```ts
  sql("get-user")`SELECT * FROM user`;
  sqlFragment("filter-by-id")`WHERE id = ${id}`;
  ```

- Comments before template literals:

  ```ts
  /* sql */ `SELECT * FROM user`
  /* sqlFragment */ `WHERE id = ${id}`;
  ```

- And most combinations with most TypeScript features. Some examples:

  ```ts
  sql<With, Generic<Types>>`SELECT * FROM user`;
  nested?.optional?.sql`SELECT * FROM user`;
  sql("with", Infinity, `params`)`SELECT * FROM user`;
  ```

## Syntax validation, type checking and formatting

The extension includes the [typescript-sql-tagged-template-plugin](https://github.com/frigus02/typescript-sql-tagged-template-plugin) to support SQL syntax validation, type checking and formatting. This comes with the following limitations:

- It only works in TypeScript files

- It only works with the `sql` template tag/function

- Type checking requires your database schema in a special format (see the [plugin documentation](https://github.com/frigus02/typescript-sql-tagged-template-plugin#configuration) for details)

- Formatting requires Perl to be installed on your machine and that you use the VS Code built-in formatter (TypeScript and JavaScript language features)

## Thanks

This is based on several great existing extensions:

- https://github.com/mjbvz/vscode-comment-tagged-templates
- https://github.com/ForbesLindesay/vscode-sql-template-literal
- https://github.com/Ladeiras/vscode-sql-template-literal
