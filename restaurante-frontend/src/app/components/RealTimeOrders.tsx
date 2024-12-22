import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';

interface Order {
  id: number;
  status: string;
  items: string[];
  totalAmount: number;
}

export const RealTimeOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      onConnect: () => {
        console.log('Conectado ao WebSocket');
        client.subscribe('/topic/orders', (message) => {
          const newOrder = JSON.parse(message.body);
          setOrders((prevOrders) => [...prevOrders, newOrder]);
        });
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  return (
    <div>
      <h2>Pedidos em Tempo Real</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Pedido #{order.id} - Status: {order.status} - Total: R${order.totalAmount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

