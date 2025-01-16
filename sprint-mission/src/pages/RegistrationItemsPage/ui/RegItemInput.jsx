import "./RegItemInput.css";
import { Typo, typoStyles } from "../../../shared/Typo/Typo";

export function RegItemInput({ label, placeholder, type, onInput }) {
  let isEnterPress = false;

  //input에 입력받은 내용 상위 컴포넌트에 전달하고 body 업데이트
  const handleBlur = (e) => {
    if (!isEnterPress) {
      //enter키다운으로 blur되면 handleBlur가 중복 실행되지 않도록 제외함
      //-> 마우스 클릭, Tab키로 포커스 아웃시 실행
      const value = e.target.value.trim();
      console.log("블러이벤트발생!: ", value);
      onInput(value);
      //input값 저장 후, 태그 input일 때만 input값 초기화해주기.
      if (label === "태그") {
        return (e.target.value = "");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      isEnterPress = true; //enter키 눌렀을 때 handleBlur 중복 실행되지 않도록
      e.target.blur();
      const value = e.target.value.trim();
      console.log("키다운이벤트발생!: ", value);
      onInput(value);
      if (label === "태그") {
        return (e.target.value = "");
      }
    }
  };

  return (
    <div className="input-wrapper">
      <Typo
        className={`${typoStyles.text2lgBold} section-text`}
        content={label}
      />

      {type === "textarea" ? (
        <textarea
          className={`textarea-box ${typoStyles.textLgRegular}`}
          type={type}
          placeholder={placeholder}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <input
          className={`input-box ${typoStyles.textLgRegular}`}
          type={type}
          placeholder={placeholder}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
}
