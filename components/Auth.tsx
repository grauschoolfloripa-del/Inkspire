import React, { useState } from 'react';
import { User } from '../types';
import { Mail, Lock, User as UserIcon, ArrowRight, Loader2 } from 'lucide-react';

interface AuthProps {
  onLogin: (user: User) => void;
  onClose: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulation of API call
    setTimeout(() => {
      setLoading(false);
      onLogin({
        email: formData.email,
        name: formData.name || 'Artista'
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-ink-900 border border-ink-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="p-8 pb-0 text-center">
          <h2 className="text-3xl font-serif text-white mb-2">
            {isLogin ? 'Bem-vindo de volta' : 'Junte-se ao InkSpire'}
          </h2>
          <p className="text-gray-400 text-sm">
            {isLogin ? 'Entre com suas credenciais para acessar o estúdio.' : 'Comece a criar decalques com IA hoje.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Nome do Estúdio / Artista</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 text-gray-500" size={18} />
                <input 
                  type="text" 
                  required 
                  className="w-full bg-ink-800 border border-ink-700 rounded-lg py-2.5 pl-10 text-white focus:border-gold-500 focus:outline-none transition-colors"
                  placeholder="Ex: Black Rose Studio"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
              <input 
                type="email" 
                required 
                className="w-full bg-ink-800 border border-ink-700 rounded-lg py-2.5 pl-10 text-white focus:border-gold-500 focus:outline-none transition-colors"
                placeholder="artista@inkspire.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
              <input 
                type="password" 
                required 
                className="w-full bg-ink-800 border border-ink-700 rounded-lg py-2.5 pl-10 text-white focus:border-gold-500 focus:outline-none transition-colors"
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-gold-500 hover:bg-gold-400 text-black font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold-500/20"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                {isLogin ? 'Entrar no Estúdio' : 'Criar Conta'} <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="bg-ink-800/50 p-4 text-center border-t border-ink-700">
          <p className="text-sm text-gray-400">
            {isLogin ? "Não tem uma conta?" : "Já possui conta?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-gold-500 hover:text-gold-400 font-bold hover:underline"
            >
              {isLogin ? 'Cadastre-se' : 'Entrar'}
            </button>
          </p>
          <button onClick={onClose} className="mt-4 text-xs text-gray-600 hover:text-gray-400">
            Cancelar & Voltar
          </button>
        </div>
      </div>
    </div>
  );
};