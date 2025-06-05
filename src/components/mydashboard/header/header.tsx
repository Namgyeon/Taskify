const Header = () => {
  return (
    <div className="flex justify-between items-center px-3 md:px-8 lg:px-10 py-4">
      <p className="text-lg md:text-xl text-[#333236] font-bold">내 대시보드</p>
      <div className="flex">
        <div className="flex">
          <button>관리</button>
          <button>초대하기</button>
        </div>
        <div className="flex">
          <p>이미지</p>
          <p>이름</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
