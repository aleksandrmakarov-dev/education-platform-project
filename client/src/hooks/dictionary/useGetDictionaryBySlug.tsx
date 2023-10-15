import { useQuery } from "@tanstack/react-query";
import { queryNames } from "../../lib/constants";
import DictionaryService from "../../services/dictionaries.service";

type Params = {
  dictionarySlug?: string;
};

export default function useGetDictionaryBySlug({ dictionarySlug }: Params) {
  return useQuery({
    queryKey: [queryNames.dictionary.bySlug, dictionarySlug],
    queryFn: async () => {
      return await DictionaryService.getBySlug(dictionarySlug!);
    },
    enabled: !!dictionarySlug,
  });
}
