import s from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';
import ImageModal from '../ImageModal/ImageModal.jsx';

const ImageGallery = ({
  openGallery,
  collection,
  openModal,
  closeModal,
  modalImgValue,
  modalValue,
  desc,
  setDesc,
  link,
  setLink,
}) => {
  return (
    <>
      {openGallery && (
        <ul className={s.container}>
          {collection.map(image => {
            return (
              <li
                key={image.id}
                className={s.wrap}
                onClick={() => openModal(image)}
              >
                <ImageCard
                  dataImage={image.urls.small}
                  dataAlt={image.alt_description}
                  dataName={image.user.name}
                  dataLikes={image.likes}
                />
              </li>
            );
          })}
          {modalValue && (
            <ImageModal photo={modalImgValue} closeModal={closeModal} />
          )}
        </ul>
      )}
    </>
  );
};

export default ImageGallery;
