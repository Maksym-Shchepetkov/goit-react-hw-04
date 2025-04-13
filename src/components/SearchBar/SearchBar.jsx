import { useEffect, useState } from 'react';
import s from './SearchBar.module.css';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClose, setIsClose] = useState(true);
  const [isInput, setIsInput] = useState(false);
  const [animation, setAnimation] = useState(false);

  const handleToggleBoxBtn = () => {
    setIsClose(false);
    setAnimation(true);
  };

  const handleAnimationOff = () => {
    setAnimation(false);
    setIsOpen(true);
  };

  const handleInputOn = () => {
    setIsInput(true);
  };

  const handleResetSerchBox = () => {
    setIsOpen(false);
    setIsClose(true);
    setIsInput(false);
    setAnimation(false);
  };

  useEffect(() => {
    const handleFormSubmit = e => {
      e.preventDefault();
      e.target.reset();
    };
  }, []);

  return (
    <header className={s.header}>
      <div
        className={animation ? s.boom : s.isClick}
        onAnimationEnd={handleAnimationOff}
      ></div>
      <button
        onClick={handleToggleBoxBtn}
        className={isClose === true ? s.openBtn : s.isClick}
      >
        Let's Start
      </button>
      <div
        className={isOpen === true ? s.container : s.isClick}
        onAnimationEnd={handleInputOn}
      >
        {isInput === true && (
          <form onChange={() => handleFormSubmit()} className={s.headerForm}>
            <button onClick={handleResetSerchBox} className={s.back}>
              Back to Future
            </button>
            <input
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              className={s.headerInput}
            />
            <button type="submit" className={s.headerBtn}>
              {<FaMagnifyingGlass className={s.headerIcon} />}
            </button>
          </form>
        )}
      </div>
    </header>
  );
};

export default SearchBar;
