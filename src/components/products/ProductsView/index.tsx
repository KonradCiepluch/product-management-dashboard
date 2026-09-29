"use client";
import { ProductsHeader } from "../ProductsHeader";
import { ProductsPagination } from "../ProductsPagination";
import { ProductsTable } from "../ProductsTable";
import { MOCK_PRODUCTS } from "@/data/mock-products";
import { ProductsListMobile } from "../ProductsListMobile";
import { AddProductModal } from "../AddProductModal";
import { useProductsView } from "./hooks";

export const ProductsView = () => {
  const {
    isOpen,
    products,
    paginatedItems,
    currentPage,
    totalPages,
    canNextPage,
    canPrevPage,
    handlePageChange,
    handleAddProduct,
    handleOpen,
  } = useProductsView(MOCK_PRODUCTS);

  return (
    <section className="max-w-360 mx-auto py-6 px-4 lg:py-12.5 lg:px-25">
      <ProductsHeader
        totalCount={products.length}
        onAddProduct={() => handleOpen(true)}
      />
      <div className="lg:ring-1 lg:ring-neutral-200  lg:rounded-lg overflow-hidden">
        <ProductsListMobile products={paginatedItems} />
        <ProductsTable products={paginatedItems} />
        <ProductsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          canNextPage={canNextPage}
          canPrevPage={canPrevPage}
          totalItems={products.length}
        />
      </div>
      <AddProductModal
        isOpen={isOpen}
        handleOpen={handleOpen}
        handleAddProduct={handleAddProduct}
        existingProducts={products}
      />
    </section>
  );
};
