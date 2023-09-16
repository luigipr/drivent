import { Address, Enrollment } from '@prisma/client';
import { AxiosResponse } from 'axios';
import { request } from '@/utils/request';
//import { notFoundError } from '@/errors';
import { addressRepository, CreateAddressParams, enrollmentRepository, CreateEnrollmentParams } from '@/repositories';
import { exclude } from '@/utils/prisma-utils';
import { validButInexistentError } from '@/errors/validButInexistent';
import { cep } from '@/protocols';

type NewCEP = {
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
};

async function validateCEP(cep: string) {
  const result: AxiosResponse = await request.get(`${process.env.VIA_CEP_API}/${cep}/json/`);

  if (result.status === 200) {
    if (result.data.erro === true) {
      throw validButInexistentError('cep');
    } else {
      return result.data;
    }
  } else if (result.status === 400) {
    throw validButInexistentError('cep');
  }
  return result.data;
}

// TODO - Receber o CEP por parâmetro nesta função.
async function getAddressFromCEP(cep: string): Promise<NewCEP> {
  // FIXME: está com CEP fixo!
  const result: cep = await validateCEP(cep);
  //const cidade = result.localidade;

  const { logradouro, complemento, bairro, localidade, uf } = result;
  const cidade = localidade;
  // if (result.data.erro) {
  //   throw validButInexistentError('cep');
  // }

  // TODO: Tratar regras de negócio e lanças eventuais erros
  // if (!logradouro || !complemento || !bairro || !localidade || !uf) {
  //   throw validButInexistentError('cep');
  // }

  // FIXME: não estamos interessados em todos os campos
  const address: NewCEP = { logradouro, complemento, bairro, cidade, uf };
  return address;
}

async function getOneWithAddressByUserId(userId: number): Promise<GetOneWithAddressByUserIdResult> {
  const enrollmentWithAddress = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollmentWithAddress) throw validButInexistentError('enrollment');

  const [firstAddress] = enrollmentWithAddress.Address;
  const address = getFirstAddress(firstAddress);

  return {
    ...exclude(enrollmentWithAddress, 'userId', 'createdAt', 'updatedAt', 'Address'),
    ...(!!address && { address }),
  };
}

type GetOneWithAddressByUserIdResult = Omit<Enrollment, 'userId' | 'createdAt' | 'updatedAt'>;

function getFirstAddress(firstAddress: Address): GetAddressResult {
  if (!firstAddress) return null;

  return exclude(firstAddress, 'createdAt', 'updatedAt', 'enrollmentId');
}

type GetAddressResult = Omit<Address, 'createdAt' | 'updatedAt' | 'enrollmentId'>;

async function createOrUpdateEnrollmentWithAddress(params: CreateOrUpdateEnrollmentWithAddress) {
  const enrollment = exclude(params, 'address');
  enrollment.birthday = new Date(enrollment.birthday);
  const address = getAddressForUpsert(params.address);

  // TODO - Verificar se o CEP é válido antes de associar ao enrollment.
  //getAddressFromCEP(address.cep);
  await validateCEP(params.address.cep);

  const newEnrollment = await enrollmentRepository.upsert(params.userId, enrollment, exclude(enrollment, 'userId'));

  await addressRepository.upsert(newEnrollment.id, address, address);
}

function getAddressForUpsert(address: CreateAddressParams) {
  return {
    ...address,
    ...(address?.addressDetail && { addressDetail: address.addressDetail }),
  };
}

export type CreateOrUpdateEnrollmentWithAddress = CreateEnrollmentParams & {
  address: CreateAddressParams;
};

export const enrollmentsService = {
  getOneWithAddressByUserId,
  createOrUpdateEnrollmentWithAddress,
  getAddressFromCEP,
};
