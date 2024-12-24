import { useState, useEffect } from 'react';
import { withAuth } from '../../components/withAuth';
import { fetchDailySalesReport, fetchPopularItems, fetchRevenueByCategory } from '../../utils/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DadosVendas {
  data: string;
  totalVendas: number;
  quantidadePedidos: number;
}

interface ItemPopular {
  nome: string;
  quantidade: number;
}

interface ReceitaCategoria {
  categoria: string;
  receita: number;
}

function PaginaAnalise() {
  const [dadosVendas, setDadosVendas] = useState<DadosVendas[]>([]);
  const [itensPopulares, setItensPopulares] = useState<ItemPopular[]>([]);
  const [receitaPorCategoria, setReceitaPorCategoria] = useState<ReceitaCategoria[]>([]);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const [vendasResp, itensPopularesResp, receitaCategoriaResp] = await Promise.all([
          fetchDailySalesReport(),
          fetchPopularItems(),
          fetchRevenueByCategory()
        ]);
        setDadosVendas(vendasResp.data);
        setItensPopulares(itensPopularesResp.data);
        setReceitaPorCategoria(receitaCategoriaResp.data);
      } catch (erro) {
        console.error('Erro ao buscar dados de análise:', erro);
      }
    };

    buscarDados();
  }, []);

  const CORES = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Análise de Vendas</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendas Diárias</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dadosVendas}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="data" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="totalVendas" name="Total de Vendas (R$)" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="quantidadePedidos" name="Quantidade de Pedidos" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Itens Mais Populares</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={itensPopulares}
                    dataKey="quantidade"
                    nameKey="nome"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {itensPopulares.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Receita por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={receitaPorCategoria}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="categoria" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="receita" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default withAuth(PaginaAnalise);

