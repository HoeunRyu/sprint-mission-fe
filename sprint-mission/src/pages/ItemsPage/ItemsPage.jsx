import "./ItemsPage.css";
// import { BestItems } from "./section/BestItems/BestItems";
import { OnSaleItems } from "./section/OnSaleItems/OnSaleItems";
import { ItemsPageLayout } from "./ItemsPageLayout";

//XXX: 미션6에서는 베스트상품 구현x
export function ItemsPage() {
  return (
    <ItemsPageLayout>
      {/* <BestItems /> */}
      <OnSaleItems />
    </ItemsPageLayout>
  );
}
