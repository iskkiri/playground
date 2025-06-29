import './slide-auto-play.scss';

const list = [...Array(8)].map((_, i) => i + 1);

interface SlideAutoPlayProps {
  isBidirection?: boolean;
}

export default function SlideAutoPlay({ isBidirection = false }: SlideAutoPlayProps) {
  return (
    <div className="slide-auto-play">
      {/* 8개의 아이템을 16초간 이동 => 하나의 아이템이 사라지는데 걸리는 시간 2초 */}
      <ul className="slide-auto-play__list">
        {[...list, ...list].map((item, i) => (
          <li key={i} className="slide-auto-play__item">
            Slide item {item}
          </li>
        ))}
      </ul>

      {/* reverse */}
      {isBidirection && (
        <ul className="slide-auto-play__list slide-auto-play__list--reverse">
          {[...list, ...list].reverse().map((item, i) => (
            <li key={i} className="slide-auto-play__item">
              Slide item {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
