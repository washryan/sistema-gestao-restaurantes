import { useState, useEffect } from "react";
import { withAuth } from "../../components/withAuth";
import { fetchOrders, updateOrderStatus } from "../../utils/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Pedido {
  id: number;
  status: string;
  itens: { nome: string; quantidade: number }[];
  valorTotal: number;
  criadoEm: string;
}

function PaginaPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const resposta = await fetchOrders();
        if (resposta?.data) {
          setPedidos(resposta.data); // Atribui os dados apenas se existirem
        } else {
          console.error("Nenhum dado retornado.");
        }
      } catch (erro) {
        console.error("Erro ao buscar pedidos:", erro);
      }
    };

    buscarDados();
  }, []); // Executa apenas uma vez na montagem do componente

  const atualizarStatusPedido = async (id: number, novoStatus: string) => {
    try {
      await updateOrderStatus(id, novoStatus);
      setPedidos((pedidosAtuais) =>
        pedidosAtuais.map((pedido) =>
          pedido.id === id ? { ...pedido, status: novoStatus } : pedido
        )
      );
    } catch (erro) {
      console.error("Erro ao atualizar status do pedido:", erro);
    }
  };

  const getCorStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "pendente":
        return "bg-yellow-500";
      case "preparando":
        return "bg-blue-500";
      case "pronto":
        return "bg-green-500";
      case "entregue":
        return "bg-gray-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Gerenciamento de Pedidos
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Pedidos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Itens</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pedidos.map((pedido) => (
                  <TableRow key={pedido.id}>
                    <TableCell>{pedido.id}</TableCell>
                    <TableCell>
                      <ul>
                        {pedido.itens.map((item, index) => (
                          <li key={index}>
                            {item.quantidade}x {item.nome}
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>
                      R${pedido.valorTotal.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge className={getCorStatus(pedido.status)}>
                        {pedido.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(pedido.criadoEm).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Select
                        onValueChange={(valor) =>
                          atualizarStatusPedido(pedido.id, valor)
                        }
                        defaultValue={pedido.status}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Atualizar status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pendente">Pendente</SelectItem>
                          <SelectItem value="preparando">Preparando</SelectItem>
                          <SelectItem value="pronto">Pronto</SelectItem>
                          <SelectItem value="entregue">Entregue</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
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

export default withAuth(PaginaPedidos);
