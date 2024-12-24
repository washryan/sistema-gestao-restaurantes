import React, { useEffect, useState } from 'react';
import { fetchInventory, updateInventoryItem } from '../utils/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
}

export const InventoryStatus: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editQuantity, setEditQuantity] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchInventory();
        setInventory(response.data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateQuantity = async (id: number) => {
    try {
      const updatedItem = inventory.find(item => item.id === id);
      if (updatedItem) {
        const newQuantity = parseInt(editQuantity);
        if (isNaN(newQuantity)) return;

        updatedItem.quantity = newQuantity;
        await updateInventoryItem(updatedItem);
        setInventory(inventory.map(item => item.id === id ? updatedItem : item));
        setEditingId(null);
        setEditQuantity('');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                {editingId === item.id ? (
                  <Input
                    type="number"
                    value={editQuantity}
                    onChange={(e) => setEditQuantity(e.target.value)}
                    className="w-20"
                  />
                ) : (
                  item.quantity
                )}
              </TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell>
                {editingId === item.id ? (
                  <>
                    <Button onClick={() => handleUpdateQuantity(item.id)} className="mr-2">
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => setEditingId(null)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => {
                    setEditingId(item.id);
                    setEditQuantity(item.quantity.toString());
                  }}>
                    Edit
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

