import React from 'react';
import { PenTool, Layers, Zap, CheckCircle, ChevronRight, Sparkles, Star, Smartphone, Printer, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="bg-ink-900 min-h-screen text-white overflow-x-hidden font-sans selection:bg-gold-500 selection:text-black">
      
      {/* 1. HERO SECTION */}
      <header className="relative pt-32 pb-24 px-6 border-b border-ink-800 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold-600/10 via-ink-900/0 to-ink-900/0 pointer-events-none"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ink-800 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-widest hover:bg-ink-700 transition-colors cursor-default">
              <Sparkles size={12} /> A Nova Era da Tatuagem
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
              Sua Criatividade, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600">Potencializada pela IA.</span>
            </h1>
            
            <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
              O InkSpire é o assistente definitivo para tatuadores. Transforme ideias vagas em designs profissionais, decalques prontos e simulações anatômicas em segundos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={onGetStarted}
                className="group bg-gold-500 hover:bg-gold-400 text-ink-900 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:-translate-y-1"
              >
                Criar Design Agora
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-xl font-bold text-lg border border-ink-700 hover:bg-ink-800 text-gray-300 transition-all">
                Ver Galeria
              </button>
            </div>
            
            <div className="pt-8 flex items-center gap-6 text-sm text-gray-500 border-t border-ink-800/50">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-ink-900 bg-gray-700 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p>Junte-se a <strong className="text-white">+2.000 artistas</strong> usando InkSpire.</p>
            </div>
          </div>

          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* Cards Flutuantes */}
            <div className="relative z-10 w-full max-w-md bg-ink-800 rounded-2xl border border-ink-700 p-3 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700 group">
               <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
               <img 
                 src="https://images.unsplash.com/photo-1598371839696-5c5bb63d4430?q=80&w=800&auto=format&fit=crop" 
                 alt="Processo de Tatuagem" 
                 className="rounded-xl w-full h-[400px] object-cover filter contrast-125"
               />
               <div className="absolute bottom-6 left-6 right-6 bg-ink-900/90 backdrop-blur p-4 rounded-xl border border-ink-700 shadow-xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded flex items-center justify-center shrink-0">
                    <Layers className="text-black" />
                  </div>
                  <div>
                    <div className="text-xs text-gold-500 uppercase font-bold tracking-wider">Gerado em 3s</div>
                    <div className="text-white font-bold text-sm">Decalque & Arte Final</div>
                  </div>
               </div>
            </div>
            
            {/* Decorative Elements behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold-500/5 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </header>

      {/* 2. STATS BAR */}
      <div className="border-y border-ink-800 bg-ink-900/50 backdrop-blur relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Designs Gerados', value: '50k+' },
            { label: 'Artistas Ativos', value: '2.5k' },
            { label: 'Tempo Médio', value: '< 5s' },
            { label: 'Satisfação', value: '4.9/5' },
          ].map((stat, idx) => (
            <div key={idx}>
              <div className="text-3xl font-serif font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gold-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. FEATURES GRID */}
      <section className="py-24 px-6 bg-ink-900 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Ferramentas Feitas para o Estúdio</h2>
            <p className="text-gray-400 text-lg">
              Desenvolvemos cada funcionalidade pensando no dia a dia do tatuador profissional. 
              Do brainstorming inicial à impressão do stencil.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <PenTool size={32} />,
                title: "Geração Multi-Estilo",
                desc: "Realismo, Old School, Oriental ou Fine Line. Nossa IA foi treinada especificamente nos estilos de tatuagem mais populares."
              },
              {
                icon: <Printer size={32} />,
                title: "Decalque Automático",
                desc: "Esqueça o Photoshop. O InkSpire extrai automaticamente as linhas do desenho e gera um stencil limpo, pronto para a impressora térmica."
              },
              {
                icon: <Smartphone size={32} />,
                title: "Provador Virtual (AR)",
                desc: "Tire uma foto do braço do cliente e projete o design instantaneamente sobre a pele para validar o tamanho e o encaixe."
              },
              {
                icon: <Layers size={32} />,
                title: "Vistas Anatômicas",
                desc: "Para fechamentos de braço ou perna, geramos automaticamente as vistas interna e externa para garantir que o desenho flua corretamente."
              },
              {
                icon: <Zap size={32} />,
                title: "Brainstorming Rápido",
                desc: "O cliente não sabe o que quer? Gere 10 variações de uma ideia em minutos e feche o orçamento na hora."
              },
              {
                icon: <CheckCircle size={32} />,
                title: "Sem Direitos Autorais",
                desc: "Todos os designs gerados são 100% originais e livres para uso comercial. Você é o dono da arte."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-ink-800/40 p-8 rounded-2xl border border-ink-700/50 hover:border-gold-500/30 hover:bg-ink-800 transition-all group">
                <div className="w-14 h-14 bg-ink-900 rounded-2xl flex items-center justify-center text-gold-500 mb-6 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-black transition-all shadow-lg shadow-black/50">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALLERY SHOWCASE */}
      <section className="py-24 bg-ink-800 border-y border-ink-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-serif font-bold text-white mb-4">Qualidade de Impressão</h2>
              <p className="text-gray-400 max-w-xl">
                Veja exemplos reais de designs gerados pela plataforma e seus respectivos decalques.
              </p>
            </div>
            <button onClick={onGetStarted} className="text-gold-500 font-bold hover:text-gold-400 flex items-center gap-2">
              Ver todos os estilos <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                img: "https://images.unsplash.com/photo-1560707303-4e9803d165df?q=80&w=600", 
                style: "Oriental / Irezumi",
                prompt: "Dragão japonês envolvendo o antebraço com flores de cerejeira" 
              },
              { 
                img: "https://images.unsplash.com/photo-1590246255075-1954c8d839e6?q=80&w=600", 
                style: "Realismo Preto e Cinza",
                prompt: "Retrato realista de um leão com coroa e fumaça" 
              },
              { 
                img: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=600", 
                style: "Neo Tradicional",
                prompt: "Mulher cigana com moldura ornamentada e rosas" 
              }
            ].map((item, i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer">
                <img src={item.img} alt={item.style} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <div className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-2">{item.style}</div>
                  <p className="text-white text-sm font-medium leading-snug">"{item.prompt}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-24 px-6 bg-ink-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Do Conceito à Pele em 3 Passos</h2>
          </div>
          
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-ink-700 -z-0"></div>
            
            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              {[
                { step: "01", title: "Descreva", desc: "Digite sua ideia ou carregue uma referência visual." },
                { step: "02", title: "Gere", desc: "A IA cria variações coloridas e o decalque em segundos." },
                { step: "03", title: "Imprima", desc: "Teste no corpo virtualmente ou imprima direto no papel." }
              ].map((s, i) => (
                <div key={i} className="text-center bg-ink-900 md:bg-transparent p-4">
                  <div className="w-24 h-24 mx-auto bg-ink-800 border-4 border-ink-900 rounded-full flex items-center justify-center text-3xl font-serif font-bold text-gold-500 mb-6 shadow-xl relative z-10">
                    {s.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-gray-400 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA BOTTOM */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-gold-600 to-amber-700 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-ink-900 mb-6">Pronto para modernizar seu estúdio?</h2>
            <p className="text-ink-900/80 text-lg mb-8 max-w-2xl mx-auto font-medium">
              Pare de perder horas desenhando. Comece a criar e faturar mais com o InkSpire hoje mesmo.
            </p>
            <button 
              onClick={onGetStarted}
              className="bg-ink-900 text-white px-10 py-5 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl"
            >
              Criar Conta Gratuita
            </button>
            <p className="mt-4 text-ink-900/60 text-sm">Não é necessário cartão de crédito.</p>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-ink-950 pt-20 pb-10 border-t border-ink-800 text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center text-ink-900">
                  <PenTool size={18} />
                </div>
                <span className="text-xl font-serif font-bold text-white">InkSpire</span>
            </div>
            <p className="mb-6 leading-relaxed">
              A plataforma de inteligência artificial feita por tatuadores, para tatuadores. Revolucionando a arte na pele.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-ink-800 rounded-full flex items-center justify-center hover:bg-gold-500 hover:text-black transition-colors"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 bg-ink-800 rounded-full flex items-center justify-center hover:bg-gold-500 hover:text-black transition-colors"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 bg-ink-800 rounded-full flex items-center justify-center hover:bg-gold-500 hover:text-black transition-colors"><Facebook size={18} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Produto</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-gold-500 transition-colors">Funcionalidades</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Galeria de Exemplos</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Planos e Preços</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Atualizações</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Recursos</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-gold-500 transition-colors">Blog do Artista</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Guia de Prompts</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Comunidade</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Ajuda & Suporte</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-gold-500 transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Licença de Arte</a></li>
              <li className="flex items-center gap-2 mt-6">
                <Mail size={16} className="text-gold-500" /> contato@inkspire.com
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-ink-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2024 InkSpire AI. Todos os direitos reservados.</p>
          <div className="flex gap-8 text-xs">
            <span>Desenvolvido com ⚡ e IA</span>
            <span>Brasil 🇧🇷</span>
          </div>
        </div>
      </footer>
    </div>
  );
};