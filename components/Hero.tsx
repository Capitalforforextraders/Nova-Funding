
import React from 'react';
import { WHATSAPP_CHANNEL_LINK } from '../constants';
import WhatsAppIcon from './icons/WhatsAppIcon';

const Hero: React.FC<{ onGetFunded: () => void }> = ({ onGetFunded }) => {
    
  const scrollToPackages = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' });
  };
    
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-black animate-pulse-slow"></div>
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10"></div>
        <div 
          className="absolute inset-0 animate-gradient-xy"
          style={{
            background: 'radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.1), transparent 40%), radial-gradient(circle at 75% 75%, rgba(212, 175, 55, 0.1), transparent 40%)',
            backgroundSize: '200% 200%',
          }}
        ></div>
      </div>

      <style>{`
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-xy {
          animation: gradient-xy 15s ease infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        .animate-pulse-slow {
            animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
      
      <div className="relative z-10 text-center container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tighter">
          Get Instantly Funded.
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
            Trade Live on MT5.
          </span>
          <br />
          Withdraw Instantly.
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
          Instant funded accounts with up to 80% profit share. Trusted by 10,000+ traders worldwide.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToPackages}
            className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-3 px-8 rounded-full text-lg transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-yellow-500/20"
          >
            Get Funded Now
          </button>
          <a
            href={WHATSAPP_CHANNEL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <WhatsAppIcon className="h-6 w-6" />
            <span>Join WhatsApp Channel</span>
          </a>
        </div>
        <div className="mt-12 flex items-center justify-center space-x-3 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="24" viewBox="0 0 138 37"><g fill="none" fillRule="evenodd"><path fill="#FFF" d="M37 36.31h12.01V.69H37zM62.019 31.06L51.459.69h12.55l5.25 15.69 5.25-15.69h12.55L76.5 31.06v5.25h-14.48v-5.25zM107.57 36.31h12.01V.69h-12.01zM119.58.69h17.73v10.5H124.7v4.83h11.58v9.9h-11.58v5.16h12.58v5.23H119.58z"></path><path fill="#D4AF37" d="M0 36.31L13.75.69h12.55L12.55 36.31H0z"></path></g></svg>
          <span className="font-semibold text-lg">MT5 Supported</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
