# Test for VS Code extension: SQL tagged template literals

This is a test for a VS Code extension. It enables syntax highlighting for template literals tagged with an `sql` function is JavaScript and TypeScript files.

```ts
const query1 = sql`
  SELECT * FROM users
`;

const query2 = sql("get-user")`
  SELECT
    *
  FROM
    users
  WHERE
    user_id = ${userId}
`;
```

## Package

Run this:

```
npm install -g vsce
vsce publish
```

And you'll get: `vscode-sql-tagged-template-literals-0.0.1.vsix`

## Install

Get the packaged extension and run:

```
code --install-extension vscode-sql-tagged-template-literals-0.0.1.vsix
```

## Learnings

1. If `patterns[].name` does not start with `string.js`, the code matched by the pattern (beginning and end) are not highlighted as JavaScript code.
1. The keys in `beginCaptures` and `endCaptures` refer to the capture groups in the corresponding regex, where `0` refers to the entire match. By assigning capture groups a name, they can be highlighted accordingly. E.g. using `entity.name.function.ts` makes the string matched by the capture group be highlighted as a function name.
1. The pattern `source.ts#template-substitution-element` refers to the variables in the template literal, e.g. `${userId}`. It should probably be the first pattern in the list to ensure these are highlighted properly.

## Thanks

This is based on several great existing extensions:

- https://github.com/mjbvz/vscode-comment-tagged-templates
- https://github.com/ForbesLindesay/vscode-sql-template-literal
- https://github.com/Ladeiras/vscode-sql-template-literal
