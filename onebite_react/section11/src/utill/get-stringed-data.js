export const getStringedDate = targetDate => {
  // 날짜형식 변경 함수
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  // 월 또는 일이 한자리 수일 경우 앞에 0을 붙여주는 코드
  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }
  return `${year}-${month}-${date}`;
};
