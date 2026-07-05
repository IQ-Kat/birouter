/**
 * Helper used by the `BIROUTER_BUILD_PROFILE=minimal` stubs to surface a
 * consistent "this feature was compiled out" error. Routes that depend on a
 * stubbed module should catch the error and return HTTP 503 with a clear
 * message; we don't want the bundle to silently fail.
 *
 * See docs/security/SOCKET_DEV_FINDINGS.md for the build profile rationale.
 */
export class FeatureDisabledError extends Error {
  readonly featureName: string;
  constructor(featureName: string) {
    super(
      `Feature "${featureName}" is disabled in this build (BIROUTER_BUILD_PROFILE=minimal). ` +
        `Install the full birouter artifact instead of birouter-secure if you need this feature.`
    );
    this.name = "FeatureDisabledError";
    this.featureName = featureName;
  }
}

export function featureDisabledError(featureName: string): FeatureDisabledError {
  return new FeatureDisabledError(featureName);
}
