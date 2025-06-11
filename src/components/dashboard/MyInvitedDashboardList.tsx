import MyInvitedEmptyCard from "./MyInvitedEmptyCard";

const MyInvitedDashboardList = () => {
  return (
    <div className="bg-white rounded-lg px-5 md:px-10 py-6">
      <h2 className="text-2xl font-bold text-[#333236]">초대받은 대시보드</h2>
      <div>
        {/* 대시보드초대목록이 없으면 빈카드 노출 */}
        <MyInvitedEmptyCard />
      </div>
    </div>
  );
};

export default MyInvitedDashboardList;
