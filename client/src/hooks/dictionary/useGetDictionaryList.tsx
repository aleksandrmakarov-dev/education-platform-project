import { useQuery } from "@tanstack/react-query";
import { queryNames } from "../../lib/constants";
import DictionaryService from "../../services/dictionaries.service";
import { Pagination } from "../shared/usePagination";
import { Search } from "../shared/useSearch";

type Params = {
  pagination: Pagination;
  search?: Search;
};

export default function useGetDictionaryList({ pagination, search }: Params) {
  return useQuery({
    queryKey: [queryNames.dictionary.list, pagination, search],
    queryFn: async () => {
      const params = { ...pagination, ...search };
      return await DictionaryService.getAll(params);
    },
  });
}
