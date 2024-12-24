import { QRCodeSVG } from 'qrcode.react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function QRCodeGenerator() {
  const [url, setUrl] = useState('')
  const [qrCode, setQRCode] = useState('')

  const generateQRCode = () => {
    setQRCode(url)
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Digite a URL do cardápio"
        />
        <Button onClick={generateQRCode}>Gerar QR Code</Button>
      </div>
      {qrCode && (
        <div className="flex justify-center">
          <QRCodeSVG value={qrCode} size={256} />
        </div>
      )}
    </div>
  )
}

