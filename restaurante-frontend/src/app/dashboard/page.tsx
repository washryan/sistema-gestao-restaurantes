export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Visão Geral</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total de Pedidos" value="156" />
        <DashboardCard title="Receita Diária" value="R$ 3.250,00" />
        <DashboardCard title="Itens em Estoque" value="432" />
        <DashboardCard title="Clientes Ativos" value="89" />
      </div>
    </div>
  )
}

function DashboardCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-2 text-gray-700">{title}</h2>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
    </div>
  )
}

