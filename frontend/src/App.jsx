import { SpeedInsights } from "@vercel/speed-insights/next"
import Nav from "./components/Navbar";
import Pastebin from "./components/Pastebox";

function App() {
  return (
    <div className="bg-nav-color h-screen">
      <Nav />
      <Pastebin />
      <SpeedInsights/>
    </div>
  );
}

export default App;
