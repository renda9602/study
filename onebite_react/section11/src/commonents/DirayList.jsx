import Button from './Button';
import DirayItem from './DirayItem';
import './DirayList.css';

const DirayList = ({ data }) => {
  return (
    <div className="DirayList">
      <div className="menu_bar">
        <select>
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
        </select>
        <Button type={'POSITIVE'} text={'새 일기 쓰기'} />
      </div>
      <div className="list_wrapper">
        {/* 반복리스트 */}
        {data.map(item => (
          <DirayItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DirayList;
