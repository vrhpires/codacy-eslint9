import { ParameterSpec } from "codacy-seed"
import { JSONSchema4, JSONSchema4Type } from "json-schema"

import { rulesNamedParametersAndDefaults } from "lib/utils/rulesToUnnamedParametersDefaults.ts"

export function fromSchemaArray (
  patternId: string,
  objects: JSONSchema4[]
): ParameterSpec[] {
  return objects.flatMap((o) => {
    const pairs = Object.entries(o.properties || {});
    const haveDefault = pairs.filter(([, v]) => v && v.default !== undefined);
    const manual = pairs.filter(
      ([k, v]) => v && rulesNamedParametersAndDefaults.has(patternId, k)
    );
    const automaticParameters: [string, JSONSchema4Type | undefined][] = haveDefault.map(([k, v]) => [
      k,
      v.default
    ]);
    const manualParameters: [string, JSONSchema4Type][] = manual
      .map(([k]) => rulesNamedParametersAndDefaults.parameter(patternId, k))
      .filter((e) => e) as [string, JSONSchema4Type][];
    const allParametersMap = new Map([
      ...automaticParameters,
      ...manualParameters
    ]);

    return Array.from(allParametersMap.entries()).map(
      ([k, v]) => new ParameterSpec(k, v)
    );
  });

}
