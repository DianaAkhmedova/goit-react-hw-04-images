import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    page: 1,
    key: '32027481-190e41b90c8ab57a00c099eff',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const searchImg = async (q, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
    },
  });
  return data;
};
