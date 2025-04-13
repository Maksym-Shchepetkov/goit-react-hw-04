import axios from 'axios';

export const handleGetPhotos = async () => {
  const selectedPhotos = await axios.get(
    'https://api.unsplash.com/photos/?client_id=8OOPE-y2t239SntdN150iAqUHy5HuwDQFrKAKj6BEho'
  );
  return selectedPhotos.data;
};
