import { type Codacyrc, Engine, ToolResult } from "codacy-seed";
import { TSESLint } from '@typescript-eslint/utils';

import { createEslintConfig } from "codacy/src/configCreator.ts";
import { convertResults } from "codacy/src/convertResults.ts";
import { DEBUG, debug } from "lib/utils/logging.ts";
import { toolName } from "lib/utils/metadata.ts";

export const engineImpl: Engine = async function (
  codacyrc?: Codacyrc
): Promise<ToolResult[]> {
  debug("engine: starting");

  if (!codacyrc || codacyrc.tools?.[0]?.name !== toolName) {
    throw new Error("codacyrc is not defined");
  }

  const srcDirPath = "/src";
  const [options, files] = await createEslintConfig(
    srcDirPath,
    codacyrc
  );

  debug(`engine: list of ${files.length} files (or globs) to process in "${srcDirPath}" and options used`);
  debug(files);
  debug(options);

  const eslint = new TSESLint.FlatESLint(options);

  // Check if there are any glob patterns in the files array
  const lintResults = await eslint.lintFiles(files);
  // const lintResults = files.some((file: string) => /\*|\?|\[/.test(file))
  //   ? await eslint.lintFiles(files)
  //   : await lintFilesInChunks(eslint, files)

  await debugAndCountLintIssues(lintResults);

  debug("engine: finished");
  return convertResults(lintResults).map((r) => r.relativeTo(srcDirPath));
}

// async function lintFilesInChunks (eslint: ESLint, files: string[]): Promise<ESLint.LintResult[]> {
//   //-- without chunks
//   //return await eslint.lintFiles(files)

//   //const nFilesPerChunk = 10
//   //const chunksOfFiles = chunkFilesByCount(files, nFilesPerChunk)

//   const maxTotalSizePerChunk = 8167 // size in bytes (8KB)
//   const chunksOfFiles = chunkFilesByTotalSize(files, maxTotalSizePerChunk)

//   return lintFilesChunkByChunk(eslint, chunksOfFiles)
// }

// async function lintFilesChunkByChunk (eslint: ESLint, chunksOfFiles: string[][]): Promise<ESLint.LintResult[]> {
//   debug("engine: linting chunks started")
//   const lintResults = []
//   for (const chunkOfFiles of chunksOfFiles) {
//     lintResults.push(...await eslint.lintFiles(chunkOfFiles))
//   }
//   debug("engine: linting chunks finished")

//   return lintResults
// }

async function debugAndCountLintIssues (lintResults: TSESLint.FlatESLint.LintResult[]): Promise<void> {
  if (!DEBUG) return;

  let nIssues = 0;
  for await (const lintResult of lintResults) {
    nIssues += lintResult.messages.length;
  }
  debug(`engine: ${lintResults.length} files linted and ${nIssues} issues found`, lintResults);
}

/*
const chunkFilesByCount = (files: string[], size: number) =>
  Array.from({ length: Math.ceil(files.length / size) }, (, i: number) =>
  files.slice(i * size, i * size + size)
  )
*/

// function chunkFilesByTotalSize (files: string[], maxChunkSize: number): string[][] {
//   const chunks: string[][] = []
//   let currentChunk: string[] = []
//   let currentChunkSize = 0

//   for (const file of files) {
//     try {
//       const size = fs.statSync(file).size // nosemgrep
//       if (currentChunk.length === 0 || currentChunkSize + size <= maxChunkSize) {
//         currentChunk.push(file)
//         currentChunkSize += size
//       } else {
//         chunks.push(currentChunk)
//         currentChunk = [file]
//         currentChunkSize = size
//       }
//     } catch (error) {
//       console.error(`engine: error while getting file size for "${file}": ${error}`)
//     }
//   }

//   if (currentChunk.length > 0) {
//     chunks.push(currentChunk)
//   }

//   return chunks
// }