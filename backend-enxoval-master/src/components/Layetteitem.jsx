import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Check } from 'lucide-react';
import { getCategoryColor } from '../data/categories';

const formatPrice = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function LayetteItem({ item }) {
  const { updateItemQuantity, toggleItemPurchased } = useAuth();
  const color = getCategoryColor(item.category);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    updateItemQuantity(item.id, value);
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border border-gray-100 overflow-hidden ${
        item.purchased ? 'opacity-70' : ''
      }`}
      style={{ borderLeft: `5px solid ${color}` }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3 gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3
                className={`text-lg font-bold leading-snug ${
                  item.purchased ? 'line-through text-gray-400' : 'text-gray-800'
                }`}
              >
                {item.name}
              </h3>
              {item.optional && (
                <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-gray-100 text-gray-500 border border-gray-200">
                  Opcional
                </span>
              )}
            </div>
            <p className="text-sm font-medium mt-1" style={{ color }}>
              Recomendado: <span className="font-bold">{item.recommendedQuantity}</span>
            </p>
            {!!item.startingPrice && (
              <p className="text-sm font-semibold mt-1 text-gray-600">
                A partir de <span className="text-gray-800">{formatPrice(item.startingPrice)}</span>
              </p>
            )}
          </div>

          <button
            onClick={() => toggleItemPurchased(item.id)}
            aria-label={item.purchased ? 'Marcar como não comprado' : 'Marcar como comprado'}
            className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border ${
              item.purchased
                ? 'text-white border-transparent'
                : 'bg-white border-gray-200 text-gray-300 hover:text-white'
            }`}
            style={{
              backgroundColor: item.purchased ? color : undefined,
              borderColor: !item.purchased ? undefined : color,
            }}
            onMouseEnter={(e) => {
              if (!item.purchased) e.currentTarget.style.backgroundColor = color;
            }}
            onMouseLeave={(e) => {
              if (!item.purchased) e.currentTarget.style.backgroundColor = '';
            }}
          >
            <Check size={20} />
          </button>
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
          <label className="text-xs uppercase tracking-wider text-gray-400 font-bold">
            Qtd possuída:
          </label>
          <input
            type="number"
            min="0"
            value={item.desiredQuantity}
            onChange={handleQuantityChange}
            className="w-20 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 text-center font-medium focus:outline-none focus:ring-2 transition-all"
            style={{
              '--tw-ring-color': color,
              borderColor: 'transparent',
            }}
            onFocus={(e) => (e.target.style.borderColor = color)}
            onBlur={(e) => (e.target.style.borderColor = 'transparent')}
          />
        </div>
      </div>
    </div>
  );
}

export default LayetteItem;
