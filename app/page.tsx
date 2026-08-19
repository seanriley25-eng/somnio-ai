import DreamInput from './components/DreamInput';
import DailyRitual from './components/DailyRitual';
import DemoPreview from './components/DemoPreview';
import AdBlock from './components/AdBlock';

export default function Home() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            Unlock Your Subconscious.
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-purple-200 mb-6">
            Every Morning.
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Describe last night&apos;s dream. Somnio reads the symbols, spots the patterns across
            your past dreams, and hands you an insight to carry into your day.
          </p>
        </div>

        <AdBlock size="banner" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DreamInput />
            <DemoPreview />
            <AdBlock size="rectangle" className="mx-auto" />
          </div>

          <div className="lg:col-span-1">
            <DailyRitual />
            <AdBlock size="sidebar" className="mt-8" />
          </div>
        </div>

        <AdBlock size="banner" className="mt-12" />
      </div>
    </div>
  );
}
