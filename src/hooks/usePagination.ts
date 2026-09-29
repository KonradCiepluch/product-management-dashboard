// src/hooks/usePagination.ts
import { useMemo } from "react";

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage?: number;
  page?: number;
  onPageChange?: (page: number) => void;
}

export function usePagination<T>({
  items,
  itemsPerPage = 5,
  page = 1,
  onPageChange,
}: UsePaginationProps<T>) {
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  const validPage = Math.min(Math.max(1, page), totalPages);

  const paginatedItems = useMemo(() => {
    const startIndex = (validPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, validPage, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    const targetPage = Math.min(Math.max(1, newPage), totalPages);
    onPageChange?.(targetPage);
  };

  return {
    paginatedItems,
    currentPage: validPage,
    totalPages,
    totalItems: items.length,
    itemsPerPage,
    handlePageChange,
    nextPage: () => handlePageChange(validPage + 1),
    prevPage: () => handlePageChange(validPage - 1),
    canNextPage: validPage < totalPages,
    canPrevPage: validPage > 1,
  };
}
