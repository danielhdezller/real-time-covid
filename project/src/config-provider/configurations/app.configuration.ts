import { ValidInstanceOf } from "@/shared/validators/valid-instance-of.validator";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { IsEnum, IsNotEmpty, IsPort, IsString } from "class-validator";
import { EnvironmentModes } from "../interfaces/app.interfaces";
import { DBConfiguration } from "./db.configuration";

export class AppConfiguration {

    /**
     * The app name.
     * @type {string}
     * @memberof AppConfiguration
     */
    @IsString()
    @IsNotEmpty()
    public readonly appName: string;

    /**
     * The port where the application should be executed.
     * @type {string}
     * @memberof AppConfiguration
     */
    @IsPort()
    public readonly appPort: string;

    /**
     * The application mode.
     * @type {EnvironmentModes}
     * @memberof AppConfiguration
     */
    @IsString()
    @IsEnum(Object.values(EnvironmentModes))
    @IsNotEmpty()
    public readonly mode: EnvironmentModes

    
    /**
     * Return the typeOrm config to be used by the application.
     * @private
     * @type {DBConfiguration}
     * @memberof AppConfiguration
     */
    @ValidInstanceOf(DBConfiguration)
    private readonly dbConfiguration : DBConfiguration;

    /**
     * Check if the configuration is in develop mode.
     * @returns {boolean}
     * @memberof AppConfiguration
     */
    isMode(mode : EnvironmentModes) : boolean {
        return this.mode == mode;
    }

    /**
     * Return the typeOrm config which should be used the app.
     *
     * @returns {*}
     * @memberof AppConfiguration
     */
    getTypeOrmConfig() : TypeOrmModuleOptions{
        return this.dbConfiguration.getTypeOrmConfig();
    }

}