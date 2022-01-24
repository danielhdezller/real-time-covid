import { AppNotFoundException, } from "src/shared/exceptions/app-not-found.exception";
import {
    FindConditions,
    FindOneOptions,
    ObjectID,
    Repository,  
} from "typeorm";

/**
 * A base repository with some utilities used by the other repositories of the application.
 *
 * @export
 * @class AppBaseRepository
 * @extends {Repository<T>}
 * @template T
 */
export class AppBaseRepository<T> extends Repository<T> {


    /**
     * Return the name of the related entity.
     *
     * @readonly
     * @type {string}
     * @memberof AppBaseRepository
     */
    get entityName() : string {
        return this.metadata.name || this.metadata.discriminatorValue || this.metadata.tableName;
    }

    async getBy( 
        id ?: string | number | Date | ObjectID | FindConditions<T>, 
        options ?: FindOneOptions<T>
    ) : Promise<T>;

    async getBy(options ?: FindOneOptions<T>) : Promise<T>;

    async getBy(conditions ?: FindConditions<T>, options ?: FindOneOptions<T>) : Promise<T>;


    /**
     * The method should return a entity or throw a exception.
     *
     * @param {(string | number | Date | ObjectID)} [id] The id of
     * @param {FindOneOptions<T>} [options]
     * @returns {(Promise<T | undefined>)}
     * @memberof AppBaseRepository
     */
    async getBy(...args : any[]) : Promise<T>{

        const entity = await super.findOne(...args);

        if(!entity){

            throw new AppNotFoundException("entities.errors.entityNotFound", {
                entityName: {
                    translatable : true, 
                    value        : `entities.${this.entityName}`,
                },
            });
        }

        return entity;
    }

}
