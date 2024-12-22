import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
}

export const InventoryStatus: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('/api/inventory');
        setInventory(response.data);
      } catch (error) {
        console.error('Erro ao buscar o inventário:', error);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div>
      <h2>Status do Estoque</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

