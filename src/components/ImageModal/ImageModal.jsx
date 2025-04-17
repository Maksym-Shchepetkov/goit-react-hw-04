import s from './ImageModal.module.css';
import download from '../../assets/downoad.jpg';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, image, closeModal }) => {
  if (image.length === 0) {
    return;
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className={s.modal}
      overlayClassName={s.backdrop}
    >
      <p className={s.par}>{image.alt_description}</p>
      <a href={image.links.download} className={s.link}>
        <img src={download} alt="download" className={s.linkMessage} />
      </a>
      <img src={image.urls.regular} alt="" className={s.reg} />
    </Modal>
  );
};

export default ImageModal;
