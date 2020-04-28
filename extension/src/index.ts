import { access as accessCallback } from "fs";
import { resolve as resolvePath } from "path";
import { promisify } from "util";
import * as vscode from "vscode";
import { getTypeScriptLanguageFeaturesExtensionAPI } from "./vscode-ts-extension";

const accessFile = promisify(accessCallback);
const pluginId = "typescript-sql-tagged-template-plugin";
const extensionId = "frigus02.vscode-sql-tagged-template-literals";

interface Configuration {
  schemaFile?: string;
  defaultSchemaName?: string;
}

const resolveSchemaFile = async (schemaFile: string): Promise<string> => {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders && workspaceFolders.length === 1) {
    const workspaceRoot = workspaceFolders[0].uri.fsPath;
    const resolvedPath = resolvePath(workspaceRoot, schemaFile);
    try {
      // If the file does not exist, we want to fall back to a path relative
      // to a tsconfig.json, which is what the plugin will do by default.
      await accessFile(resolvedPath);
      return resolvedPath;
    } catch (e) {}
  }

  return schemaFile;
};

const getConfiguration = async (): Promise<Configuration> => {
  const config = vscode.workspace.getConfiguration(extensionId);
  const schemaFile = config.get<string | undefined>("schemaFile", undefined);
  const defaultSchemaName = config.get<string | undefined>(
    "defaultSchemaName",
    undefined
  );

  return {
    schemaFile: schemaFile && (await resolveSchemaFile(schemaFile)),
    defaultSchemaName
  };
};

export async function activate(context: vscode.ExtensionContext) {
  const api = getTypeScriptLanguageFeaturesExtensionAPI();
  if (!api) {
    return;
  }

  vscode.workspace.onDidChangeConfiguration(
    async e => {
      if (e.affectsConfiguration(extensionId)) {
        api.configurePlugin(pluginId, await getConfiguration());
      }
    },
    undefined,
    context.subscriptions
  );

  api.configurePlugin(pluginId, await getConfiguration());
}
