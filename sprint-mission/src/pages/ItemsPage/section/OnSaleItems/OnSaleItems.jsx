import "./OnSaleItems.css";
import { SearchItems } from "./ui/SearchItems";
import { PostItems } from "./ui/PostItems";
import { SortItems } from "./ui/SortItems";
import { ItemCard } from "../common/ui/ItemCard";
import { PaginationItems } from "./ui/PaginationItems";
import { Typo, typoStyles } from "../../../../shared/Typo/Typo";
import { useMediaQuery } from "../../../../shared/hooks/useMediaQuery";
import { useItemsFetch } from "../common/hooks/useItemsFetch";
import { useCallback, useEffect, useState } from "react";

//sizeConfig
const SCREEN_SIZES_TO_PAGE_SIZE = {
  MOBILE: 4,
  TABLET: 6,
  DESKTOP: 10,
};

export function OnSaleItems() {
  const screenSize = useMediaQuery();
  const limit = SCREEN_SIZES_TO_PAGE_SIZE[screenSize];
  const [params, setParams] = useState({
    limit, //현재 screenSize에 해당하는 limit 쿼리로 전달
  });

  //screenSize가 변경될 때 쿼리의 limit 업데이트
  useEffect(() => {
    setParams((prev) => ({ ...prev, limit }));
  }, [screenSize]);

  /**
   * 파라미터 업데이트
   * @description 기존의 파라미터 복사, 새로운 파라미터를 기존 상태에 추가(덮어씌우기)
   */
  const updateParams = useCallback((newParams) => {
    setParams((prev) => ({ ...prev, ...newParams })); //FIXME: 페이지네이션 동작이 어색해서 page 파라미터 업데이트 방식을 수정해야할 것 같은데 잘 모르겠다
  }, []);

  //api 호출
  const { productList, totalPages, isLoading } = useItemsFetch(params);
  const totalPageCount = totalPages; //백엔드에서 계산해둔 전체 페이지 수 받아오기

  return (
    <section id="on-sale-items">
      <div className="section-top">
        <Typo
          className={`${typoStyles.textXlBold} section-title`}
          content="판매 중인 상품"
        />
        <div className="utility-box">
          <SearchItems onSearch={(keyword) => updateParams({ keyword })} />
          <PostItems />
          <SortItems onSortChange={(sort) => updateParams({ sort })} />
        </div>
      </div>

      <div className="cards-box">
        {productList.map((product, idx) => (
          <ItemCard product={product} key={idx} isLoading={isLoading} />
        ))}
      </div>

      <PaginationItems
        currentPage={params.page}
        totalPageCount={totalPageCount}
        onPageChange={(page) => updateParams({ page })}
      />
    </section>
  );
}
