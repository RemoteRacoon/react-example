import { UserI } from 'models/User';
import { ApiOptions } from 'shared/utils/api';
import useSWR from 'swr';
import { PublicConfiguration } from 'swr/dist/types';
import UserService from '..';

const useUser = (
  id?: number,
  options?: Partial<PublicConfiguration<any, any, any>>,
  apiOptions?: ApiOptions
) => {
  const { data, error, mutate } = useSWR(UserService.rootPrefix, UserService.swr().getUser(id, apiOptions), options)

  return {
    user: data?.user as UserI,
    isUserLoading: !data && !error,
    error,
    mutateUser: mutate
  }
}

export default useUser;