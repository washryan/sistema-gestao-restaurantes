import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface SalesData {
  date: string;
  totalSales: number;
}

export const SalesChart: React.FC = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('/api/analytics/daily-sales');
        setSalesData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados de vendas:', error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <div>
      <h2>Gráfico de Vendas Diárias</h2>
      <BarChart width={600} height={300} data={salesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalSales" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

