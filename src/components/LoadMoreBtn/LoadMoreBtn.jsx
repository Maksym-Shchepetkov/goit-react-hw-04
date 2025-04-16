import s from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ page, setPage }) => {
  return (
    <div className={s.wrap}>
      <button type="button" className={s.btn} onClick={() => setPage(page + 1)}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
