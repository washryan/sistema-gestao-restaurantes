import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config;
  }

  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchMenuItems = () => api.get("/menu");

export const addMenuItem = (item: Record<string, unknown>) =>
  api.post("/menu", item);

export const fetchOrders = () => api.get("/orders");

export const createOrder = (order: Record<string, unknown>) =>
  api.post("/orders", order);

export const updateOrderStatus = (id: number, status: string) =>
  api.put(`/orders/${id}/status`, { status });

export const fetchInventory = () => api.get("/inventory");

export const updateInventoryItem = (item: { id: number } & Record<string, unknown>) =>
  api.put(`/inventory/${item.id}`, item);

export const fetchDailySalesReport = () => api.get("/analytics/daily-sales");

export const fetchPopularItems = () => api.get("/analytics/popular-items");

export const fetchRevenueByCategory = () =>
  api.get("/analytics/revenue-by-category");

export default api;
