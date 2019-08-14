import * as vscode from "vscode";

const pluginId = "typescript-sql-tagged-template-plugin";
const configurationSection = "sql-tagged-template-literals";

interface Configuration {
  schemaFile?: string;
  defaultSchemaName?: string;
}

const getTypeScriptLanguageFeaturesExtensionAPI = async () => {
  const extension = vscode.extensions.getExtension(
    "vscode.typescript-language-features"
  );
  if (!extension) {
    return;
  }

  await extension.activate();
  if (!extension.exports || !extension.exports.getAPI) {
    return;
  }

  return extension.exports.getAPI(0);
};

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

const synchronizeConfiguration = (api: any) =>
  api.configurePlugin(pluginId, getConfiguration());

export async function activate(context: vscode.ExtensionContext) {
  const api = await getTypeScriptLanguageFeaturesExtensionAPI();
  if (!api) {
    return;
  }

  vscode.workspace.onDidChangeConfiguration(
    e => {
      if (e.affectsConfiguration(configurationSection)) {
        synchronizeConfiguration(api);
      }
    },
    undefined,
    context.subscriptions
  );

  synchronizeConfiguration(api);
}
