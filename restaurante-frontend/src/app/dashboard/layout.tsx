import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
        </div>
        <nav className="mt-4">
          <Link href="/dashboard" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            Visão Geral
          </Link>
          <Link href="/dashboard/menu" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            Cardápio
          </Link>
          <Link href="/dashboard/orders" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            Pedidos
          </Link>
          <Link href="/dashboard/inventory" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            Estoque
          </Link>
          <Link href="/dashboard/analytics" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            Analytics
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}

