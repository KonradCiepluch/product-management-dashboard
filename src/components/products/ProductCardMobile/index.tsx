import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types/product";

interface ProductCardMobileProps {
  product: Product;
}

export function ProductCardMobile({
  product: {
    name,
    sku,
    isAvailable,
    category,
    grossPrice,
    currency,
    isLimited,
    stockQuantity,
  },
}: ProductCardMobileProps) {
  return (
    <Card className="flex flex-col p-3 gap-2 bg-white border border-[#E5E5E5] rounded-xl shadow-none">
      <div className="flex items-center justify-between gap-2.5 w-full">
        <div className="space-y-0.5">
          <h3 className="mb-1 font-medium text-base text-foreground ">
            {name}
          </h3>
          <p className="text-xs text-muted-foreground uppercase ">{sku}</p>
        </div>
        <Badge variant={isAvailable ? "available" : "unavailable"}>
          {isAvailable ? "Dostępny" : "Niedostępny"}
        </Badge>
      </div>

      <div className="bg-accent rounded-[9px] p-3 grid grid-cols-3 gap-1 w-full text-left">
        <div>
          <span className="mb-1 text-xs text-muted-foreground block">
            Kategoria
          </span>
          <span className="text-sm text-foreground truncate block">
            {category}
          </span>
        </div>

        <div>
          <span className="mb-1 text-xs text-muted-foreground block">
            Cena brutto
          </span>
          <span className="text-sm font-medium text-foreground whitespace-nowrap block">
            {grossPrice.toFixed(2).replace(".", ",")} {currency}
          </span>
        </div>

        <div>
          <span className="mb-1 text-xs text-muted-foreground block">
            Magazyn
          </span>
          <span className="text-sm text-foreground block">
            {isLimited ? stockQuantity : "—"}
          </span>
        </div>
      </div>
    </Card>
  );
}
