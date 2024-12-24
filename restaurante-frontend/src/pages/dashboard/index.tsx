import { withAuth } from '../../components/withAuth';
import { useAuth } from '../../contexts/AuthContext';
import { RealTimeOrders } from '@/components/RealTimeOrders';
import { InventoryStatus } from '@/components/InventoryStatus';
import { SalesChart } from '@/components/SalesChart';
import { PopularItems } from '@/components/PopularItems';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.email}</span>
            <Button onClick={logout} variant="destructive">
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Real-Time Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <RealTimeOrders />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Inventory Status</CardTitle>
            </CardHeader>
            <CardContent>
              <InventoryStatus />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <SalesChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Popular Items</CardTitle>
            </CardHeader>
            <CardContent>
              <PopularItems />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default withAuth(DashboardPage);

