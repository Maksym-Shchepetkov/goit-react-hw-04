import s from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ collection, openModal }) => {
  return (
    <>
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
      </ul>
    </>
  );
};

export default ImageGallery;
