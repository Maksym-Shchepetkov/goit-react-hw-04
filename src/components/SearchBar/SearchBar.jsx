import { useEffect } from 'react';
import s from './SearchBar.module.css';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import toast, { Toaster } from 'react-hot-toast';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';

const SearchBar = ({
  open,
  setOpen,
  close,
  setClose,
  input,
  setInput,
  anim,
  setAnim,
  search,
  setSearch,
  message,
  setMessage,
  queryValue,
  updatePhotos,
  updatePage,
  total,
}) => {
  const handleToggleBoxBtn = () => {
    setClose(false);
    setAnim(true);
  };

  const handleAnimationOff = () => {
    setAnim(false);
    setOpen(true);
  };

  const handleInputOn = () => {
    setInput(true);
  };

  const handleResetSerchBox = () => {
    setOpen(false);
    setClose(true);
    setInput(false);
    setAnim(false);
    updatePhotos([]);
    updatePage(1);
    total(0);
  };

  const handleChange = e => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (search.search.trim() === '') {
      setMessage(
        toast.error(
          'Please fill search field',

          {
            duration: 4000,
            position: 'top-right',
          }
        )
      );
      return;
    }

    queryValue(search.search);
    updatePhotos([]);
    updatePage(1);

    return setSearch({ search: '' });
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 4000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <header className={s.header}>
      <Toaster />
      <div
        className={anim ? s.boom : s.isClick}
        onAnimationEnd={handleAnimationOff}
      ></div>
      <button
        onClick={handleToggleBoxBtn}
        className={close === true ? s.openBtn : s.isClick}
      >
        Let's Start
      </button>
      <div
        className={open === true ? s.container : s.isClick}
        onAnimationEnd={handleInputOn}
      >
        {input === true && (
          <form id="test" onSubmit={handleFormSubmit} className={s.headerForm}>
            <input
              type="text"
              id="testInput"
              name="search"
              value={search.search}
              onChange={handleChange}
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              className={s.headerInput}
            />

            <button name="button" type="submit" className={s.headerBtn}>
              <FaMagnifyingGlass className={message ? s.red : s.headerIcon} />
            </button>

            <button
              type="button"
              onClick={handleResetSerchBox}
              className={s.back}
            >
              Back to Start
            </button>
          </form>
        )}
      </div>
    </header>
  );
};

export default SearchBar;
