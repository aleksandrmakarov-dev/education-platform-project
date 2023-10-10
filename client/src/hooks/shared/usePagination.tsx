import { useState } from "react";

export type Pagination = {
  page: number;
  limit: number;
};

const defaultValues: Pagination = {
  page: 1,
  limit: 6,
};

export default function usePagination() {
  const [pagination, setPagination] = useState<Pagination>(defaultValues);

  const resetPagination = () => {
    setPagination(defaultValues);
  };

  return {
    pagination,
    setPagination,
    resetPagination,
  };
}
