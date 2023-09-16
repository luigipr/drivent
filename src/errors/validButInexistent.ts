import { ApplicationError } from '@/protocols';

export function validButInexistentError(details: string): ApplicationError {
  return {
    name: 'BadRequest',
    message: `Invalid data: ${details}`,
  };
}
