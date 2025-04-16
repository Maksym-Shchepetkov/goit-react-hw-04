import s from './ImageModal.module.css';
import download from '../../assets/downoad.jpg';
import { useEffect } from 'react';

const ImageModal = ({ photo, closeModal }) => {
  const handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      return closeModal();
    }
  };

  useEffect(() => {
    const escCloseModal = e => {
      if (e.key === 'Escape') {
        return closeModal();
      }
    };

    document.addEventListener('keydown', escCloseModal);

    return () => {
      document.removeEventListener('keydown', escCloseModal);
    };
  }, []);

  return (
    <div className={s.backdrop} onClick={handleCloseModal}>
      <div className={s.modal}>
        <p className={s.par}>{photo.alt_description}</p>
        <a
          href={photo.links.download_location}
          className={s.link}
          target="_blank"
        >
          <img src={download} alt="download" className={s.linkMessage} />
        </a>
        <img src={photo.urls.regular} alt="test" className={s.reg} />
      </div>
    </div>
  );
};

export default ImageModal;
