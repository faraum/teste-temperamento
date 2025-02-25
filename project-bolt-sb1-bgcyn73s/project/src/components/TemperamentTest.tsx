import React, { useState } from 'react';
import { characteristics } from '../data/characteristics';
import { TemperamentResult } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

export default function TemperamentTest() {
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  const totalPages = Math.ceil(characteristics.length / ITEMS_PER_PAGE);
  
  const calculateResults = (): TemperamentResult => {
    const results = {
      choleric: 0,
      sanguine: 0,
      melancholic: 0,
      phlegmatic: 0
    };
    
    selectedCharacteristics.forEach(id => {
      const characteristic = characteristics.find(c => c.id === id);
      if (characteristic) {
        results[characteristic.temperament]++;
      }
    });
    
    return results;
  };

  const getDominantTemperament = (results: TemperamentResult): string => {
    const max = Math.max(...Object.values(results));
    const dominant = Object.entries(results).find(([_, value]) => value === max);
    return dominant ? dominant[0] : '';
  };

  const getTemperamentDescription = (temperament: string): string => {
    const descriptions = {
      choleric: "Líder natural, determinado e orientado a objetivos",
      sanguine: "Extrovertido, entusiasta e comunicativo",
      melancholic: "Perfeccionista, detalhista e profundo",
      phlegmatic: "Pacífico, equilibrado e diplomático"
    };
    return descriptions[temperament as keyof typeof descriptions] || '';
  };

  const handleToggleCharacteristic = (id: number) => {
    const newSelected = new Set(selectedCharacteristics);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedCharacteristics(newSelected);
  };

  const currentCharacteristics = characteristics.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  if (showResults) {
    const results = calculateResults();
    const dominantTemperament = getDominantTemperament(results);
    
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Seus Resultados</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">
            Seu temperamento dominante é: {dominantTemperament.charAt(0).toUpperCase() + dominantTemperament.slice(1)}
          </h3>
          <p className="mb-6">{getTemperamentDescription(dominantTemperament)}</p>
          
          <div className="space-y-4">
            {Object.entries(results).map(([temp, count]) => (
              <div key={temp} className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-gray-200">
                      {temp}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block">
                      {Math.round((count / selectedCharacteristics.size) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${(count / selectedCharacteristics.size) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => {
              setShowResults(false);
              setSelectedCharacteristics(new Set());
              setCurrentPage(0);
            }}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Fazer o teste novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Teste de Temperamento</h2>
        <p className="mb-6">
          Selecione as características que melhor descrevem você:
        </p>
        
        <div className="space-y-4">
          {currentCharacteristics.map((char) => (
            <label
              key={char.id}
              className="flex items-center space-x-3 p-3 rounded hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCharacteristics.has(char.id)}
                onChange={() => handleToggleCharacteristic(char.id)}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span>{char.text}</span>
            </label>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="flex items-center px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </button>
          
          <span>
            Página {currentPage + 1} de {totalPages}
          </span>
          
          <button
            onClick={() => {
              if (currentPage === totalPages - 1) {
                setShowResults(true);
              } else {
                setCurrentPage(p => Math.min(totalPages - 1, p + 1));
              }
            }}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {currentPage === totalPages - 1 ? (
              'Ver Resultados'
            ) : (
              <>
                Próximo
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}