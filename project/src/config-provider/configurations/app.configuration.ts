import { EnvironmentModes } from "../interfaces/app.interfaces";
import { DBConfiguration } from "./db.configuration";

export class AppConfiguration {
    public readonly appName: string;

    public readonly appPort: string;

    public readonly mode: EnvironmentModes

    private readonly dbConfiguration : DBConfiguration;

}