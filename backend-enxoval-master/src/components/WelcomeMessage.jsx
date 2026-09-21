import React from 'react';
import { motion } from 'framer-motion';

const WelcomeMessage = () => {
  return (
    <motion.div
      className='flex flex-col items-center gap-2 mt-2'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <p className='text-sm text-gray-500 text-center max-w-xs mx-auto'>
        Use a lista interativa para organizar o enxoval perfeito.
      </p>
      <div className="flex gap-2 mt-2">
        <div className="w-2 h-2 rounded-full bg-rosa"></div>
        <div className="w-2 h-2 rounded-full bg-amarelo"></div>
        <div className="w-2 h-2 rounded-full bg-azul"></div>
        <div className="w-2 h-2 rounded-full bg-verde"></div>
      </div>
    </motion.div>
  );
};

export default WelcomeMessage;