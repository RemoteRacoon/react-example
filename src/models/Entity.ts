import * as yup from 'yup';
import { omit, pick } from 'lodash';

export interface EntityI {
  id: Id
}

export default abstract class Entity {
  id: Id;

  static validationSchema: yup.AnyObjectSchema | object;

  static toDTO<T extends Entity>(entity: T, pickFields?: string[], omittableFields?: string[]) {
    const $self = Entity;
    const result = {};

    for (const [key, value] of Object.entries(entity)) {
      if ((value instanceof Entity)) {
        result[key] = $self.toDTO(value, pickFields, omittableFields)
      } else {
        result[key] = value;
      }
    }

    if (omittableFields) {
      return omit(result, omittableFields);
    }

    if (pickFields) {
      return pick(result, pickFields);
    }

    return result;
  }

  private static setDefaultValue<T extends Entity>(entity: T, k: string) {
    const [, value] = Object.entries(entity).find(([key]) => key === k);
    return value;
  }

  private static extractNestedProps(fields: string[], key: string) {
    const result = [];

    fields.forEach(field => {
      const [, value] = field.split(`${key}.`);
      if (value) {
        result.push(value);
      }
    });

    return result;
  }

  static generateFormValues<T extends Entity>(entity: T, pickFields?: string[], omittableFields?: string[]) {
    const $self = Entity;
    const result = {};

    for (const [key, value] of Object.entries(entity)) {
      if (value instanceof Entity) {
        result[key] = $self.generateFormValues(
          value,
          $self.extractNestedProps(pickFields || [], key),
          $self.extractNestedProps(omittableFields || [], key)
        );
      } else {
        result[key] = $self.setDefaultValue(entity, key);
      }
    }

    if (pickFields) {
      return pick(result, pickFields);
    }

    if (omittableFields) {
      return omit(result, omittableFields);
    }

    return result;

  }
}