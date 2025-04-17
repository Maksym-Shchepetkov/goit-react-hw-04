import { useEffect, useState } from 'react';
import handleGetPhotos from '../services/api';
import s from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const App = () => {
  const [searchingValue, setSearchingValue] = useState({ search: '' });
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [modalImg, setModalImg] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [wrong, setWrong] = useState(false);
  console.log(modalImg);

  useEffect(() => {
    const handleFetchPhotos = async () => {
      try {
        if (isInitialLoading) {
          setIsLoading(true);
        } else {
          setIsLoadingMore(true);
        }

        const data = await handleGetPhotos(query, page);
        setPhotos(prev => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        setWrong(error.message);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
        setIsInitialLoading(false);
      }
    };

    if (query.length) {
      handleFetchPhotos();
      setIsInitialLoading(true);
    }
  }, [query, page]);

  const handleOnSubmit = search => {
    setQuery(search);
    setPhotos([]);
    setPage(1);
  };

  const handleOpenModal = src => {
    setModalImg(src);
    setIsModal(true);
  };

  const handleCloseModal = () => {
    setModalImg('');
    setIsModal(false);
  };

  const handleLoadMoreClick = () => {
    setPage(page + 1);
  };

  return (
    <div className={s.wrapper}>
      <SearchBar
        search={searchingValue}
        setSearch={setSearchingValue}
        message={error}
        setMessage={setError}
        onSubmit={handleOnSubmit}
        updatePhotos={setPhotos}
        updatePage={setPage}
        total={setTotalPages}
      />
      {isLoading && <Loader />}
      {photos.length > 0 && (
        <ImageGallery collection={photos} openModal={handleOpenModal} />
      )}
      {isLoadingMore && <Loader />}
      {page < totalPages && !isLoading && (
        <LoadMoreBtn nextPage={handleLoadMoreClick} />
      )}
      {wrong && <ErrorMessage errorText={wrong} />}
      <ImageModal
        isOpen={!!modalImg}
        image={modalImg}
        closeModal={handleCloseModal}
      />
    </div>
  );
};

export default App;
