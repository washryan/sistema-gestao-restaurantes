import React, { useEffect, useState } from 'react';
import { fetchDailySalesReport } from '../utils/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SalesData {
  date: string;
  totalSales: number;
  orderCount: number;
}

export const SalesChart: React.FC = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDailySalesReport();
        setSalesData(response.data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Daily Sales Report</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="totalSales" name="Total Sales (R$)" fill="#8884d8" />
          <Bar yAxisId="right" dataKey="orderCount" name="Order Count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

