import React, { useEffect, useState } from 'react';
import { fetchPopularItems } from '../utils/api';

interface PopularItem {
  name: string;
  count: number;
}

export const PopularItems: React.FC = () => {
  const [popularItems, setPopularItems] = useState<PopularItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPopularItems();
        setPopularItems(response.data);
      } catch (error) {
        console.error('Error fetching popular items:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Top 5 Popular Items</h3>
      <ul className="space-y-2">
        {popularItems.slice(0, 5).map((item, index) => (
          <li key={item.name} className="flex justify-between items-center bg-white p-3 rounded shadow">
            <span className="font-medium">{index + 1}. {item.name}</span>
            <span className="text-gray-600">Ordered {item.count} times</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

