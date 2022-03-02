import { useRouter } from "next/router";
import { addToQueryString, omitFromQueryString, queryStringToObject } from "shared/utils/url";

const useQueryParamModal = (param: string) => {
  const router = useRouter();

  const open = (params?: { [key: string]: string }) => {
    router.push({
      pathname: router.pathname,
      search: addToQueryString(router.pathname.search, { [`${param}`]: true, ...params })
    });
  }

  const close = () => {
    router.push({
      pathname: router.pathname,
      search: omitFromQueryString(router.pathname.search, [param])
    });
  }

  const isOpen = () => {
    return !!router.query[param];
  }

  return {
    open,
    close,
    isOpen,
  }
}

export default useQueryParamModal;