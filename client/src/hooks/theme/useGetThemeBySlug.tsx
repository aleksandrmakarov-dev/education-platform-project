import { useQuery } from "@tanstack/react-query";
import { queryNames } from "../../lib/constants";
import ThemesService from "../../services/themes.service";

type Params = {
  themeSlug?: string;
};

export default function useGetThemeBySlug({ themeSlug }: Params) {
  return useQuery({
    queryKey: [queryNames.theme.bySlug, themeSlug],
    queryFn: async () => {
      return await ThemesService.getBySlug(themeSlug!);
    },
    enabled: !!themeSlug,
  });
}
