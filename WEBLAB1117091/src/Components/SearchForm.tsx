import { useState } from 'react';

interface Props {
  onBuscar: (termino: string) => void;
}

export const SearchForm = ({ onBuscar }: Props) => {
  const [termino, setTermino] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (termino.trim()) {
      onBuscar(termino);
      setTermino('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={termino}
        onChange={(e) => setTermino(e.target.value)}
        placeholder="Buscar GIFs..."
      />
      <button type="submit">Buscar</button>
    </form>
  );
};