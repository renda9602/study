import { useNavigate } from 'react-router-dom';
import { getEmotionImg } from '../utill/get-emotion-image';
import Button from './Button';
import './DirayItem.css';

// 일기 아이템 컴포넌트
const DirayItem = ({ id, emotionId, createdDate, content }) => {
  // 라우터 이동을 위해 useNavigate 훅 사용
  const nav = useNavigate();

  return (
    <div className="DirayItem">
      <div
        className={`img_section img_section${emotionId}`}
        onClick={() => {
          nav(`/diary/${id}`);
        }}
      >
        <img
          src={getEmotionImg(emotionId)}
          className={!getEmotionImg(emotionId) ? 'noneImg' : ''}
          alt=""
        />
      </div>
      <div
        className="info_section"
        onClick={() => {
          nav(`/diary/${id}`);
        }}
      >
        <div className="created_date">
          {/* // 날짜 포맷 변경 */}
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>
      <div className="button_section">
        <Button
          onClick={() => {
            nav(`/edit/${id}`);
          }}
          text={'수정하기'}
        />
      </div>
    </div>
  );
};

export default DirayItem;
