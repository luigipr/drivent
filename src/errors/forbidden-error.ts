import { ApplicationError } from '@/protocols';

export function forbiddenError(details: string): ApplicationError {
  return {
    name: 'Forbidden',
    message: `This action is forbidden: ${details}`,
  };
}
