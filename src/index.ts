import * as vscode from "vscode";
import { getTypeScriptLanguageFeaturesExtensionAPI } from "./vscode-ts-extension";

const pluginId = "typescript-sql-tagged-template-plugin";
const configurationSection = "sql-tagged-template-literals";

interface Configuration {
  schemaFile?: string;
  defaultSchemaName?: string;
}

const getConfiguration = (): Configuration => {
  const config = vscode.workspace.getConfiguration(configurationSection);

  const schemaFile = config.get<string | undefined>("schemaFile", undefined);
  const defaultSchemaName = config.get<string | undefined>(
    "defaultSchemaName",
    undefined
  );

  return {
    schemaFile,
    defaultSchemaName
  };
};

export async function activate(context: vscode.ExtensionContext) {
  const api = await getTypeScriptLanguageFeaturesExtensionAPI();
  if (!api) {
    return;
  }

  vscode.workspace.onDidChangeConfiguration(
    e => {
      if (e.affectsConfiguration(configurationSection)) {
        api.configurePlugin(pluginId, getConfiguration());
      }
    },
    undefined,
    context.subscriptions
  );

  api.configurePlugin(pluginId, getConfiguration());
}
