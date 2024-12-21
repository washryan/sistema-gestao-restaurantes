import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Sistema de Gestão de Restaurantes</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">Gerencie seu restaurante de forma eficiente e moderna.</p>
        <ul className="space-y-4 mb-8">
          {['Cardápio digital com QR Code', 'Pedidos em tempo real', 'Gestão de estoque', 'Analytics de vendas'].map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        <Link href="/dashboard" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center transition duration-300">
          Acessar Dashboard
        </Link>
      </div>
    </div>
  )
}

