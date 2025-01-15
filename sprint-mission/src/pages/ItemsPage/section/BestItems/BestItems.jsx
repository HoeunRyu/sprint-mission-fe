import "./BestItems.css";
import { ItemCard } from "../common/ui/ItemCard";
import { ORDER_BY } from "../../../../utils/APIs/getItemsListAPI";
import { Typo, typoStyles } from "../../../../shared/Typo/Typo";
import { useMediaQuery } from "../../../../shared/hooks/useMediaQuery";
import { useItemsFetch } from "../common/hooks/useItemsFetch";
import { useState, useEffect } from "react";

//sizeConfig
const SCREEN_SIZES_TO_PAGE_SIZE = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 4,
};

export function BestItems() {
  const screenSize = useMediaQuery();
  const limit = SCREEN_SIZES_TO_PAGE_SIZE[screenSize];
  const [params, setParams] = useState({
    limit, //현재 screenSize에 해당하는 limit 쿼리로 전달
    sort: ORDER_BY.FAVORITE.value, //정렬 기준: 좋아요순
  });

  //screenSize가 변경될 때 쿼리의 limit만 업데이트
  useEffect(() => {
    setParams((prev) => ({ ...prev, limit }));
  }, [screenSize]);

  //api호출
  const { productList, isLoading } = useItemsFetch(params);

  return (
    <section id="best-items">
      <Typo
        className={`${typoStyles.textXlBold} section-title`}
        content="베스트 상품"
      />
      <div className="cards-box">
        {productList.map((product, idx) => (
          <ItemCard product={product} key={idx} isLoading={isLoading} />
        ))}
      </div>
    </section>
  );
}
