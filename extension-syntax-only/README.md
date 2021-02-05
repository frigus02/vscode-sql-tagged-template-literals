# VS Code extension: SQL tagged template literals (syntax only)

A VS Code extension, which enables SQL syntax highlighting for template literals tagged with an `sql` or `sqlFragment` function in JavaScript and TypeScript files.

![Image of code snippet showing SQL syntax highlighting](../docs/preview.png)

Supported are:

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
  /* sql * / `SELECT * FROM user`
  /* sqlFragment */ `WHERE id = ${id}`;
  ```

- And most combinations with most TypeScript features. Some examples:

  ```ts
  sql<With, Generic<Types>>`SELECT * FROM user`;
  nested?.optional?.sql`SELECT * FROM user`;
  sql("with", Infinity, `params`)`SELECT * FROM user`;
  ```

If you're using PostgreSQL, have a look at [SQL tagged template literals](https://marketplace.visualstudio.com/items?itemName=frigus02.vscode-sql-tagged-template-literals), which is the same extension but also supports SQL syntax validation, type checking and formatting.

## Thanks

This is based on several great existing extensions:

- https://github.com/mjbvz/vscode-comment-tagged-templates
- https://github.com/ForbesLindesay/vscode-sql-template-literal
- https://github.com/Ladeiras/vscode-sql-template-literal
