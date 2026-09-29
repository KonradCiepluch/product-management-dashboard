import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types/product";
import { formatPrice } from "./utils";

interface ProductTableProps {
  products: Product[];
}

export function ProductsTable({ products }: ProductTableProps) {
  return (
    <Table className="hidden lg:table">
      <TableHeader>
        <TableRow className="h-10 border-b bg-gray-50 hover:bg-[#F9FAFB]">
          <TableHead className="w-[28.79%]">Nazwa</TableHead>
          <TableHead className="w-[14.24%]">SKU</TableHead>
          <TableHead className="w-[14.24%]">Kategoria</TableHead>
          <TableHead className="w-[14.24%]">Cena Brutto</TableHead>
          <TableHead className="w-[14.24%]">Status</TableHead>
          <TableHead className="w-[14.24%]">Magazyn</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={6}
              className="h-24 text-center text-sm text-[#737373]"
            >
              Brak produktów do wyświetlenia.
            </TableCell>
          </TableRow>
        ) : (
          products.map((product) => (
            <TableRow
              key={product.id}
              className="h-12 border-b transition-colors hover:bg-neutral-50/50"
            >
              <TableCell className="px-4 py-2 text-sm font-medium text-foreground">
                {product.name}
              </TableCell>

              <TableCell className="px-4 py-2 text-xs font-normal text-muted-foreground">
                {product.sku}
              </TableCell>

              <TableCell className="px-4 py-2 text-sm font-normal text-muted-foreground">
                {product.category}
              </TableCell>

              <TableCell className="px-4 py-2 text-sm font-medium text-foreground">
                {formatPrice(product.grossPrice, product.currency)}
              </TableCell>

              <TableCell className="px-4 py-2">
                <Badge
                  variant={product.isAvailable ? "available" : "unavailable"}
                >
                  {product.isAvailable ? "Dostępny" : "Niedostępny"}
                </Badge>
              </TableCell>

              <TableCell className="px-4 py-2 text-sm font-normal text-foreground">
                {product.stockQuantity !== undefined &&
                product.stockQuantity !== null
                  ? product.stockQuantity
                  : "—"}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
    // </div>
  );
}
