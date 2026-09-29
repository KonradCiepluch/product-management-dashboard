import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPaginationRange } from "./utils";

interface TablePaginationProps {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  canNextPage: boolean;
  canPrevPage: boolean;
}

export function ProductsPagination({
  totalItems,
  currentPage,
  totalPages,
  onPageChange,
  canNextPage,
  canPrevPage,
}: TablePaginationProps) {
  const paginationRange = getPaginationRange(currentPage, totalPages);

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between items-center pt-6 lg:p-4 lg:bg-gray-50">
      <p className="mb-4 lg:mb-0 text-xs text-muted-foreground">
        Strona {currentPage} z {totalPages} · {totalItems} produktów
      </p>
      <Pagination className="lg:w-auto lg:m-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              text="Wstecz"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (canPrevPage) onPageChange(currentPage - 1);
              }}
              aria-disabled={!canPrevPage}
              className={`${
                !canPrevPage
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              } gap-1`}
            />
          </PaginationItem>

          {paginationRange.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    if (page === currentPage) return;
                    onPageChange(page);
                  }}
                  className={`cursor-pointer ${page === currentPage ? "bg-blue-600 text-white hover:text-neutral-950" : ""}`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              text="Dalej"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (canNextPage) onPageChange(currentPage + 1);
              }}
              aria-disabled={!canNextPage}
              className={`${
                !canNextPage
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              } gap-1`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
