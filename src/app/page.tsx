import { Suspense } from "react";
import { ProductsView } from "@/components/products/ProductsView";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <ProductsView />;
    </Suspense>
  );
}
