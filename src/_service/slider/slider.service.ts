import api from '../api';

const API_URL = '/orderedSliderItem';

const getAllSlider = async (payload: any) => {
  const response = await api.post(`${API_URL}/getPaged`, payload);

  return response.data;
};

export const sliderService = {
  getAllSlider,
};
