import { useState, useEffect } from "react";
import type { Product } from "@/types/product";
import { useQueryState, parseAsInteger } from "nuqs";
import { usePagination } from "@/hooks/usePagination";

export const useProductsView = (mockProducts: Product[]) => {
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger
      .withDefault(1)
      .withOptions({ shallow: false, history: "replace" }),
  );

  const [products, setProducts] = useState(mockProducts);

  const [isOpen, setIsOpen] = useState(false);

  const {
    paginatedItems,
    currentPage,
    totalPages,
    canNextPage,
    canPrevPage,
    handlePageChange,
  } = usePagination({
    items: products,
    itemsPerPage: 5,
    page,
    onPageChange: (newPage) => setPage(newPage),
  });

  const handleOpen = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const handleAddProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  useEffect(() => {
    if (page !== currentPage) {
      setPage(currentPage);
    }
  }, [page, currentPage, setPage]);

  return {
    isOpen,
    handleOpen,
    products,
    paginatedItems,
    currentPage,
    totalPages,
    canNextPage,
    canPrevPage,
    handlePageChange,
    handleAddProduct,
  };
};
