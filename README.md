# VS Code extension: SQL tagged template literals

A VS Code extension, which enables syntax highlighting for template literals tagged with an `sql` function in JavaScript and TypeScript files.

It works with simple tagged template literals:

![Code snippet of tagged template literal (sql``) highlighted as SQL](./docs/simple.png)

As well as with an `sql` function returning a template tag function:

![Code snippet of function returning template tag function (sql()``) highlighted as SQL](./docs/function-call.png)

## Package

Run this:

```
npm install -g vsce
vsce package
```

And you'll get: `vscode-sql-tagged-template-literals-VERSION.vsix`

## Install

Get the packaged extension and run:

```
code --install-extension vscode-sql-tagged-template-literals-VERSION.vsix
```

## Learnings

- If `patterns[].name` does not start with `string.js`, the code matched by the pattern (beginning and end) are not highlighted as JavaScript code.
- The keys in `beginCaptures` and `endCaptures` refer to the capture groups in the corresponding regex, where `0` refers to the entire match. By assigning capture groups a name, they can be highlighted accordingly. E.g. using `entity.name.function.ts` makes the string matched by the capture group be highlighted as a function name.
- The pattern `source.ts#template-substitution-element` refers to the variables in the template literal, e.g. `${userId}`. It should probably be the first pattern in the list to ensure these are highlighted properly.
- A pattern cannot span multiple lines. To match something across multiple lines, you have to use nested patterns; [good explanation](https://github.com/Microsoft/vscode-textmate/issues/41#issuecomment-358459018).
- The [TypeScript language definition](https://github.com/microsoft/vscode/blob/9edfff8d38d00bd87428af5b9dea7f41a7b5b4d9/extensions/typescript-basics/syntaxes/TypeScript.tmLanguage.json) can be useful to lookup and use existing patterns. The `sql()` function syntax in this repository makes use of some of the patterns used in a `#function-call`.

## Thanks

This is based on several great existing extensions:

- https://github.com/mjbvz/vscode-comment-tagged-templates
- https://github.com/ForbesLindesay/vscode-sql-template-literal
- https://github.com/Ladeiras/vscode-sql-template-literal
