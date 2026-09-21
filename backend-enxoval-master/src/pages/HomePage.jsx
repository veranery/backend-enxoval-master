import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroImage from '../components/HeroImage';
import CallToAction from '../components/CallToAction';
import WelcomeMessage from '../components/WelcomeMessage';

const HomePage = () => {
    // Since we have a LoginPage as the main entry in App.jsx routing ("/" -> LoginPage),
    // this HomePage might be redundant unless we want a separate landing page.
    // However, I will style it according to the request.
    const navigate = useNavigate();

    return (
        <div className='min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative bg-white'>
            {/* Background blobs for visual interest */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-rosa/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-amarelo/5 rounded-full blur-[100px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className='flex flex-col items-center gap-6 w-full max-w-[448px] z-10'
            >
                <HeroImage />
                
                <div className='flex flex-col gap-2 w-full text-center'>
                    <CallToAction />
                    <WelcomeMessage />
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/')}
                    className="mt-8 px-8 py-3 bg-rosa text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:shadow-rosa/20 transition-all duration-300"
                >
                    Começar
                </motion.button>
            </motion.div>
        </div>
    )
}

export default HomePage;