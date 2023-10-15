import { useQuery } from "@tanstack/react-query";
import { queryNames } from "../../lib/constants";
import DictionaryService from "../../services/dictionaries.service";
import { Pagination } from "../shared/usePagination";
import { Search } from "../shared/useSearch";

type Params = {
  dictionaryId?: string;
  pagination: Pagination;
  search?: Search;
};

export default function useGetThemeListByDictionaryId({
  dictionaryId,
  pagination,
  search,
}: Params) {
  return useQuery({
    queryKey: [queryNames.theme.list, pagination, search],
    queryFn: async () => {
      const params = { ...pagination, ...search };
      return await DictionaryService.getThemesByDictionaryId({
        identifier: dictionaryId!,
        searchParams: params,
      });
    },
    enabled: !!dictionaryId,
  });
}
