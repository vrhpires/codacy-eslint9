const blacklistRegexes: RegExp[] = [
  /@lwc\/lwc\/no-async-operation/,
  /@lwc\/lwc\/no-leaky-event-listeners/,
  /@lwc\/lwc\/no-unexpected-wire-adapter-usages/,
  /@lwc\/lwc\/no-unknown-wire-adapters/,
  /@lwc\/lwc\/no-restricted-browser-globals-during-ssr/,
  /@lwc\/lwc\/no-node-env-in-ssr/,
  /@salesforce\/lightning\/valid-apex-method-invocation/,
  /@typescript-eslint\/consistent-type-imports/,
  /@typescript-eslint\/ban-types/,
  /angular\/service-name/,
  /ember\/no-restricted-property-modifications/,
  /ember\/template-indent/,
  /backbone\/event-scope/,
  /backbone\/no-silent/,
  /filenames\/match-regex/,
  /filenames\/match-exported/,
  /filenames\/no-index/,
  /functional\/functional-parameters/,
  /functional\/immutable-data/,
  /functional\/no-conditional-statements/,
  /functional\/no-expression-statements/,
  /functional\/no-let/,
  /functional\/no-mixed-types/,
  /functional\/no-return-void/,
  /functional\/no-throw-statements/,
  /functional\/no-try-statements/,
  /functional\/prefer-immutable-types/,
  /functional\/type-declaration-immutability/,
  /import\/newline-after-import/,
  /import\/no-amd/,
  /import\/no-commonjs/,
  /xss\/no-mixed-html/,
  /unused-imports\/.*-ts/,
  /yml\/sort-sequence-values/
]

const documentationBlacklistRegexes: RegExp[] = [
  /@shopify\/no-debugger/,
  /react-redux\/mapStateToProps-prefer-parameters-names/,
  /react-redux\/prefer-separate-component-file/,
  /react-redux\/mapStateToProps-prefer-hoisted/,
  /react-redux\/connect-prefer-named-arguments/,
  /react-redux\/mapDispatchToProps-prefer-parameters-names/,
  /react-redux\/mapDispatchToProps-returns-object/,
  /react-redux\/mapDispatchToProps-prefer-shorthand/,
  /react-redux\/connect-prefer-minimum-two-arguments/,
  /react-redux\/mapStateToProps-no-store/,
  /jasmine\/named-spy/,
  /jasmine\/no-unsafe-spy/,
  /jasmine\/no-focused-tests/,
  /jasmine\/no-assign-spyon/,
  /jasmine\/no-describe-variables/,
  /jasmine\/expect-matcher/,
  /jasmine\/no-pending-tests/,
  /jasmine\/no-suite-callback-args/,
  /jasmine\/prefer-toHaveBeenCalledWith/,
  /jasmine\/no-disabled-tests/,
  /jasmine\/prefer-jasmine-matcher/,
  /jasmine\/no-global-setup/,
  /jasmine\/expect-single-argument/,
  /jasmine\/valid-expect/
]

function testRegex (regexes: RegExp[], value: string): boolean {
  return regexes.some((regex) => regex.test(value))
}

export function isBlacklisted (ruleId: string): boolean {
  return testRegex(blacklistRegexes, ruleId)
}

// Removes a pattern from the documentation
// but still supports it with eslint config file
export function isBlacklistedOnlyFromDocumentation (ruleId: string): boolean {
  return testRegex(documentationBlacklistRegexes, ruleId)
}
