"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProductsHeaderProps {
  totalCount: number;
  onAddProduct: () => void;
}

export function ProductsHeader({
  totalCount,
  onAddProduct,
}: ProductsHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4 lg:mb-6">
      <div>
        <h1 className="mb-1 font-sans text-xl font-semibold text-neutral-950">
          Produkty
        </h1>
        <p className="text-sm text-neutral-500">
          {totalCount} produktów w katalogu
        </p>
      </div>
      <Button variant="brand" onClick={onAddProduct}>
        <Plus className="h-4 w-4" />
        Dodaj produkt
      </Button>
    </div>
  );
}
