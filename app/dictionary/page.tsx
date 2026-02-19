'use client';

import { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import AdBlock from '../components/AdBlock';

const dreamSymbols = [
  {
    symbol: 'Snake',
    category: 'Animals',
    meaning: 'Transformation, healing, or hidden fears. Snakes often represent rebirth and the shedding of old patterns.',
    keywords: ['transformation', 'fear', 'healing', 'rebirth']
  },
  {
    symbol: 'Ocean',
    category: 'Nature',
    meaning: 'The unconscious mind, emotions, and vast possibilities. Calm oceans suggest peace, while stormy seas indicate emotional turmoil.',
    keywords: ['emotion', 'unconscious', 'depth', 'vastness']
  },
  {
    symbol: 'Falling',
    category: 'Actions',
    meaning: 'Loss of control, anxiety, or fear of failure. May indicate feeling overwhelmed in waking life.',
    keywords: ['control', 'anxiety', 'fear', 'insecurity']
  },
  {
    symbol: 'Flying',
    category: 'Actions',
    meaning: 'Freedom, transcendence, and liberation. Often represents breaking free from limitations or gaining new perspective.',
    keywords: ['freedom', 'liberation', 'perspective', 'transcendence']
  },
  {
    symbol: 'Teeth Falling Out',
    category: 'Body',
    meaning: 'Anxiety about appearance, communication issues, or fear of powerlessness. Common in times of transition.',
    keywords: ['anxiety', 'appearance', 'communication', 'powerlessness']
  },
  {
    symbol: 'House',
    category: 'Places',
    meaning: 'The self and psyche. Different rooms represent different aspects of your personality and life.',
    keywords: ['self', 'psyche', 'identity', 'foundation']
  },
  {
    symbol: 'Fire',
    category: 'Elements',
    meaning: 'Transformation, passion, anger, or purification. Can be destructive or renewing depending on context.',
    keywords: ['passion', 'transformation', 'anger', 'purification']
  },
  {
    symbol: 'Death',
    category: 'Events',
    meaning: 'Endings and new beginnings, transformation, or letting go. Rarely literal, usually symbolic of change.',
    keywords: ['endings', 'transformation', 'change', 'release']
  },
  {
    symbol: 'Baby',
    category: 'People',
    meaning: 'New beginnings, innocence, vulnerability, or a new project/idea taking form in your life.',
    keywords: ['new beginnings', 'innocence', 'potential', 'vulnerability']
  },
  {
    symbol: 'Spider',
    category: 'Animals',
    meaning: 'Creativity, feminine energy, or feeling trapped. Spiders weave their reality and represent creation.',
    keywords: ['creativity', 'feminine', 'trapped', 'weaving']
  },
  {
    symbol: 'Labyrinth',
    category: 'Places',
    meaning: 'Life\'s journey, confusion, or the search for meaning. Represents the path to self-discovery.',
    keywords: ['journey', 'confusion', 'seeking', 'discovery']
  },
  {
    symbol: 'Mirror',
    category: 'Objects',
    meaning: 'Self-reflection, truth, or how you see yourself. May reveal aspects of yourself you\'ve been avoiding.',
    keywords: ['reflection', 'truth', 'self-image', 'awareness']
  },
  {
    symbol: 'Car',
    category: 'Objects',
    meaning: 'Your drive and direction in life. The condition and control of the car reflect your current life path.',
    keywords: ['direction', 'control', 'journey', 'drive']
  },
  {
    symbol: 'Bridge',
    category: 'Places',
    meaning: 'Transition, connection, or crossing from one phase to another. Represents change and passage.',
    keywords: ['transition', 'connection', 'passage', 'change']
  },
  {
    symbol: 'Rain',
    category: 'Nature',
    meaning: 'Emotional release, cleansing, or renewal. Can represent sadness or the washing away of old patterns.',
    keywords: ['cleansing', 'emotion', 'renewal', 'release']
  },
  {
    symbol: 'Wolf',
    category: 'Animals',
    meaning: 'Instinct, loyalty, and guardianship. Wolves in dreams often symbolize your wild nature, independence, or a need to trust your intuition. Can also represent a threat or feeling hunted.',
    keywords: ['instinct', 'loyalty', 'independence', 'intuition', 'threat']
  },
  {
    symbol: 'Owl',
    category: 'Animals',
    meaning: 'Wisdom, intuition, and seeing through deception. Owls represent your ability to perceive hidden truths and navigate darkness. May signal a need for deeper insight.',
    keywords: ['wisdom', 'intuition', 'truth', 'perception', 'night']
  },
  {
    symbol: 'Butterfly',
    category: 'Animals',
    meaning: 'Transformation, rebirth, and personal growth. The butterfly\'s metamorphosis mirrors your own evolution and the beauty that emerges from change.',
    keywords: ['transformation', 'rebirth', 'growth', 'beauty', 'change']
  },
  {
    symbol: 'Dog',
    category: 'Animals',
    meaning: 'Loyalty, friendship, protection, and unconditional love. Dogs represent faithful relationships or aspects of yourself that are trustworthy and devoted.',
    keywords: ['loyalty', 'friendship', 'protection', 'devotion', 'trust']
  },
  {
    symbol: 'Storm',
    category: 'Nature',
    meaning: 'Emotional upheaval, conflict, or dramatic change. Storms represent turbulent feelings or situations that are disrupting your sense of calm and stability.',
    keywords: ['upheaval', 'conflict', 'turbulence', 'drama', 'chaos']
  },
  {
    symbol: 'Forest',
    category: 'Nature',
    meaning: 'The unknown, mystery, and unexplored aspects of the psyche. Dense forests can represent feeling lost, while peaceful woods suggest connection with nature and your inner self.',
    keywords: ['mystery', 'unknown', 'exploration', 'nature', 'lost']
  },
  {
    symbol: 'Mountain',
    category: 'Nature',
    meaning: 'Obstacles, goals, and spiritual ascension. Climbing a mountain represents ambition and struggle, while viewing from the peak symbolizes achievement and perspective.',
    keywords: ['obstacles', 'goals', 'achievement', 'struggle', 'perspective']
  },
  {
    symbol: 'Moon',
    category: 'Nature',
    meaning: 'Feminine energy, intuition, and the unconscious. The moon\'s phases reflect cycles of change, emotions, and hidden aspects of yourself coming to light.',
    keywords: ['feminine', 'intuition', 'cycles', 'unconscious', 'mystery']
  },
  {
    symbol: 'Flowers',
    category: 'Nature',
    meaning: 'Growth, beauty, and the blossoming of potential. Different flowers carry unique meanings, but generally represent joy, love, and the flowering of new aspects of self.',
    keywords: ['growth', 'beauty', 'potential', 'joy', 'blossoming']
  },
  {
    symbol: 'Running',
    category: 'Actions',
    meaning: 'Escape, pursuit, or urgency. Running away suggests avoidance of problems, while running toward something indicates ambition. Being unable to run reflects feeling stuck.',
    keywords: ['escape', 'pursuit', 'urgency', 'avoidance', 'stuck']
  },
  {
    symbol: 'Swimming',
    category: 'Actions',
    meaning: 'Navigating emotions and the unconscious. Easy swimming suggests emotional mastery, while struggling represents being overwhelmed by feelings or circumstances.',
    keywords: ['emotions', 'navigation', 'flow', 'struggle', 'immersion']
  },
  {
    symbol: 'Hiding',
    category: 'Actions',
    meaning: 'Avoidance, shame, or protecting yourself. Hiding reflects fear of being seen, vulnerability, or aspects of yourself you\'re keeping concealed from others or yourself.',
    keywords: ['avoidance', 'shame', 'fear', 'vulnerability', 'concealment']
  },
  {
    symbol: 'Fighting',
    category: 'Actions',
    meaning: 'Internal or external conflict, aggression, or standing up for yourself. Fighting dreams often mirror real-life struggles or the battle between different parts of your psyche.',
    keywords: ['conflict', 'aggression', 'struggle', 'defense', 'confrontation']
  },
  {
    symbol: 'Dancing',
    category: 'Actions',
    meaning: 'Joy, freedom, and self-expression. Dancing represents harmony, celebration, and being in flow with life. Can also symbolize courtship or social connection.',
    keywords: ['joy', 'freedom', 'expression', 'harmony', 'celebration']
  },
  {
    symbol: 'Old Man',
    category: 'People',
    meaning: 'Wisdom, guidance, and the sage archetype. Often represents your inner wisdom, a mentor figure, or connection to ancestral knowledge and life experience.',
    keywords: ['wisdom', 'guidance', 'mentor', 'experience', 'sage']
  },
  {
    symbol: 'Stranger',
    category: 'People',
    meaning: 'Unknown aspects of yourself, new opportunities, or the shadow self. Strangers often represent parts of your personality you haven\'t yet integrated or acknowledged.',
    keywords: ['unknown', 'shadow', 'potential', 'mystery', 'aspects']
  },
  {
    symbol: 'Child',
    category: 'People',
    meaning: 'Inner child, innocence, or unhealed wounds. May represent your younger self, playfulness, or aspects of childhood that need attention or healing.',
    keywords: ['inner child', 'innocence', 'playfulness', 'healing', 'youth']
  },
  {
    symbol: 'Celebrity',
    category: 'People',
    meaning: 'Aspiration, desired qualities, or recognition. Celebrities represent traits you admire or wish to embody. Can also reflect desires for fame, validation, or being seen.',
    keywords: ['aspiration', 'recognition', 'admiration', 'qualities', 'fame']
  },
  {
    symbol: 'Ghost',
    category: 'People',
    meaning: 'Unresolved past, haunting memories, or lingering emotions. Ghosts represent things from your past that still have power over you or need closure.',
    keywords: ['past', 'unresolved', 'haunting', 'memory', 'closure']
  },
  {
    symbol: 'Key',
    category: 'Objects',
    meaning: 'Solutions, access, and unlocking potential. Keys represent answers to problems, opportunities, or the power to unlock new areas of your life or understanding.',
    keywords: ['solution', 'access', 'opportunity', 'unlock', 'power']
  },
  {
    symbol: 'Clock',
    category: 'Objects',
    meaning: 'Time pressure, deadlines, or awareness of mortality. Clocks reflect anxiety about time running out, missed opportunities, or the need to be present in the moment.',
    keywords: ['time', 'pressure', 'deadline', 'mortality', 'urgency']
  },
  {
    symbol: 'Money',
    category: 'Objects',
    meaning: 'Value, self-worth, and resources. Finding money suggests discovering inner resources, while losing it reflects fears of inadequacy or financial anxiety.',
    keywords: ['value', 'worth', 'resources', 'abundance', 'security']
  },
  {
    symbol: 'Ring',
    category: 'Objects',
    meaning: 'Commitment, unity, and eternal bonds. Rings symbolize promises, marriage, loyalty, or the completion of a cycle. Lost rings suggest broken commitments or identity.',
    keywords: ['commitment', 'unity', 'promise', 'marriage', 'completion']
  },
  {
    symbol: 'Ladder',
    category: 'Objects',
    meaning: 'Progress, ascension, and social mobility. Climbing up represents advancement and ambition, while descending may indicate regression or exploring the unconscious.',
    keywords: ['progress', 'ascension', 'ambition', 'advancement', 'climb']
  },
  {
    symbol: 'Hospital',
    category: 'Places',
    meaning: 'Healing, vulnerability, and need for care. Hospitals represent areas of your life requiring attention, recovery from trauma, or fears about health and mortality.',
    keywords: ['healing', 'vulnerability', 'care', 'recovery', 'health']
  },
  {
    symbol: 'School',
    category: 'Places',
    meaning: 'Learning, testing, and social anxiety. School dreams often reflect feelings of being judged, unprepared, or lessons you\'re currently learning in life.',
    keywords: ['learning', 'testing', 'anxiety', 'judgment', 'preparation']
  },
  {
    symbol: 'Church',
    category: 'Places',
    meaning: 'Spirituality, morality, and seeking higher meaning. Churches represent your relationship with the divine, moral questions, or the search for spiritual guidance and community.',
    keywords: ['spirituality', 'morality', 'sacred', 'guidance', 'faith']
  },
  {
    symbol: 'Island',
    category: 'Places',
    meaning: 'Isolation, independence, or sanctuary. Islands can represent feeling alone or cut off, but also symbolize self-sufficiency, escape, and a personal paradise.',
    keywords: ['isolation', 'independence', 'sanctuary', 'solitude', 'escape']
  },
  {
    symbol: 'Desert',
    category: 'Places',
    meaning: 'Spiritual journey, emptiness, or barrenness. Deserts represent feeling depleted, searching for meaning, or the purification that comes through periods of scarcity.',
    keywords: ['emptiness', 'journey', 'barrenness', 'purification', 'solitude']
  },
];

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSymbols = dreamSymbols.filter(
    (item) =>
      item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            Dream Dictionary
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore common dream symbols and their meanings. Understanding these archetypes can help unlock deeper insights into your dreams.
          </p>
        </div>

        {/* Top Ad */}
        <AdBlock size="banner" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="glass-strong p-6 mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search symbols (e.g., 'snake', 'flying', 'water')..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full glass pl-12 pr-4 py-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Symbol Grid */}
            <div className="grid gap-6">
              {filteredSymbols.map((item, index) => (
                <div key={index} className="glass-strong p-6 hover:bg-purple-500/10 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="w-6 h-6 text-purple-400" />
                      <h3 className="text-2xl font-bold text-purple-300">{item.symbol}</h3>
                    </div>
                    <span className="text-xs px-3 py-1 glass rounded-full text-pink-400">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-3">{item.meaning}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.keywords.map((keyword, kIndex) => (
                      <span
                        key={kIndex}
                        className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {filteredSymbols.length === 0 && (
              <div className="glass-strong p-12 text-center">
                <p className="text-gray-400 text-lg">
                  No symbols found matching "{searchTerm}". Try a different search term.
                </p>
              </div>
            )}

            {/* Bottom Ad */}
            <AdBlock size="rectangle" className="mt-8 mx-auto" />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-strong p-6">
              <h3 className="text-xl font-bold text-purple-300 mb-4">Categories</h3>
              <div className="space-y-2">
                {['Animals', 'Nature', 'Actions', 'Places', 'Objects', 'People', 'Events', 'Body', 'Elements'].map(
                  (category, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-3 py-2 glass hover:bg-purple-500/20 text-gray-300 transition-all rounded"
                    >
                      {category}
                    </button>
                  )
                )}
              </div>
            </div>

            <AdBlock size="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
