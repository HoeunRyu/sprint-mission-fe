import "./RegistrationItemsPage.css";
import { RegItemInput } from "./ui/RegItemInput";
import { Typo, typoStyles } from "../../shared/Typo/Typo";
import { useCallback, useState } from "react";
import { TagWithClose } from "./ui/TagWithClose";
import { createItemAPI } from "../../utils/APIs/createItemAPI";
import { useNavigate } from "react-router-dom";

export function RegistrationItemsPage() {
  const [tags, setTags] = useState([]);
  const [body, setBody] = useState({});
  const navi = useNavigate();

  //tags 배열에 태그 추가
  const addTags = useCallback(
    (newTag) => {
      if (!newTag || tags.includes(newTag)) return; //빈 문자열||중복태그 추가하지 않음

      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      setBody((prev) => ({ ...prev, tags: updatedTags })); //body의 tags 값도 업데이트된 배열로 같이 수정해주기
    },
    [tags]
  );

  //tags 배열에서 태그 삭제
  const handleDeleteTag = useCallback(
    (selectedTag) => {
      //클릭이벤트 발생하면 해당 태그를 tags배열에서 삭제하기
      const updatedTags = tags.filter((tag) => tag !== selectedTag);
      setTags(updatedTags);
      setBody((prev) => ({ ...prev, tags: updatedTags })); //body의 tags 값도 업데이트된 배열로 같이 수정해주기
    },
    [tags]
  );

  //태그 업데이트 확인해보자
  console.log("태그 업데이트: ", tags);

  //body 업데이트
  const updateBody = useCallback((newParams) => {
    setBody((prev) => ({ ...prev, ...newParams }));
  }, []);

  //바디 업데이트 확인해보자
  console.log("바디 업데이트: ", body);

  //post api 호출
  const postItem = useCallback(async () => {
    try {
      console.log("body :", body); //보내기 전에 어떤 상태로 바디 보내는지 확인
      const response = await createItemAPI(body);
      console.log(response);
      const itemId = response.data._id;
      navi(`/items/${itemId}`); //이거 아닌가? ??
      // Navigate(`/items/${itemId}`); // 이거 아닌디 맞나 ㅋ 아닌디 해ㅑ보셈 궁금
    } catch (error) {
      console.error("상품 등록하기 오류: ", error);
    }
  });

  //필수 필드 다 입력받으면 등록 버튼 활성화
  const activateRegBtn = () => {
    const { name, description, price } = body;
    const isValid = Boolean(name && description && price);

    const regBtnClassName = isValid
      ? `${typoStyles.textLgSemibold} active`
      : `${typoStyles.textLgSemibold}`;

    return { isValid, regBtnClassName };
  };

  const { isValid, regBtnClassName } = activateRegBtn();

  return (
    <div className="content" id="registration-items-page">
      <div className="section-top">
        <Typo
          className={`${typoStyles.textXlBold} section-text`}
          content="상품 등록하기"
        />
        <button
          id="reg-btn"
          className={regBtnClassName}
          disabled={!isValid}
          onClick={postItem}
        >
          등록
        </button>
      </div>

      <div className="section-main">
        <div className="input-container">
          <RegItemInput
            label="상품명"
            placeholder="상품명을 입력해주세요"
            type="text"
            onInput={(name) => updateBody({ name })}
          />
          <RegItemInput
            label="상품 소개"
            placeholder="상품 소개를 입력해주세요"
            type="textarea"
            onInput={(description) => updateBody({ description })}
          />
          <RegItemInput
            label="판매가격"
            placeholder="판매 가격을 입력해주세요"
            type="text"
            onInput={(price) => updateBody({ price })}
          />
          <RegItemInput
            label="태그"
            placeholder="태그를 입력해주세요"
            type="text"
            onInput={(tags) => addTags(tags)}
          />
        </div>
        <div className="tag-chip-wrapper">
          {tags.map((tag, idx) => (
            <TagWithClose
              tag={tag}
              handleDeleteTag={handleDeleteTag}
              key={idx}
            ></TagWithClose>
          ))}
        </div>
      </div>
    </div>
  );
}
