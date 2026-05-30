import api from './api';

export const getItems   = (params)    => api.get('/grocery', { params });
export const addItem    = (data)      => api.post('/grocery', data);
export const updateItem = (id, data)  => api.put(`/grocery/${id}`, data);
export const deleteItem = (id)        => api.delete(`/grocery/${id}`);
export const getStats   = ()          => api.get('/grocery/dashboard/stats');