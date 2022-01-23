/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type } from 'class-transformer';
import { IsArray, isArray, IsInstance, ValidateNested } from 'class-validator';

/**
 * A decorator that check that the field is a valid instance of the provided class.
 *
 * @export
 * @param {(((new (...args: any[]) => any) | [new (...args: any[]) => any]))} targetType
 * @return {*}  {PropertyDecorator}
 */
export function ValidInstanceOf(
  targetType: (new (...args: any[]) => any) | [new (...args: any[]) => any],
): PropertyDecorator {
  return function (target: any, propertyKey: string) {
    let type: any = targetType;
    if (isArray(targetType)) {
      type = targetType[0];
      IsArray()(target, propertyKey);
      ValidateNested({
        each: true,
      })(target, propertyKey);
    } else {
      ValidateNested()(target, propertyKey);
      IsInstance(targetType as new (...args: any[]) => any)(
        target,
        propertyKey,
      );
    }
    Type(() => type)(target, propertyKey);
  };
}
