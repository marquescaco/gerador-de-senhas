import { useCallback, useState } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(12)
  const [copied, setCopied] = useState(false)

  const gerarSenha = useCallback(() => {
    const caracteres =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$"
    let pass = ""

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length)
      pass += caracteres.charAt(randomIndex)
    }

    setPassword(pass)
    setCopied(false) 
  }, [length])

  const copiarSenha = useCallback(() => {
    if (password) {
      navigator.clipboard.writeText(password)
      setCopied(true)

      setTimeout(() => setCopied(false), 2000)
    }
  }, [password])

  return (
    <div className="h-screen w-full bg-black flex justify-center items-center text-white">
      <div className="bg-gray-900 rounded-sm m-10 flex flex-col p-6 h-max items-center gap-6 shadow-lg border border-gray-700">
        <p className="text-xl font-semibold">Gerador de Senha</p>

       
        <div className="flex w-full max-w-sm">
          <input
            type="text"
            className="bg-white text-black w-full rounded-l-sm p-2 outline-none"
            readOnly
            placeholder="Senha gerada"
            value={password}
          />
          <button
            onClick={copiarSenha}
            className="bg-green-600 px-3 rounded-r-sm hover:bg-green-700"
          >
            Copiar
          </button>
        </div>

       
        {copied && <p className="text-green-400 text-sm">Senha copiada!</p>}

        <button
          onClick={gerarSenha}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
        >
          Gerar Nova Senha
        </button>

    
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <div className="flex items-center justify-between w-full">
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="flex-grow mr-4"
            />
            <label className="whitespace-nowrap">Tamanho: {length}</label>
          </div>

          <hr className="border-gray-600 w-full" />

          
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center">
              <input type="checkbox" id="caractere" className="mr-2" />
              <label htmlFor="caractere">Caractere Especial</label>
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="numero" className="mr-2" />
              <label htmlFor="numero">Número</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

