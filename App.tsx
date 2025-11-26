import React, { useState } from 'react';
import { TattooStyle, GeneratedSet, User } from './types';
import { generateTattooSet, generateTattooMeaning } from './services/geminiService';
import { StyleSelector } from './components/StyleSelector';
import { ResultCard } from './components/ResultCard';
import { BodyTryOn } from './components/BodyTryOn';
import { LandingPage } from './components/LandingPage';
import { Auth } from './components/Auth';
import { PenTool, Loader2, Sparkles, AlertCircle, Image as ImageIcon, X, LogOut, User as UserIcon } from 'lucide-react';

const App: React.FC = () => {
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // App State
  const [description, setDescription] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<TattooStyle>(TattooStyle.REALISM);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<GeneratedSet[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);

  const handleReferenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setReferenceImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearReference = () => {
    setReferenceImage(null);
  }

  const handleGenerate = async () => {
    if (!description.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const descLower = description.toLowerCase();
      
      const limbMap = [
        { keys: ['ante braço', 'antebraço', 'forearm'], name: 'Antebraço' },
        { keys: ['braço', 'arm'], name: 'Braço Completo' },
        { keys: ['perna', 'leg'], name: 'Perna Completa' },
        { keys: ['panturrilha', 'calf'], name: 'Panturrilha' },
        { keys: ['coxa', 'thigh'], name: 'Coxa' },
        { keys: ['costas', 'back'], name: 'Costas' },
        { keys: ['peito', 'chest'], name: 'Peito' }
      ];

      const closureKeywords = ['fechamento', 'fechar', 'full', 'completo', 'inteiro', 'sleeve', 'manga'];
      
      const hasClosure = closureKeywords.some(k => descLower.includes(k));
      const matchedLimb = limbMap.find(limb => limb.keys.some(k => descLower.includes(k)));

      // Only force split view for cylindrical limbs (arms/legs), not flat surfaces like back/chest unless specifically requested
      const isCylindricalLimb = matchedLimb && !['Costas', 'Peito'].includes(matchedLimb.name);
      const isSleeveRequest = hasClosure && isCylindricalLimb;

      let prompt1 = description;
      let prompt2 = description;
      let label1 = "Variação 1";
      let label2 = "Variação 2";

      if (isSleeveRequest && matchedLimb) {
        prompt1 = `Project: Tattoo for ${matchedLimb.name}. View: EXTERNAL/OUTER side. Context: ${description}. Ensure the shape fits the ${matchedLimb.name} specifically.`;
        prompt2 = `Project: Tattoo for ${matchedLimb.name}. View: INTERNAL/INNER side. Context: ${description}. Ensure the shape fits the ${matchedLimb.name} specifically.`;
        
        label1 = `Lado Externo (${matchedLimb.name})`;
        label2 = `Lado Interno (${matchedLimb.name})`;
      } else {
        prompt1 = `${description}. Variation 1: Bold composition.`;
        prompt2 = `${description}. Variation 2: Alternative composition/perspective.`;
      }

      const prompt1Promise = generateTattooSet(prompt1, selectedStyle, referenceImage);
      const prompt2Promise = generateTattooSet(prompt2, selectedStyle, referenceImage);
      const meaningPromise = generateTattooMeaning(description, selectedStyle);

      const [set1, set2, meaningText] = await Promise.all([prompt1Promise, prompt2Promise, meaningPromise]);

      const newResults: GeneratedSet[] = [
        {
          id: crypto.randomUUID(),
          originalPrompt: description,
          style: selectedStyle,
          colorImage: set1.colorImage,
          stencilImage: set1.stencilImage,
          timestamp: Date.now(),
          viewLabel: label1,
          meaning: meaningText
        },
        {
          id: crypto.randomUUID(),
          originalPrompt: description,
          style: selectedStyle,
          colorImage: set2.colorImage,
          stencilImage: set2.stencilImage,
          timestamp: Date.now(),
          viewLabel: label2,
          meaning: meaningText
        }
      ];

      setResults(prev => [...newResults, ...prev]);
    } catch (err: any) {
      setError(err.message || "Algo deu errado ao gerar os designs. Por favor, tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  // ------------------------------------------------------------------
  // ROUTING LOGIC (Simulated)
  // ------------------------------------------------------------------

  if (!user) {
    return (
      <>
        <LandingPage onGetStarted={() => setShowAuthModal(true)} />
        {showAuthModal && (
          <Auth 
            onLogin={(u) => { setUser(u); setShowAuthModal(false); }} 
            onClose={() => setShowAuthModal(false)} 
          />
        )}
      </>
    );
  }

  // ------------------------------------------------------------------
  // MAIN DASHBOARD (Authenticated)
  // ------------------------------------------------------------------

  return (
    <div className="min-h-screen pb-20 bg-ink-900 text-gray-200 font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-ink-900/95 backdrop-blur border-b border-ink-800 shadow-xl">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center text-ink-900 shadow-lg shadow-gold-500/20">
              <PenTool size={20} />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-gray-100 tracking-wide">InkSpire</h1>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">AI Studio</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
               <UserIcon size={14} /> {user.name}
             </div>
             <button 
               onClick={() => setUser(null)}
               className="p-2 hover:bg-ink-800 rounded-full text-gray-400 hover:text-white transition-colors"
               title="Sair"
             >
               <LogOut size={18} />
             </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        
        {/* Input Section */}
        <section className="bg-ink-800 rounded-2xl p-6 border border-ink-700 shadow-xl">
          <h2 className="text-xl font-serif text-white mb-6 flex items-center gap-2">
            <Sparkles className="text-gold-500" size={20} /> Novo Projeto
          </h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Descrição da Ideia
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descreva a tatuagem... (ex: 'Fechamento de antebraço oriental', 'Lobo na panturrilha')"
                            className="w-full h-32 bg-ink-900 border border-ink-700 rounded-xl p-4 text-gray-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none resize-none transition-all placeholder-gray-600"
                        />
                    </div>
                </div>

                {/* Reference Image Input */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Imagem de Referência (Opcional)
                    </label>
                    {!referenceImage ? (
                        <div className="h-32 bg-ink-900 border border-ink-700 border-dashed rounded-xl flex flex-col items-center justify-center text-gray-500 hover:border-gold-500/50 hover:text-gold-500 transition-colors cursor-pointer relative">
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleReferenceUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <ImageIcon size={24} className="mb-2" />
                            <span className="text-xs">Carregar Referência</span>
                        </div>
                    ) : (
                        <div className="h-32 bg-ink-900 border border-ink-700 rounded-xl overflow-hidden relative group">
                            <img src={referenceImage} alt="Reference" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                            <button 
                                onClick={clearReference}
                                className="absolute top-2 right-2 bg-black/50 hover:bg-red-500/80 text-white p-1 rounded-full transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Estilo de Arte
              </label>
              <StyleSelector selectedStyle={selectedStyle} onSelect={setSelectedStyle} />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !description.trim()}
              className={`
                w-full py-4 rounded-xl font-bold text-lg uppercase tracking-widest transition-all
                flex items-center justify-center gap-3
                ${isGenerating || !description.trim()
                  ? 'bg-ink-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gold-500 text-ink-900 hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/30'
                }
              `}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin" /> A Tinta Está Fluindo...
                </>
              ) : (
                'Gerar Designs e Decalques'
              )}
            </button>
            
            {error && (
               <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex items-start gap-3 text-red-200 text-sm">
                 <AlertCircle size={18} className="mt-0.5 shrink-0" />
                 {error}
               </div>
            )}
          </div>
        </section>

        {/* Results Section */}
        {results.length > 0 && (
          <section className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
             <div className="flex items-center gap-4 my-8">
                <div className="h-px bg-ink-700 flex-1"></div>
                <h3 className="text-gray-400 font-serif text-sm uppercase tracking-widest">Últimas Criações</h3>
                <div className="h-px bg-ink-700 flex-1"></div>
             </div>

             <div className="grid gap-8">
               {results.map((set, index) => (
                 <div key={set.id} className="bg-ink-800/50 rounded-2xl p-6 border border-ink-700/50">
                    <div className="flex justify-between items-center mb-4">
                       <h4 className="text-gold-500 font-serif text-lg">
                         {set.viewLabel ? set.viewLabel : `Opção #${results.length - index}`}
                       </h4>
                       <span className="text-xs text-gray-500">{new Date(set.timestamp).toLocaleTimeString()}</span>
                    </div>
                    
                    <ResultCard set={set} />
                    
                    {/* Try-On Section for this specific result */}
                    <div className="mt-4 pt-4 border-t border-ink-700/50">
                         <details className="group">
                            <summary className="flex cursor-pointer items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors list-none select-none">
                                <span className="bg-ink-900 p-1 rounded">+</span> Testar design em foto do corpo
                            </summary>
                            <div className="mt-4">
                                <BodyTryOn tattooBase64={set.colorImage} />
                            </div>
                         </details>
                    </div>
                 </div>
               ))}
             </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default App;