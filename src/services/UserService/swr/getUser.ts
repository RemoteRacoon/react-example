/* eslint-disable react-hooks/rules-of-hooks */
import { UserI } from 'models';
import { ApiOptions } from 'shared/utils/api';
import { getToken } from 'shared/utils/auth';
import useSWR from 'swr';
import { PublicConfiguration } from 'swr/dist/types';
import UserService from '..';

/**
 * If no id passed, currently authorized user data requested
 * @param id 
 * @param options 
 * @param apiOptions 
 * @returns {}
 */
const getUser = (
  id?: number,
  options?: Partial<PublicConfiguration<any, any, any>>,
  apiOptions?: ApiOptions
) => {
  const hasToken = !!getToken();
  // If no token found, don't send the request
  const { data, error, mutate } = useSWR(hasToken ? UserService.rootPrefix : null, UserService.swr().getUser(id, apiOptions), options)

  return {
    user: data?.user as UserI,
    isUserLoading: !data && !error,
    error,
    mutateUser: mutate
  }
}

export default getUser;