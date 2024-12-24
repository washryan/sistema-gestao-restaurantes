import Link from 'next/link'
import { useRouter } from 'next/router'

export default function DashboardLayout({
children,
}: {
children: React.ReactNode
}) {
const router = useRouter()

return (
  <div className="flex h-screen bg-gray-100">
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
      </div>
      <nav className="mt-4">
        <Link href="/dashboard" className={`block py-2 px-4 text-gray-700 hover:bg-gray-200 ${router.pathname === '/dashboard' ? 'bg-gray-200' : ''}`}>
          Visão Geral
        </Link>
        <Link href="/dashboard/cardapio" className={`block py-2 px-4 text-gray-700 hover:bg-gray-200 ${router.pathname === '/dashboard/cardapio' ? 'bg-gray-200' : ''}`}>
          Cardápio
        </Link>
        <Link href="/dashboard/pedidos" className={`block py-2 px-4 text-gray-700 hover:bg-gray-200 ${router.pathname === '/dashboard/pedidos' ? 'bg-gray-200' : ''}`}>
          Pedidos
        </Link>
        <Link href="/dashboard/estoque" className={`block py-2 px-4 text-gray-700 hover:bg-gray-200 ${router.pathname === '/dashboard/estoque' ? 'bg-gray-200' : ''}`}>
          Estoque
        </Link>
        <Link href="/dashboard/analise" className={`block py-2 px-4 text-gray-700 hover:bg-gray-200 ${router.pathname === '/dashboard/analise' ? 'bg-gray-200' : ''}`}>
          Análise
        </Link>
      </nav>
    </aside>
    <main className="flex-1 p-8 overflow-y-auto">
      {children}
    </main>
  </div>
)
}

