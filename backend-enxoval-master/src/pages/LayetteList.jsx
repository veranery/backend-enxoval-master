import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import LayetteItem from '../components/Layetteitem';
import Notices from '../components/Notices';
import { RotateCcw, Search, Info, Loader2 } from 'lucide-react';
import { useToast } from '../components/ui/use-toast';
import { CATEGORIES, getCategoryColor } from '../data/categories';

function LayetteList() {
  const { layetteItems, resetList, isLoadingList } = useAuth();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');

  const handleResetList = () => {
    resetList();
    toast({
      title: 'Lista resetada!',
      description: 'Todas as quantidades foram restauradas aos valores recomendados.',
    });
  };

  const filteredItems = useMemo(() => {
    return layetteItems.filter((item) => {
      const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [layetteItems, selectedCategory, searchTerm]);

  const groupedItems = useMemo(() => {
    const groups = {};

    CATEGORIES.filter((c) => c !== 'Todas').forEach((cat) => {
      groups[cat] = [];
    });

    filteredItems.forEach((item) => {
      if (groups[item.category]) {
        groups[item.category].push(item);
      }
    });

    const populatedGroups = {};
    CATEGORIES.filter((c) => c !== 'Todas').forEach((cat) => {
      if (groups[cat] && groups[cat].length > 0) {
        populatedGroups[cat] = groups[cat];
      }
    });

    return populatedGroups;
  }, [filteredItems]);

  // Itens opcionais (marcados com optional: true) não entram na conta da
  // porcentagem mostrada no topo — só os itens essenciais contam.
  const stats = useMemo(() => {
    const requiredItems = layetteItems.filter((item) => !item.optional);
    const total = requiredItems.length;
    const purchased = requiredItems.filter((item) => item.purchased).length;
    const percentage = total > 0 ? Math.round((purchased / total) * 100) : 0;
    const optionalCount = layetteItems.length - total;
    return { total, purchased, percentage, optionalCount };
  }, [layetteItems]);

  return (
    <>
      <Helmet>
        <title>Lista de Enxoval - Magia Kids</title>
        <meta name="description" content="Gerencie sua lista completa de enxoval do bebê" />
      </Helmet>

      <div className="min-h-screen pb-20 bg-gradient-to-b from-rosa/5 via-white to-white text-gray-800">
        <Header />

        <div className="container mx-auto px-4 py-8">
          {/* Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 mb-8 shadow-lg border border-gray-100"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  Minha Lista de Enxoval
                </h2>
                <p className="text-gray-500">
                  <span className="font-semibold text-rosa">{stats.purchased}</span> de {stats.total} itens essenciais comprados ({stats.percentage}%)
                </p>
                {stats.optionalCount > 0 && (
                  <p className="text-xs text-gray-400 mt-1">
                    + {stats.optionalCount} {stats.optionalCount === 1 ? 'item opcional' : 'itens opcionais'} (não contam na porcentagem)
                  </p>
                )}
              </div>

              <button
                onClick={handleResetList}
                className="flex items-center gap-2 px-6 py-2.5 bg-orange-50 hover:bg-orange-100 text-laranja border border-laranja/30 rounded-xl transition-all duration-300 font-medium"
              >
                <RotateCcw size={18} />
                Resetar Lista
              </button>
            </div>

            <div className="mt-6 bg-gray-100 rounded-full h-4 overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.percentage}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-rosa via-amarelo to-verde rounded-full"
              />
            </div>
          </motion.div>

          <Notices />

          {isLoadingList ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <Loader2 className="animate-spin mb-3" size={32} />
              <p className="font-medium">Carregando sua lista...</p>
            </div>
          ) : (
            <>
              {/* Search and Filters */}
              <div className="mb-10 space-y-6">
                <div className="relative max-w-2xl mx-auto">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar item..."
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 hover:bg-white border border-gray-200 focus:border-rosa focus:ring-4 focus:ring-rosa/10 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none transition-all shadow-sm"
                  />
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {CATEGORIES.map((category) => {
                    const isSelected = selectedCategory === category;
                    const catColor = getCategoryColor(category);

                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                          isSelected ? 'shadow-md transform scale-105 text-white' : 'bg-white text-gray-500 border-gray-200'
                        }`}
                        style={{
                          backgroundColor: isSelected && category !== 'Todas' ? catColor : (isSelected ? '#333' : undefined),
                          borderColor: isSelected && category !== 'Todas' ? catColor : (isSelected ? '#333' : undefined),
                        }}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* List Items */}
              <div className="space-y-12">
                {Object.entries(groupedItems).map(([category, items]) => {
                  const catColor = getCategoryColor(category);
                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center gap-3 mb-2 pb-2 border-b border-gray-100">
                        <div
                          className="h-8 w-1.5 rounded-full"
                          style={{ backgroundColor: catColor }}
                        />
                        <h3 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
                          {category}
                        </h3>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold text-white ml-2"
                          style={{ backgroundColor: catColor }}
                        >
                          {items.length}
                        </span>
                      </div>

                      {category === 'MALA DA MATERNIDADE' && (
                        <p className="text-sm text-gray-800 font-bold mb-6 leading-relaxed max-w-3xl">
                          Quantidades dos itens para levar ao hospital, é uma ajuda para montar sua mala maternidade e tornar o parto mais fácil e prático.
                        </p>
                      )}

                      {category === 'QUARTO' && (
                        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                          Temos os móveis para o quarto perfeito do seu bebê
                        </p>
                      )}

                      {category !== 'MALA DA MATERNIDADE' && category !== 'QUARTO' && <div className="mb-6"></div>}

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {items.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <LayetteItem item={item} />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}

                {Object.keys(groupedItems).length === 0 && (
                  <div className="text-center py-16 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                    <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg font-medium">
                      Nenhum item encontrado.
                    </p>
                    <button
                      onClick={() => {setSearchTerm(''); setSelectedCategory('Todas');}}
                      className="mt-4 text-rosa hover:underline font-medium"
                    >
                      Limpar filtros
                    </button>
                  </div>
                )}

                {/* Note Section */}
                <div className="mt-12 p-6 bg-purple-50 rounded-2xl border border-purple-100 flex items-start gap-4">
                  <Info className="text-purple-500 shrink-0 mt-1" size={24} />
                  <div>
                    <p className="text-purple-800 font-bold text-lg">
                      OBSERVAÇÃO IMPORTANTE:
                    </p>
                    <p className="text-purple-700 mt-1">
                      VENDEMOS BERÇO QUE VIRA CAMA OU MINI SOFÁ COM CONDIÇÕES ESPECIAIS DE PAGAMENTO.
                      10% DE DESCONTO Á VISTA OU EM ATÉ 2X NO CARTÃO E EM 12X SEM JUROS NO CARTÃO.
                    </p>
                    <a
                      href="https://www.canva.com/design/DAHBbgToxmw/t6uu3T3Tud58AwJ2mz1EtQ/view"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      VER CATÁLOGO DOS MÓVEIS
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default LayetteList;
