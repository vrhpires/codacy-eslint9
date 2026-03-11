import { type Codacyrc, Engine, ToolResult } from "codacy-seed";
import { TSESLint } from '@typescript-eslint/utils';

import { createEslintConfig } from "codacy/src/configCreator.ts";
import { convertResults } from "codacy/src/convertResults.ts";
import { DEBUG } from "lib/utils/logging.ts";
import { toolName } from "lib/utils/metadata.ts";

export const engineImpl: Engine = async function (
  codacyrc?: Codacyrc
): Promise<ToolResult[]> {

  if (!codacyrc || codacyrc.tools?.[0]?.name !== toolName) {
    throw new Error("codacyrc is not defined");
  }

  const srcDirPath = "/src";
  const [options, files] = await createEslintConfig(
    srcDirPath,
    codacyrc
  );

  const eslint = new TSESLint.FlatESLint(options);

  // Check if there are any glob patterns in the files array
  const lintResults = await eslint.lintFiles(files);

  await debugAndCountLintIssues(lintResults);

  const results = convertResults(lintResults).map((r) => r.relativeTo(srcDirPath));
  return results;
}

async function debugAndCountLintIssues (lintResults: TSESLint.FlatESLint.LintResult[]): Promise<void> {
  if (!DEBUG) return;
  let nIssues = 0;
  for await (const lintResult of lintResults) {
    nIssues += lintResult.messages.length;
  }

}
