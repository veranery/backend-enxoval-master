import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Cloud, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoMagia from '../assets/logo-magia-kids.png';

function Header() {
  const { currentUser, logout, isSyncEnabled } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <img
            src={logoMagia}
            alt="Magia Kids"
            className="h-10 object-contain sm:h-12"
          />
          <div className="flex items-center gap-4">
            <span
              title={isSyncEnabled ? 'Sua lista está sincronizada e disponível em qualquer aparelho' : 'Sua lista está salva apenas neste aparelho'}
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-gray-400"
            >
              {isSyncEnabled ? <Cloud size={15} /> : <Smartphone size={15} />}
              {isSyncEnabled ? 'Sincronizado' : 'Somente neste aparelho'}
            </span>

            <span className="text-gray-600 font-medium hidden sm:inline">
              {currentUser}
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-azul/10 hover:bg-azul/20 text-azul rounded-lg transition-all duration-300 font-medium border border-azul/20"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;