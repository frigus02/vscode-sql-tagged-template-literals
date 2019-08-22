// VS Code bundles an extension called "Language Features for TypeScript and
// JavaScript files".
// Using this extension we can configure TypeScript language server plugins
// from this extension. The types `ApiV0` and `Api` in this file have been
// copied from:
// https://github.com/microsoft/vscode/blob/db8368395f65b584eec79e74e8d4a47aa0c60349/extensions/typescript-language-features/src/api.ts

import * as vscode from "vscode";

interface ApiV0 {
  configurePlugin(pluginId: string, configuration: {}): void;
}

interface Api {
  getAPI(version: 0): ApiV0 | undefined;
}

export const getTypeScriptLanguageFeaturesExtensionAPI = () => {
  const extension = vscode.extensions.getExtension(
    "vscode.typescript-language-features"
  );
  if (!extension) {
    return;
  }

  if (!extension.exports || !extension.exports.getAPI) {
    return;
  }

  const api = extension.exports as Api;
  return api.getAPI(0);
};
