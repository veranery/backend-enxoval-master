import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import { useToast } from '../components/ui/use-toast';
import logoMagiaKids from "../assets/logo-magia-kids.png";

function validarCelularBR(telefone) {
  const numero = telefone.replace(/\D/g, '');
  return /^[1-9]{2}9\d{8}$/.test(numero);
}

function LoginPage() {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!phone.trim() || !validarCelularBR(phone)) {
      setPhoneError(true);
      toast({
        title: 'Telefone inválido',
        description: 'Digite um celular válido com DDD. Ex: (11) 9XXXX-XXXX',
        variant: 'destructive',
      });
      return;
    }

    login(phone.replace(/\D/g, ''));
    navigate('/lista');
  };

  return (
    <>
      <Helmet>
        <title>Login - Magia Kids Layette Checklist</title>
        <meta name="description" content="Faça login para gerenciar sua lista de enxoval do bebê" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center p-4 bg-white">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-rosa/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-azul/10 rounded-full blur-3xl" />
          <div className="absolute top-[40%] left-[20%] w-64 h-64 bg-amarelo/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block p-4 rounded-full bg-gray-50 mb-6"
              >
                <img src={logoMagiaKids} alt="Magia Kids" className="h-16 object-contain" />
              </motion.div>

              <h1 className="text-3xl font-bold text-gray-800 mb-3 tracking-tight">Bem-vindo!</h1>
              <p className="text-gray-500">Entre com seu telefone para gerenciar sua lista de enxoval</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Número de Telefone
                </label>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="text-rosa group-focus-within:text-rosa transition-colors" size={20} />
                  </div>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      const valor = e.target.value;
                      setPhone(valor);

                      if (valor && !validarCelularBR(valor)) {
                        setPhoneError(true);
                      } else {
                        setPhoneError(false);
                      }
                    }}
                    placeholder="(11) 99999-9999"
                    className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 transition-all font-medium text-lg
                      ${phoneError ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-rosa/10 focus:border-rosa'}
                    `}
                  />
                </div>

                {phoneError && (
                  <p className="mt-2 text-sm text-red-500 font-semibold">
                    Telefone inválido
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 bg-rosa hover:bg-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-pink-200 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Entrar</span>
                <ArrowRight size={20} />
              </motion.button>
            </form>

            <div className="mt-10 pt-6 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400 leading-relaxed">
                Ao continuar, você terá acesso à sua lista de enxoval personalizada. Seus dados ficam salvos com o seu número de telefone e sincronizados em qualquer aparelho onde você entrar.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default LoginPage;