import {ArrayDefinition, RuleDef} from 'sanity'

export const required = <T, FieldValue = unknown>(rule: RuleDef<T, FieldValue>) => rule.required()

export const requiredArray: ArrayDefinition['validation'] = (rule) => rule.required().min(1)
