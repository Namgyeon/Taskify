// 날짜를 YYYY-MM-DD HH:MM 형식으로 변환하는 함수
export const formatDateForAPI = (date: Date): string => {
  const kstTime = new Date(date.getTime());

  const year = kstTime.getUTCFullYear();
  const month = String(kstTime.getUTCMonth() + 1).padStart(2, "0");
  const day = String(kstTime.getUTCDate()).padStart(2, "0");
  const hours = String(kstTime.getUTCHours()).padStart(2, "0");
  const minutes = String(kstTime.getUTCMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const formatDateForCardAPI = (date: Date): string => {
  // 한국 시간대 보정 (+9시간)
  const kstOffset = 9 * 60 * 60 * 1000; // 9시간
  const kstTime = new Date(date.getTime() + kstOffset);

  const year = kstTime.getUTCFullYear();
  const month = String(kstTime.getUTCMonth() + 1).padStart(2, "0");
  const day = String(kstTime.getUTCDate()).padStart(2, "0");
  const hours = String(kstTime.getUTCHours()).padStart(2, "0");
  const minutes = String(kstTime.getUTCMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
