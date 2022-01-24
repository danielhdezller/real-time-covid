import { HttpException, } from "@nestjs/common";


/**
 * The interface that represents the allowed translation arguments
 *
 * @export
 * @interface TranslationArguments
 */
export interface TranslationArguments {
    [key : string] : string | {
        translatable : true,
        value : string
    }
}

/**
 * The interface that represent a error that could be translatable
 *
 * @export
 * @interface TranslatableError
 */
export interface TranslatableError extends HttpException {
    translationArguments : TranslationArguments,
}
