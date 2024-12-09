import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app">
      {/* Votre navigation ou header ici si nécessaire */}
      <Outlet /> {/* C'est ici que Programs sera rendu */}
    </div>
  );
}

export default App;
