import MyInvitedDashboardList from "./MyInvitedDashboardList";

const InvitedDashboardSection = () => {
  return (
    <div className="bg-white rounded-lg px-5 md:px-10 py-6">
      <h2 className="text-2xl font-bold text-[#333236] mb-4">
        초대받은 대시보드
      </h2>
      <div>
        <MyInvitedDashboardList />
      </div>
    </div>
  );
};

export default InvitedDashboardSection;
