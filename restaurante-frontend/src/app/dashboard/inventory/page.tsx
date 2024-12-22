import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const inventoryItems = [
  { id: 1, name: "Farinha de Trigo", quantity: 50, unit: "kg" },
  { id: 2, name: "Queijo Mussarela", quantity: 30, unit: "kg" },
  { id: 3, name: "Tomate", quantity: 100, unit: "kg" },
]

export default function InventoryPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Estoque</h1>
      <div className="flex justify-between items-center">
        <Input className="max-w-sm" placeholder="Buscar item..." />
        <Button>Adicionar Item</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Unidade</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventoryItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell>
                <Button variant="ghost">Editar</Button>
                <Button variant="ghost" className="text-red-500">Excluir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

