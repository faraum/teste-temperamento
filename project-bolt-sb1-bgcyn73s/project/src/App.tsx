import React from 'react';
import TemperamentTest from './components/TemperamentTest';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Teste de Temperamentos
        </h1>
        <TemperamentTest />
      </div>
    </div>
  );
}

export default App;