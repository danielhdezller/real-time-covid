import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validateOrReject } from "class-validator";
import { inspect } from "util";
import { AppConfiguration } from "../configurations/app.configuration";
import { ConfigurationProviderOptions } from "../interfaces/app.interfaces";
import * as _ from "lodash";


/**
 * A service that provides the app configuration values.
 * @export
 * @class ConfigProviderService
 */
@Injectable()
export class ConfigProviderService {

     /**
     * The last app configuration loaded.
     *
     * @type {AppConfiguration}
     * @memberof ConfigProviderService
     */
      private appConfiguration : AppConfiguration;
    
      constructor(
          private readonly configurationProviderOptions : ConfigurationProviderOptions
      ){}
  
      
      /**
       * Extract the env object (in this case from a configuration file).
       *
       * @private
       * @returns {Promise<any>}
       * @memberof ConfigProviderService
       */
      async getEnvObject() : Promise<any> {
      
  
          if(this.configurationProviderOptions.envObject){
              return this.configurationProviderOptions.envObject;
          }
          
  
          if (!this.configurationProviderOptions.envPath) {
              throw new InternalServerErrorException(
                  "It is necessary the or the env path or a env object to use the  current "
                  + "configuration service"
              );
          }
          
  
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const envObject = require(this.configurationProviderOptions.envPath);
  
          return _.cloneDeep(envObject);
      }
  
      /**
       * Load from somewhere and validates the app configuration.
       *
       * @returns {Promise<AppConfiguration>}
       * @memberof ConfigProviderService
       */
      async loadAppConfiguration() : Promise<AppConfiguration> {
          const envObject = await this.getEnvObject();
          try{
              const appEnvConfiguration = plainToClass(AppConfiguration, envObject);
              await validateOrReject(appEnvConfiguration);
              return appEnvConfiguration;
          }catch(error){
              console.error("The provided app configuration is not valid");
              console.error(inspect(error, {
                  showHidden : false,
                  depth      : null, 
              }));
  
              throw error;
          }  
      }
  
      /**
       * @inheritdoc
       *
       * @returns {Promise<void>}
       * @memberof ConfigProviderService
       */
      async init() : Promise<void> {
          this.appConfiguration = await this.loadAppConfiguration();
      }
      
      /**
       * Load and provides the current app configuration
       *
       * @returns {Promise<AppConfiguration>}
       * @memberof ConfigProviderService
       */
      getAppConfiguration() : AppConfiguration{
          return this.appConfiguration;
      }
  
      /**
       * Check if the config provider service is working.
       *
       * @returns {boolean} A flag that indicates if the service is working.
       * @Throws A exception if the config could not be loaded.
       * @memberof ConfigProviderService
       */
      async isWorking() : Promise<true>{
          await this.loadAppConfiguration();
       
          return true;
      }
}