import { useEffect, useState, useRef } from "react";

// 드롭다운 옵션들이 상황에 따라 달라지기 때문에 prop으로 받도록 설정
// prop으로 내려주는 옵션 개수에 제한 없음
interface DropdownProps {
  options: string[];
}

const dropdownIcon = "/icons/ic_arrow_down.svg";

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 열기/닫기 토글 함수
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // 드롭다운 옵션 변경 함수
  const handleDropdownChange = (option: string) => {
    setSelectedOption(option);
  };

  // 옵션 클릭 시 실행되는 함수, 드롭다운 옵션 변경 후 드롭다운 닫음
  const handleOptionClick = (option: string) => {
    handleDropdownChange(option);
    setIsOpen(false);
  };

  // 드롭다운 영역 외부 클릭을 감지해서 드롭다운 닫음
  const handleDropdown = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDropdown);
    return () => {
      document.removeEventListener("mousedown", handleDropdown);
    };
  }, []);

  return (
    <div className="relative cursor-pointer items-center" ref={dropdownRef}>
      <div
        className="flex h-[45px] w-[140px] cursor-pointer items-center justify-between rounded-lg bg-gray50 px-5 text-gray-800 transition-all duration-500 hover:bg-gray-200"
        onClick={toggleDropdown}
      >
        {selectedOption}
        <img
          src={dropdownIcon}
          alt="드롭다운 아이콘"
          // isOpen 상태에 따라 아이콘 회전 애니메이션 추가
          className={`ml-2 transform transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>
      {isOpen && (
        <div className="absolute top-full mt-1.5 w-[140px] rounded-lg bg-white p-1.5 text-gray-800">
          {/* 드롭다운 옵션 목록 */}
          {options.map((option, index) => (
            <div
              key={option}
              className={`cursor-pointer border-solid py-2.5 text-center transition-all duration-500 hover:bg-green-50 hover:text-green300 ${index !== options.length - 1 ? "border-b border-solid border-gray-100" : ""}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
