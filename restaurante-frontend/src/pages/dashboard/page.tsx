import { RealTimeOrders } from '@/components/RealTimeOrders';
import { InventoryStatus } from '@/components/InventoryStatus';
import { SalesChart } from '@/components/SalesChart';

export default function DashboardPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RealTimeOrders />
        <InventoryStatus />
      </div>
      <div className="mt-8">
        <SalesChart />
      </div>
    </div>
  );
}

