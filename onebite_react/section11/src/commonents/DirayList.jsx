import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import DirayItem from './DirayItem';
import './DirayList.css';

const DirayList = ({ data }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState('latest');

  /// 정렬 기준 선택
  const onChangeSortType = e => {
    setSortType(e.target.value);
  };

  // 정렬 기준에 따라 데이터 정렬
  const getSortedData = () => {
    // toSorted
    // 원본 배열을 변경하지 않고 정렬된 새 배열을 반환 (sort()와 달리 비파괴적 메서드)
    return data.toSorted((a, b) => {
      // 비교 함수를 사용하여 요소를 비교하고 정렬 순서를 결정
      if (sortType === 'oldest') {
        return Number(a.createdDate) - Number(b.createdDate);
      } else {
        return Number(b.createdDate) - Number(a.createdDate);
      }
    });
  };

  // 정렬된 데이터 가져오기
  const sortedData = getSortedData();

  return (
    <div className="DirayList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
        </select>
        <Button
          type={'POSITIVE'}
          onClick={() => {
            nav('/new');
          }}
          text={'새 일기 쓰기'}
        />
      </div>
      <div className="list_wrapper">
        {/* 반복리스트 */}
        {sortedData.map(item => (
          <DirayItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DirayList;
