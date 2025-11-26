import React from 'react';
import { PenTool, Layers, Zap, CheckCircle, ChevronRight, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="bg-ink-900 min-h-screen text-white overflow-x-hidden">
      
      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-6 border-b border-ink-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold-600/10 via-ink-900/0 to-ink-900/0 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-900/30 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles size={12} /> Design de Tatuagem com IA
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
              Da Ideia ao <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Decalque</span> em Segundos.
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
              A ferramenta definitiva para tatuadores profissionais. Gere designs personalizados, visualize encaixes anatômicos e obtenha decalques prontos para impressão instantaneamente.
            </p>
            <button 
              onClick={onGetStarted}
              className="group bg-gold-500 hover:bg-gold-400 text-ink-900 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
            >
              Começar Agora Grátis
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs text-gray-500 flex items-center gap-2">
              <CheckCircle size={12} className="text-green-500" /> Sem cartão de crédito
              <span className="text-ink-700">|</span>
              <CheckCircle size={12} className="text-green-500" /> Acesso Imediato
            </p>
          </div>

          <div className="relative">
            {/* Abstract visual representation of the app */}
            <div className="relative z-10 bg-ink-800 rounded-2xl border border-ink-700 p-2 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700">
               <img 
                 src="https://images.unsplash.com/photo-1598371839696-5c5bb63d4430?q=80&w=800&auto=format&fit=crop" 
                 alt="Processo de Tatuagem" 
                 className="rounded-xl opacity-90 grayscale hover:grayscale-0 transition-all duration-500"
               />
               <div className="absolute -bottom-6 -left-6 bg-ink-900 p-4 rounded-xl border border-ink-700 shadow-xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded flex items-center justify-center">
                    <Layers className="text-black" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase">Resultado Gerado</div>
                    <div className="text-white font-bold">Decalque Perfeito</div>
                  </div>
               </div>
            </div>
            <div className="absolute top-10 right-10 w-72 h-72 bg-gold-500/20 rounded-full blur-[100px] pointer-events-none"></div>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-ink-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Fluxo de Trabalho Revolucionário</h2>
            <p className="text-gray-400">Tudo o que você precisa para acelerar sua consulta e processo de criação.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-ink-800/50 p-8 rounded-2xl border border-ink-700 hover:border-gold-500/50 transition-colors group">
              <div className="w-12 h-12 bg-ink-900 rounded-xl flex items-center justify-center text-gold-500 mb-6 group-hover:scale-110 transition-transform">
                <PenTool />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Geração de Arte com IA</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Descreva qualquer conceito — de "Fechamento oriental de dragão" a "Minimalista Traço Fino" — e receba 2 variações exclusivas instantaneamente.
              </p>
            </div>

            <div className="bg-ink-800/50 p-8 rounded-2xl border border-ink-700 hover:border-gold-500/50 transition-colors group">
              <div className="w-12 h-12 bg-ink-900 rounded-xl flex items-center justify-center text-gold-500 mb-6 group-hover:scale-110 transition-transform">
                <Layers />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Decalques Automáticos</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Cada design colorido vem com um decalque de traço limpo extraído perfeitamente, pronto para imprimir em papel térmico.
              </p>
            </div>

            <div className="bg-ink-800/50 p-8 rounded-2xl border border-ink-700 hover:border-gold-500/50 transition-colors group">
              <div className="w-12 h-12 bg-ink-900 rounded-xl flex items-center justify-center text-gold-500 mb-6 group-hover:scale-110 transition-transform">
                <Zap />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Anatomia Inteligente</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Nossa IA entende a anatomia. Solicite um "Fechamento de Braço" ou "Costas" e receba designs adaptados para esses encaixes específicos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section (Mockup) */}
      <section className="py-24 px-6 bg-ink-800 border-y border-ink-700">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
                 <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Clareza Visual</h2>
                 <p className="text-gray-400 mb-8">
                    Pare de perder horas desenhando no iPad apenas para o conceito inicial. Mostre aos seus clientes prévias de alta fidelidade e o decalque simultaneamente.
                 </p>
                 <ul className="space-y-4">
                    {[
                        'Saída Dupla: Cor & Traço (Stencil)',
                        'Vistas Interna & Externa do Membro',
                        'Provador Virtual no Corpo',
                        'Análise de Simbolismo & Significado'
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-300">
                            <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-500">
                                <CheckCircle size={14} />
                            </div>
                            {item}
                        </li>
                    ))}
                 </ul>
            </div>
            <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                    <img src="https://images.unsplash.com/photo-1560707303-4e9803d165df?q=80&w=600&auto=format&fit=crop" className="rounded-lg translate-y-8 shadow-xl" alt="Tattoo 1"/>
                    <img src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=600&auto=format&fit=crop" className="rounded-lg shadow-xl" alt="Tattoo 2"/>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-ink-900 border-t border-ink-800 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center text-ink-900">
              <PenTool size={16} />
            </div>
            <span className="text-xl font-serif font-bold text-white">InkSpire</span>
        </div>
        <p className="text-gray-500 text-sm">© 2024 InkSpire AI. Feito para Artistas.</p>
      </footer>
    </div>
  );
};