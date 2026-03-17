import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { Sujets } from "./pages/Sujets";
import { Periodes } from "./pages/Periodes";
import { Formations } from "./pages/Formations";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">        
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">MesNotes</h1>
          <div className="space-x-4">
            <Link title="Sujets" to="/" className="text-gray-600 hover:text-blue-500">Sujets</Link>
            <Link title="Periodes" to="/periodes" className="text-gray-600 hover:text-blue-500">Périodes</Link>
            <Link title="Formations" to="/formations" className="text-gray-600 hover:text-blue-500">Formations</Link>
          </div>          
          <div className="text-2xl">🌐</div>
        </nav>
        
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Sujets />}/>
            <Route path="/periodes" element={<Periodes/>}/>
            <Route path="/formations" element={<Formations/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;