import s from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ nextPage }) => {
  return (
    <div className={s.wrap}>
      <button type="button" className={s.btn} onClick={nextPage}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
