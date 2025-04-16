import { use, useEffect, useState } from 'react';
import handleGetPhotos from '../services/api';
import s from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClose, setIsClose] = useState(true);
  const [isInput, setIsInput] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [searchingValue, setSearchingValue] = useState({ search: '' });
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [modalImg, setModalImg] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    const handleFetchPhotos = async () => {
      try {
        setIsLoading(true);
        const data = await handleGetPhotos(query, page);
        setPhotos(prev => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        setWrong(true);
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length) {
      handleFetchPhotos();
    }
  }, [query, page]);

  const handleOpenModal = src => {
    setModalImg(src);
    setIsModal(true);
  };

  const handleCloseModal = () => {
    setModalImg('');
    setIsModal(false);
  };
  // const chosen = photos.filter(image => image.index);
  // setIsModal(true);
  // return setPhotos(chosen);

  return (
    <div>
      <SearchBar
        open={isOpen}
        setOpen={setIsOpen}
        close={isClose}
        setClose={setIsClose}
        input={isInput}
        setInput={setIsInput}
        anim={animation}
        setAnim={setAnimation}
        search={searchingValue}
        setSearch={setSearchingValue}
        message={error}
        setMessage={setError}
        queryValue={setQuery}
        updatePhotos={setPhotos}
        updatePage={setPage}
        total={setTotalPages}
      />
      {wrong && <ErrorMessage />}
      {isloading && <Loader />}
      <ImageGallery
        openGallery={isOpen}
        collection={photos}
        modalImgValue={modalImg}
        modalValue={isModal}
        openModal={handleOpenModal}
        closeModal={handleCloseModal}
        desc={desc}
        setDesc={setDesc}
        link={link}
        setLink={setLink}
      />
      {isloading && <Loader />}
      {page < totalPages && !isloading && (
        <LoadMoreBtn page={page} setPage={setPage} />
      )}
      {/* {isModal && <ImageModal photo={modalImg} closeModal={handleCloseModal} />} */}
    </div>
  );
};

export default App;
