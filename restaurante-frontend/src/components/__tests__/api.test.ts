import axios from 'axios';
import { fetchMenuItems, addMenuItem, fetchOrders, createOrder } from '../api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API utility functions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('fetchMenuItems calls the correct endpoint', async () => {
    mockedAxios.get.mockResolvedValue({ data: [] });
    await fetchMenuItems();
    expect(mockedAxios.get).toHaveBeenCalledWith('/menu');
  });

  it('addMenuItem calls the correct endpoint with data', async () => {
    const menuItem = { name: 'Test Item', price: 9.99 };
    mockedAxios.post.mockResolvedValue({ data: menuItem });
    await addMenuItem(menuItem);
    expect(mockedAxios.post).toHaveBeenCalledWith('/menu', menuItem);
  });

  it('fetchOrders calls the correct endpoint', async () => {
    mockedAxios.get.mockResolvedValue({ data: [] });
    await fetchOrders();
    expect(mockedAxios.get).toHaveBeenCalledWith('/orders');
  });

  it('createOrder calls the correct endpoint with data', async () => {
    const order = { items: ['item1', 'item2'], totalAmount: 19.98 };
    mockedAxios.post.mockResolvedValue({ data: order });
    await createOrder(order);
    expect(mockedAxios.post).toHaveBeenCalledWith('/orders', order);
  });
});

