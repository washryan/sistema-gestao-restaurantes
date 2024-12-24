import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchMenuItems = () => api.get('/menu');
export const addMenuItem = (item: any) => api.post('/menu', item);
export const fetchOrders = () => api.get('/pedidos');
export const createOrder = (order: any) => api.post('/pedidos', order);
export const updateOrderStatus = (id: number, status: string) => api.put(`/pedidos/${id}/status`, { status });
export const fetchInventory = () => api.get('/estoque');
export const updateInventoryItem = (item: any) => api.put(`/estoque/${item.id}`, item);
export const fetchDailySalesReport = () => api.get('/analise/vendas-diarias');
export const fetchPopularItems = () => api.get('/analise/itens-populares');
export const fetchRevenueByCategory = () => api.get('/analise/receita-por-categoria');

export default api;

