import GNB from "./components/GNB";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <GNB />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
