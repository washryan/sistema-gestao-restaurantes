import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const orders = [
  { id: 1, customer: "João Silva", items: "2x Pizza, 1x Refrigerante", total: 35.97, status: "Pendente" },
  { id: 2, customer: "Maria Oliveira", items: "1x Hambúrguer, 1x Batata Frita", total: 22.98, status: "Em preparo" },
  { id: 3, customer: "Carlos Santos", items: "1x Salada Caesar, 1x Suco", total: 15.98, status: "Entregue" },
]

export default function OrdersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Pedidos</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Itens</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>R$ {order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant={order.status === "Entregue" ? "success" : "warning"}>
                  {order.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

