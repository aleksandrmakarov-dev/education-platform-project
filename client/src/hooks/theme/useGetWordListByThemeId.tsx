import { useQuery } from "@tanstack/react-query";
import { queryNames } from "../../lib/constants";
import ThemesService from "../../services/themes.service";
import { Pagination } from "../shared/usePagination";
import { Search } from "../shared/useSearch";

type Params = {
  themeId?: string;
  pagination?: Pagination;
  search?: Search;
};

export default function useGetWordListByThemeId({ themeId }: Params) {
  return useQuery({
    queryKey: [queryNames.word.list, themeId],
    queryFn: async () => {
      return await ThemesService.getWordsByThemeId({
        identifier: themeId!,
      });
    },
    enabled: !!themeId,
  });
}
