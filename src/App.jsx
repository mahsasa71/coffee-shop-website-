import { useRoutes } from "react-router-dom";
import AuthProvider from "./pages/context/AuthContext";
import CartProvider from "./pages/context/CartContext"; 
import Routs from "./Routs";


function App() {
  const router = useRoutes(Routs);

  return (

    <AuthProvider>
      <CartProvider> 
        {router}
      </CartProvider>
    </AuthProvider>

  );
}

export default App;
