import { QRCodeGenerator } from "@/components/QRCodeGenerator"
import { Button, Input, Table } from "@/components/ui/index"

export default function MenuPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Cardápio</h1>
      <div className="flex justify-between items-center">
        <Input className="max-w-sm" placeholder="Buscar item..." />
        <Button>Adicionar Item</Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th className="p-4">Item</th>
            <th className="p-4">Preço</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-4">Item 1</td>
            <td className="p-4">R$ 10,00</td>
          </tr>
          <tr>
            <td className="p-4">Item 2</td>
            <td className="p-4">R$ 20,00</td>
          </tr>
        </tbody>
      </Table>
      <div className="mt-8">
        <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Gerar QR Code para o Cardápio</h2>
        <QRCodeGenerator />
        </div>
      </div>
    </div>
  )
}

