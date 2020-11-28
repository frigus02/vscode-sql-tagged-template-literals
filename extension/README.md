# VS Code extension: SQL tagged template literals

A VS Code extension, which enables syntax highlighting for template literals tagged with an `sql` function in JavaScript and TypeScript files.

It works with simple tagged template literals as well as with an `sql` function returning a template tag function.

In TypeScript files it also enables SQL syntax validation, type checking for parameters and formatting using the [typescript-sql-tagged-template-plugin](https://github.com/frigus02/typescript-sql-tagged-template-plugin). Type checking requires configuration of the database schema. You can have a look at the [plugin documentation](https://github.com/frigus02/typescript-sql-tagged-template-plugin#configuration) for details.

If you're not using PostgreSQL, syntax validation and type checking may not work properly. Have a look at [SQL tagged template literals (syntax only)](https://marketplace.visualstudio.com/items?itemName=frigus02.vscode-sql-tagged-template-literals-syntax-only), which is the same extension but syntax highlighting only.

![GIF of code snippet showing SQL syntax and type errors](../docs/preview.gif)

## Thanks

This is based on several great existing extensions:

- https://github.com/mjbvz/vscode-comment-tagged-templates
- https://github.com/ForbesLindesay/vscode-sql-template-literal
- https://github.com/Ladeiras/vscode-sql-template-literal
