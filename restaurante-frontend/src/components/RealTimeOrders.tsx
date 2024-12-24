import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { fetchOrders } from '../utils/api';
import { Badge } from "@/components/ui/badge";

interface Order {
  id: number;
  status: string;
  items: { name: string; quantity: number }[];
  totalAmount: number;
  createdAt: string;
}

export const RealTimeOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      onConnect: () => {
        console.log('Connected to WebSocket');
        client.subscribe('/topic/orders', (message) => {
          const newOrder = JSON.parse(message.body);
          setOrders((prevOrders) => [newOrder, ...prevOrders].slice(0, 10));
        });
      },
    });

    const fetchData = async () => {
      try {
        const response = await fetchOrders();
        setOrders(response.data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchData();
    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-500';
      case 'preparing':
        return 'bg-blue-500';
      case 'ready':
        return 'bg-green-500';
      case 'delivered':
        return 'bg-gray-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold">Order #{order.id}</span>
            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
          </div>
          <ul className="list-disc list-inside mb-2">
            {order.items.map((item, index) => (
              <li key={index}>
                {item.quantity}x {item.name}
              </li>
            ))}
          </ul>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Total: R${order.totalAmount.toFixed(2)}</span>
            <span>{new Date(order.createdAt).toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

