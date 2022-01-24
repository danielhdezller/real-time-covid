import { NotFoundException } from '@nestjs/common';
import {
  TranslatableError,
  TranslationArguments,
} from 'src/shared/exceptions/translatable-error.interface';

export class AppNotFoundException
  extends NotFoundException
  implements TranslatableError
{
  constructor(
    errorKey: string,
    public translationArguments: TranslationArguments = {},
  ) {
    super(errorKey);
  }
}
