import { UserI } from 'models';

export const formatFio = (fio: Pick<UserI, 'firstName' | 'lastName' | 'patronymicName'>) => {
  const { lastName, firstName, patronymicName } = fio;

  return `${lastName || ''} \
    ${(firstName && `${firstName.slice(0, 1)}.`) || ''} \
    ${(patronymicName && `${patronymicName.slice(0, 1)}.`) || ''}`;
};
