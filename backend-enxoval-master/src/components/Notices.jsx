import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, ArrowUpRight } from 'lucide-react';
import { NOTICES } from '../data/notices';

function Notices() {
  if (!NOTICES || NOTICES.length === 0) return null;

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <Megaphone className="text-rosa" size={22} />
        <h2 className="text-xl font-bold text-gray-800">Avisos e ofertas</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {NOTICES.map((notice, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
          >
            {notice.image && (
              <div className="w-full aspect-video bg-gray-50 overflow-hidden">
                <img
                  src={notice.image}
                  alt={notice.title || 'Oferta'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}

            <div className="p-5 flex flex-col flex-1">
              {notice.title && (
                <h3 className="font-bold text-gray-800 mb-1">{notice.title}</h3>
              )}
              {notice.description && (
                <p className="text-sm text-gray-600 leading-relaxed flex-1">
                  {notice.description}
                </p>
              )}

              {notice.link && (
                <a
                  href={notice.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-rosa hover:underline"
                >
                  {notice.linkLabel || 'Saiba mais'}
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Notices;
