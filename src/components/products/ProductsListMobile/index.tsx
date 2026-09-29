import { ProductCardMobile } from "@/components/products/ProductCardMobile";
import type { Product } from "@/types/product";

type ProductsListMobileProps = {
  products: Product[];
};

export const ProductsListMobile = ({ products }: ProductsListMobileProps) => {
  if (products.length === 0) return null;

  return (
    <ul className="flex flex-col gap-2 lg:hidden">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCardMobile product={product} />
        </li>
      ))}
    </ul>
  );
};
