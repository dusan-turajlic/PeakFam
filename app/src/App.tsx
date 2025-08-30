import { atom, useAtom } from 'jotai';

// Example atom for calorie tracking
const caloriesAtom = atom(0);

function App() {
  const [calories, setCalories] = useAtom(caloriesAtom);

  const addCalories = (amount: number) => {
    setCalories(calories + amount);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            PeakFam
          </h1>
          <p className="text-lg text-gray-600">
            Macro and Calorie Tracking App
          </p>
        </header>

        <main className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Daily Calories
            </h2>
            <div className="text-6xl font-bold text-blue-600 mb-4">
              {calories}
            </div>
            <div className="space-x-4">
              <button
                onClick={() => addCalories(100)}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                +100
              </button>
              <button
                onClick={() => addCalories(200)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                +200
              </button>
              <button
                onClick={() => setCalories(0)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
