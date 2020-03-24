import { EcsEntity } from '@store/Models/EcsEntity'
import { Either } from 'monad-maniac'
import * as R from 'ramda'

interface IValidateEntity {
  validateEntity(generation: number): (entity: EcsEntity) => Either.Shape<Error, EcsEntity>
  validateEntity(generation: number, entity: EcsEntity): Either.Shape<Error, EcsEntity>
}

export const validateEntity = R.curryN(
  2,
  (generation: number, entity: EcsEntity): Either.Shape<Error, EcsEntity> => (
    entity.generation === generation
      ? Either.right(entity)
      : Either.left(new Error(`Entity have another generation (request: ${generation}, but have ${entity.generation}`))
  )
) as unknown as IValidateEntity['validateEntity']
