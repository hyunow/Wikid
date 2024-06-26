import React, { InputHTMLAttributes } from "react";

const searchIcon = "/icons/ic_search.svg";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "email" | "password" | "search";
}

const Input: React.FC<InputProps> = ({ type = "text", ...rest }) => {
  const commonClasses =
    "w-full bg-gray-50 transition-all duration-500 rounded-lg px-5 py-2.5 hover:bg-gray-200 focus:bg-white";

  // type이 "search"일 때 검색 아이콘과 함께 렌더링되는 input
  const inputElement =
    type === "search" ? (
      <div
        className={`group flex max-w-[800px] gap-4 ${commonClasses} focus-within:bg-white focus-within:ring-1 focus-within:ring-gray-200`}
      >
        <img src={searchIcon} alt="검색 아이콘" />
        <input
          type="search"
          className={`w-full bg-gray-50 transition-all duration-500 focus:bg-white group-hover:bg-gray-200`}
          placeholder="검색어를 입력해 주세요"
          {...rest}
        />
      </div>
    ) : (
      // 그 외의 경우는 같은 input으로 렌더링
      <input
        type={type}
        className={`max-w-[400px] focus:ring-1 focus:ring-gray-200 ${commonClasses}`}
        {...rest}
      />
    );

  return <div>{inputElement}</div>;
};

export default Input;
