import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const DEFAULT_LAYETTE_ITEMS = [
  // ROUPINHAS (#FF6B6B)
  { id: 1, name: 'Body Manga Curta RN', category: 'ROUPINHAS', recommendedQuantity: 5, startingPrice: 9.99},
  { id: 2, name: 'Body Regata RN', category: 'ROUPINHAS', recommendedQuantity: 3, startingPrice: 14.90},
  { id: 3, name: 'Body Manga longa RN', category: 'ROUPINHAS', recommendedQuantity:6, startingPrice: 14.90},
  { id: 4, name: 'Body Manga Curta P', category: 'ROUPINHAS', recommendedQuantity: 6, startingPrice: 14.90 },
  { id: 84, name: 'Body Manga Longa P', category: 'ROUPINHAS', recommendedQuantity: 4, startingPrice: 14.90 },
  { id: 5, name: 'Body Regata P', category: 'ROUPINHAS', recommendedQuantity: 3, startingPrice: 14.90 },
  { id: 6, name: 'Body Manga Curta M', category: 'ROUPINHAS', recommendedQuantity: 6, startingPrice: 14.90 },
  { id: 7, name: 'Regata RN', category: 'ROUPINHAS', recommendedQuantity: 3, startingPrice: 4.99},
  { id: 8, name: 'Regata P', category: 'ROUPINHAS', recommendedQuantity: 3, startingPrice: 4.99 },
  { id: 9, name: 'Regata M', category: 'ROUPINHAS', recommendedQuantity: 3, startingPrice: 9.99 },
  { id: 10, name: 'Mijão RN', category: 'ROUPINHAS', recommendedQuantity: 6, startingPrice: 9.99 },
  { id: 11, name: 'Mijão P', category: 'ROUPINHAS', recommendedQuantity: 6, startingPrice: 9.99 },
  { id: 85, name: 'Mijão M', category: 'ROUPINHAS', recommendedQuantity: 6, startingPrice: 9.99 },
  { id: 12, name: 'Macacão Longo RN', category: 'ROUPINHAS', recommendedQuantity: 3, startingPrice: 18.90 },
  { id: 13, name: 'Macacão Longo P', category: 'ROUPINHAS', recommendedQuantity: 4, startingPrice: 18.90 },
  { id: 14, name: 'Macacão Curto ou Vestidos P', category: 'ROUPINHAS', recommendedQuantity: 3, startingPrice: 18.90 },
  { id: 15, name: 'Macacão Curto ou Vestidos M', category: 'ROUPINHAS', recommendedQuantity: 3, startingPrice: 18.90 },
  { id: 16, name: 'Pares de meia RN', category: 'ROUPINHAS', recommendedQuantity: 6, startingPrice: 3.99 },
  { id: 17, name: 'Shorts (tapa fralda) P', category: 'ROUPINHAS', recommendedQuantity: 3, startingPrice: 9.99},
  { id: 18, name: 'Shorts (tapa fralda) M', category: 'ROUPINHAS', recommendedQuantity: 3, startingPrice: 4.99 },
  { id: 19, name: 'Saídas Maternidade', category: 'ROUPINHAS', recommendedQuantity: 2, startingPrice: 179.90 },
  { id: 20, name: 'Troca Maternidade', category: 'ROUPINHAS', recommendedQuantity: 1, startingPrice: 49.90 },
  { id: 21, name: 'Kit de Touca, Luva e Sapato', category: 'ROUPINHAS', recommendedQuantity: 2, startingPrice: 15.90 },

  // ENXOVAL (#FFA500)
  { id: 22, name: 'Fraldas', category: 'ENXOVAL', recommendedQuantity: 10, startingPrice: 18.90 },
  { id: 23, name: 'Panos de Boca', category: 'ENXOVAL', recommendedQuantity: 10, startingPrice: 11.90 },
  { id: 24, name: 'Cueiros', category: 'ENXOVAL', recommendedQuantity: 8, startingPrice: 29.90 },
  { id: 25, name: 'Tolha Soft (para banho)', category: 'ENXOVAL', recommendedQuantity: 3, startingPrice: 34.90 },
  { id: 26, name: 'Cobertor', category: 'ENXOVAL', recommendedQuantity: 2, startingPrice: 18.90 },
  { id: 27, name: 'Mantas', category: 'ENXOVAL', recommendedQuantity: 2, startingPrice: 18.90 },
  { id: 28, name: 'Saco de Dormir', category: 'ENXOVAL', recommendedQuantity: 1, startingPrice: 39.90 },
  { id: 29, name: 'Almofada Amamentação', category: 'ENXOVAL', recommendedQuantity: 1, startingPrice: 89.90 },
  { id: 30, name: 'Trocador de Cômoda', category: 'ENXOVAL', recommendedQuantity: 1, startingPrice: 109.90  },
  { id: 31, name: 'Trocador Portátil', category: 'ENXOVAL', recommendedQuantity: 1, startingPrice: 29.90 },
  { id: 32, name: 'Ninho Redutor', category: 'ENXOVAL', recommendedQuantity: 1, startingPrice: 139.90 },
  { id: 33, name: 'Travesseiro Antirefluxo', category: 'ENXOVAL', recommendedQuantity: 1, startingPrice: 15.90 },
  { id: 34, name: 'Mala Maternidade', category: 'ENXOVAL', recommendedQuantity: 1, startingPrice: 99.90 },
  { id: 35, name: 'Mochila Maternidade', category: 'ENXOVAL', recommendedQuantity: 1, startingPrice: 99.90 },
  { id: 36, name: 'Kit Saquinho Maternidade', category: 'ENXOVAL', recommendedQuantity: 1, startingPrice: 18.90 },
  { id: 37, name: 'Canguru ou sling (livre)', category: 'ENXOVAL', recommendedQuantity: 1, optional: true, startingPrice: 89.90 },

  // HIGIENE (#FFD93D)
  { id: 38, name: 'Pct de Fralda Descartáveis RN', category: 'HIGIENE', recommendedQuantity: 3, startingPrice: 39.90},
  { id: 39, name: 'Colônia', category: 'HIGIENE', recommendedQuantity: 1},
  { id: 40, name: 'Banheira', category: 'HIGIENE', recommendedQuantity: 1, startingPrice: 34.90 },
  { id: 41, name: 'Balde de roupa suja', category: 'HIGIENE', recommendedQuantity: 1, startingPrice: 97.90 },
  { id: 42, name: 'Balde (ofurô)', category: 'HIGIENE', recommendedQuantity: 1, startingPrice: 34.90},
  { id: 43, name: 'Lixeira', category: 'HIGIENE', recommendedQuantity: 1, startingPrice: 54.90 },
  { id: 44, name: 'Hidrante corporal', category: 'HIGIENE', recommendedQuantity: 1, startingPrice: 28.90},
  { id: 45, name: 'Sabonete líquido', category: 'HIGIENE', recommendedQuantity: 1, startingPrice:0 },
  { id: 46, name: 'Absorvente para seio', category: 'HIGIENE', recommendedQuantity: 1, startingPrice: 27.90},
  { id: 47, name: 'Lenço Umedecido (Pct com 100 unds)', category: 'HIGIENE', recommendedQuantity: 2},
  { id: 73, name: 'Termômetro', category: 'HIGIENE', recommendedQuantity: 1 },
  { id: 74, name: 'Aspirador Nasal', category: 'HIGIENE', recommendedQuantity: 1, startingPrice: 27.90},
  { id: 75, name: 'Bolsa térmica para cólica', category: 'HIGIENE', recommendedQuantity: 1 },
  { id: 76, name: 'Kit unha (lixa e cortador de unha)', category: 'HIGIENE', recommendedQuantity: 1, optional: true, startingPrice: 17.90  },
  { id: 77, name: 'Kit escova e pente', category: 'HIGIENE', recommendedQuantity: 1, optional: true,startingPrice: 14.90  },
  { id: 77, name: 'Kit Higiene(Escova, pente, lixa e cortador)', category: 'HIGIENE', recommendedQuantity: 1, optional: true, startingPrice: 49.90 },
  { id: 78, name: 'Escova de dentes para massagear', category: 'HIGIENE', recommendedQuantity: 1, startingPrice: 13.90 },
  { id: 79, name: 'Repelente em creme', category: 'HIGIENE', recommendedQuantity: 1, startingPrice: 34.90 },
  { id: 80, name: 'Cotonete', category: 'HIGIENE', recommendedQuantity: 1, startingPrice: 11.90},
  { id: 81, name: 'Algodão', category: 'HIGIENE', recommendedQuantity: 1, startingPrice: 10.90},
  { id: 82, name: 'Álcool 70 em gel', category: 'HIGIENE', recommendedQuantity: 1 },
  { id: 83, name: 'Pomada de assadura', category: 'HIGIENE', recommendedQuantity: 2, startingPrice: 21.90},

  // ACESSÓRIO (#6BCB77)
  { id: 48, name: 'Mamadeira (livre)', category: 'ACESSÓRIO', recommendedQuantity: 1, optional: true, startingPrice: 23.90},
  { id: 49, name: 'Escova para limpar mamadeira (livre)', category: 'ACESSÓRIO', recommendedQuantity: 1, optional: true, startingPrice: 25.90},
  { id: 50, name: 'Chupeta (livre)', category: 'ACESSÓRIO', recommendedQuantity: 1, optional: true },
  { id: 51, name: 'Prendendor de chupeta (livre)', category: 'ACESSÓRIO', recommendedQuantity: 1, optional: true, startingPrice: 14.90 },
  { id: 52, name: 'Bomba de tirar leite', category: 'ACESSÓRIO', recommendedQuantity: 1 },
  { id: 53, name: 'Mordedor', category: 'ACESSÓRIO', recommendedQuantity: 1 },
  { id: 54, name: 'Trava para gaveta', category: 'ACESSÓRIO', recommendedQuantity: 1 },
  { id: 55, name: 'Protetor de quina', category: 'ACESSÓRIO', recommendedQuantity: 1, startingPrice: 12.90 },
  { id: 56, name: 'Tapete de atividades', category: 'ACESSÓRIO', recommendedQuantity: 1 },
  { id: 86, name: 'Bebê conforto (livre)', category: 'ACESSÓRIO', recommendedQuantity: 1, optional: true },
  { id: 87, name: 'Capa para bebê conforto (livre)', category: 'ACESSÓRIO', recommendedQuantity: 1, optional: true, startingPrice: 41.90 },
  { id: 88, name: 'Carinho de bebê (livre)', category: 'ACESSÓRIO', recommendedQuantity: 1, optional: true },
  { id: 91, name: 'Babá Eletrônica (livre)', category: 'ACESSÓRIO', recommendedQuantity: 1, optional: true },

  // MALA DA MATERNIDADE (#4D96FF)
  { id: 57, name: 'Saída maternidade', category: 'MALA DA MATERNIDADE', recommendedQuantity: 3},
  { id: 58, name: 'Manta', category: 'MALA DA MATERNIDADE', recommendedQuantity: 3 },
  { id: 59, name: 'Toalha de banho', category: 'MALA DA MATERNIDADE', recommendedQuantity: 3},
  { id: 60, name: 'Fralda', category: 'MALA DA MATERNIDADE', recommendedQuantity: 3 },
  { id: 61, name: 'Panos de boca', category: 'MALA DA MATERNIDADE', recommendedQuantity: 3 },
  { id: 62, name: 'Luvinha', category: 'MALA DA MATERNIDADE', recommendedQuantity: 3},
  { id: 63, name: 'Meia', category: 'MALA DA MATERNIDADE', recommendedQuantity: 3 },
  { id: 64, name: 'Touca', category: 'MALA DA MATERNIDADE', recommendedQuantity: 3},
  { id: 65, name: 'Fralda descartável RN', category: 'MALA DA MATERNIDADE', recommendedQuantity: 6 },
  { id: 66, name: 'Roupinhas extra', category: 'MALA DA MATERNIDADE', recommendedQuantity: 2},
  { id: 67, name: 'Itens de higiene que depende da maternidade (livre)', category: 'MALA DA MATERNIDADE'},

  // QUARTO (#9D4EDD)
  { id: 68, name: 'Berço (Dê preferência aos que vira cama e/ou mini sofá)', category: 'QUARTO', recommendedQuantity: 1 },
  { id: 69, name: 'Kit berço (com mosquiteiro)', category: 'QUARTO', recommendedQuantity: 1 },
  { id: 70, name: 'Cômodas (livre)', category: 'QUARTO', recommendedQuantity: 1, optional: true },
  { id: 71, name: 'Guarda roupa (livre)', category: 'QUARTO', recommendedQuantity: 1, optional: true },
  { id: 72, name: 'Cama Auxiliar (livre)', category: 'QUARTO', recommendedQuantity: 1, optional: true },
  { id: 93, name: 'Colchão para Berço', category: 'QUARTO', recommendedQuantity: 1 },
  { id: 94, name: 'Protetor impermeável para colchão', category: 'QUARTO', recommendedQuantity: 1 },
  { id: 95, name: 'Jogo de lençol', category: 'QUARTO', recommendedQuantity: 1 },

  // PARA MÃE
  { id: 96, name: 'Sutiã de amamentação', category: 'PARA MÃE', recommendedQuantity: 1 },
  { id: 89, name: 'Absorvente para seios', category: 'PARA MÃE', recommendedQuantity: 2 },
  { id: 90, name: 'Rosquinhas de Amamentação', category: 'PARA MÃE', recommendedQuantity: 1 },
  { id: 97, name: 'Absorvente pós parto (livre)', category: 'PARA MÃE', recommendedQuantity: 1, optional: true },
  { id: 92, name: 'Pote para armazenar leite (livre)', category: 'PARA MÃE', recommendedQuantity: 1, optional: true },
];

// Corrige, uma única vez, dados antigos salvos no aparelho/nuvem de uma
// pessoa que já vinha usando a lista antes desta atualização.
const migrateItems = (parsedData) => {
  const needsMigration = parsedData.some(
    (item) =>
      item.category === 'BERÇO' ||
      (item.id === 38 && item.category !== 'HIGIENE') ||
      item.category === 'Roupas' ||
      (item.category === 'MALA DA MATERNIDADE' && item.recommendedQuantity !== 3) ||
      // corrige um bug de uma versão anterior que sobrescreveu por engano
      // o nome do item 67 (que é de higiene) com o texto do berço
      (item.id === 67 && item.category === 'MALA DA MATERNIDADE' && item.name.includes('Berço'))
  );

  if (!needsMigration) return parsedData;

  // Schema muito antigo (antes da categoria "Roupas" virar "ROUPINHAS"):
  // os ids não batem mais, então é mais seguro recomeçar do zero.
  if (parsedData.some((item) => item.category === 'Roupas')) {
    return null;
  }

  return parsedData.map((item) => {
    const newItem = { ...item };

    if (newItem.category === 'BERÇO') {
      newItem.category = 'QUARTO';
    }
    if (newItem.id === 38 && newItem.category !== 'HIGIENE') {
      newItem.category = 'HIGIENE';
    }
    if (newItem.category === 'MALA DA MATERNIDADE') {
      newItem.recommendedQuantity = 3;
    }
    if (newItem.id === 67 && newItem.category === 'MALA DA MATERNIDADE' && newItem.name.includes('Berço')) {
      newItem.name = 'Itens de higiene que depende da maternidade';
    }

    return newItem;
  });
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [layetteItems, setLayetteItems] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(false);

  useEffect(() => {
    const storedPhone = localStorage.getItem('currentUser');
    if (storedPhone) {
      setCurrentUser(storedPhone);
      loadUserData(storedPhone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Salva no aparelho (rápido, sempre funciona) e, se configurado, também
  // na nuvem (para sincronizar entre aparelhos).
  const persist = (phone, items) => {
    if (!phone) return;
    localStorage.setItem(`userData_${phone}`, JSON.stringify(items));

    if (isFirebaseConfigured) {
      setDoc(doc(db, 'listas', phone), {
        items,
        updatedAt: new Date().toISOString(),
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.warn('[Firebase] Não foi possível salvar na nuvem agora. Os dados continuam salvos neste aparelho.', err);
      });
    }
  };

  const initializeDefaultData = (phone) => {
    const defaultItems = DEFAULT_LAYETTE_ITEMS.map((item) => ({
      ...item,
      desiredQuantity: 0,
      purchased: false,
    }));
    setLayetteItems(defaultItems);
    persist(phone, defaultItems);
  };

  const loadUserData = async (phone) => {
    setIsLoadingList(true);
    try {
      let data = null;

      // 1. Tenta buscar da nuvem primeiro (é o que existe de mais atual,
      //    já que pode ter sido editado em outro aparelho).
      if (isFirebaseConfigured) {
        try {
          const snapshot = await getDoc(doc(db, 'listas', phone));
          if (snapshot.exists() && Array.isArray(snapshot.data().items)) {
            data = snapshot.data().items;
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn('[Firebase] Não foi possível buscar a lista na nuvem, usando os dados salvos neste aparelho.', err);
        }
      }

      // 2. Se não achou nada na nuvem, tenta o que está salvo neste aparelho.
      if (!data) {
        const localData = localStorage.getItem(`userData_${phone}`);
        if (localData) {
          data = JSON.parse(localData);
        }
      }

      if (data) {
        const migrated = migrateItems(data);
        if (migrated === null) {
          initializeDefaultData(phone);
          return;
        }
        setLayetteItems(migrated);
        persist(phone, migrated);
      } else {
        initializeDefaultData(phone);
      }
    } finally {
      setIsLoadingList(false);
    }
  };

  const login = (phone) => {
    setCurrentUser(phone);
    localStorage.setItem('currentUser', phone);
    loadUserData(phone);
  };

  const logout = () => {
    setCurrentUser(null);
    setLayetteItems([]);
    localStorage.removeItem('currentUser');
  };

  const updateItemQuantity = (itemId, newQuantity) => {
    const updatedItems = layetteItems.map((item) =>
      item.id === itemId ? { ...item, desiredQuantity: newQuantity } : item
    );
    setLayetteItems(updatedItems);
    persist(currentUser, updatedItems);
  };

  const toggleItemPurchased = (itemId) => {
    const updatedItems = layetteItems.map((item) =>
      item.id === itemId ? { ...item, purchased: !item.purchased } : item
    );
    setLayetteItems(updatedItems);
    persist(currentUser, updatedItems);
  };

  const resetList = () => {
    initializeDefaultData(currentUser);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        layetteItems,
        isLoadingList,
        isSyncEnabled: isFirebaseConfigured,
        login,
        logout,
        updateItemQuantity,
        toggleItemPurchased,
        resetList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
