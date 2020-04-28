# VS Code extension: SQL tagged template literals

A VS Code extension, which enables syntax highlighting for template literals tagged with an `sql` function in JavaScript and TypeScript files.

There are 2 version of the extension available:

- [extension](./extension): Syntax highlighting, syntax validation and type checking
- [extension-syntax-only](./extension-syntax-only): Syntax highlighting only

![GIF of code snippet showing SQL syntax](./extension/docs/preview.gif)

## Interesting bits about the grammar

- To debug the grammer, check the language scopes using the - `Developer: Inspect TM Scopes` command.
- If `patterns[].name` does not start with `string.js`, the code matched by the pattern (beginning and end) are not highlighted as JavaScript code.
- The keys in `beginCaptures` and `endCaptures` refer to the capture groups in the corresponding regex, where `0` refers to the entire match. By assigning capture groups a name, they can be highlighted accordingly. E.g. using `entity.name.function.ts` makes the string matched by the capture group be highlighted as a function name.
- The pattern `source.ts#template-substitution-element` refers to the variables in the template literal, e.g. `${userId}`. It should probably be the first pattern in the list to ensure these are highlighted properly.
- A pattern cannot span multiple lines. To match something across multiple lines, you have to use nested patterns; [good explanation](https://github.com/Microsoft/vscode-textmate/issues/41#issuecomment-358459018).
- The [TypeScript language definition](https://github.com/microsoft/vscode/blob/9edfff8d38d00bd87428af5b9dea7f41a7b5b4d9/extensions/typescript-basics/syntaxes/TypeScript.tmLanguage.json) can be useful to lookup and use existing patterns. The `sql()` function syntax in this repository makes use of some of the patterns used in a `#function-call`.

## Publish new version

_(For maintainers)_

```
npm install -g vsce
vsce publish
```

## Thanks

This is based on several great existing extensions:

- https://github.com/mjbvz/vscode-comment-tagged-templates
- https://github.com/ForbesLindesay/vscode-sql-template-literal
- https://github.com/Ladeiras/vscode-sql-template-literal
