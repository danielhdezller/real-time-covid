/**
 * The interface that represents the required Configuration Provider parameters.
 *
 * @export
 * @class ConfigurationProviderOptions
 */
export class ConfigurationProviderOptions {
  envPath?: string;

  envObject?: any;
}

/**
 * The app allowed modes.
 * @export
 * @enum {number}
 */
export enum EnvironmentModes {
  Development = 'Development',
  Production = 'Production',
}
