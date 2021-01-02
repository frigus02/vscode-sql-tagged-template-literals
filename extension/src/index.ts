import { access as accessCallback } from "fs";
import { resolve as resolvePath } from "path";
import { promisify } from "util";
import * as vscode from "vscode";
import { getTypeScriptLanguageFeaturesExtensionAPI } from "./vscode-ts-extension";

const accessFile = promisify(accessCallback);
const pluginId = "typescript-sql-tagged-template-plugin";
const extensionId = "frigus02.vscode-sql-tagged-template-literals";

interface Configuration {
  enableDiagnostics: boolean;
  enableFormat: boolean;
  schemaFile?: string;
  defaultSchemaName?: string;
  pgFormatterConfigFile?: string;
}

const resolveFileWorkspaceRelative = async (file: string): Promise<string> => {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders && workspaceFolders.length === 1) {
    const workspaceRoot = workspaceFolders[0].uri.fsPath;
    const resolvedPath = resolvePath(workspaceRoot, file);
    try {
      // If the file does not exist, we want to fall back to a path relative
      // to a tsconfig.json, which is what the plugin will do by default.
      await accessFile(resolvedPath);
      return resolvedPath;
    } catch (e) {}
  }

  return file;
};

const getConfiguration = async (): Promise<Configuration> => {
  const config = vscode.workspace.getConfiguration(extensionId);
  const enableDiagnostics = config.get<boolean>("enableDiagnostics", true);
  const enableFormat = config.get<boolean>("enableFormat", true);
  const schemaFile = config.get<string | undefined>("schemaFile", undefined);
  const defaultSchemaName = config.get<string | undefined>(
    "defaultSchemaName",
    undefined
  );
  const pgFormatterConfigFile = config.get<string | undefined>(
    "pgFormatterConfigFile",
    undefined
  );

  return {
    enableDiagnostics,
    enableFormat,
    schemaFile: schemaFile && (await resolveFileWorkspaceRelative(schemaFile)),
    defaultSchemaName,
    pgFormatterConfigFile:
      pgFormatterConfigFile &&
      (await resolveFileWorkspaceRelative(pgFormatterConfigFile)),
  };
};

export async function activate(context: vscode.ExtensionContext) {
  const api = getTypeScriptLanguageFeaturesExtensionAPI();
  if (!api) {
    return;
  }

  vscode.workspace.onDidChangeConfiguration(
    async (e) => {
      if (e.affectsConfiguration(extensionId)) {
        api.configurePlugin(pluginId, await getConfiguration());
      }
    },
    undefined,
    context.subscriptions
  );

  api.configurePlugin(pluginId, await getConfiguration());
}
