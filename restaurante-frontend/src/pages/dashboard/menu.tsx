import { useState, useEffect } from 'react';
import { withAuth } from '../../components/withAuth';
import { fetchMenuItems, addMenuItem } from '../../utils/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
}

function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', category: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMenuItems();
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addMenuItem({
        name: newItem.name,
        price: parseFloat(newItem.price),
        category: newItem.category,
      });
      setMenuItems([...menuItems, response.data]);
      setNewItem({ name: '', price: '', category: '' });
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Menu Management</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Menu Item</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddItem} className="space-y-4">
              <Input
                placeholder="Item Name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                required
              />
              <Input
                type="number"
                step="0.01"
                placeholder="Price"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                required
              />
              <Input
                placeholder="Category"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                required
              />
              <Button type="submit">Add Item</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle<CardTitle>Menu Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menuItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>R${item.price.toFixed(2)}</TableCell>
                    <TableCell>{item.category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default withAuth(MenuPage);

