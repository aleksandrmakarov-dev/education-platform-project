import { useState } from "react";

export type Search = {
  searchQuery?: string;
};

const defaultValues: Search = {
  searchQuery: undefined,
};

export default function useSearch() {
  const [search, setSearch] = useState<Search>();
  const resetSearch = () => {
    setSearch(defaultValues);
  };
  return {
    search,
    setSearch,
    resetSearch,
  };
}
