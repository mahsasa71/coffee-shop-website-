
import Home from "../src/pages/home/Home";
import Login from "./pages/login/Login";
import RegisterKamal from "./pages/registerkamal copy/RegisterKamal";
import Checkout from "./pages/Checkout/Checkout";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ArticleDetail from "./pages/articleDetails/ArticleDetail";
import AdminPanel from '../src/pages/AdminPanel/Index'
import Users from "./pages/AdminPanel/users/Users";
import Products from "./pages/AdminPanel/products/Products";
import Articles from "./pages/AdminPanel/article/Articles";
import Comments from "./pages/AdminPanel/comments/Comments";
import Spinner from "./pages/spinner/Spinner";
import DashboardLayoutUser from "./pages/userPanel";
import UserDashboard from "./pages/userPanel/UserDashboard";
import ArticleComments from "./pages/AdminPanel/articleComments/ArticleComments";
import GiftsAdmin from "./pages/AdminPanel/gifts/Gifts";
import Orders from "./pages/AdminPanel/orders/Orders";
import MainPage from "./pages/AdminPanel/mainPage/MainPage";
import ProtectedRoute from "./ProtectedRoute";
const routes = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/spinner", element: <Spinner /> },
    { path: "/register", element: <RegisterKamal /> },
    { path: "/checkout", element: <Checkout /> },
    { path: "/product/:id", element: <ProductDetail /> },
    { path: "/article/:id", element: < ArticleDetail/> },
{ 
    path: "/p-admin", 
    element: (
      <ProtectedRoute>
        <AdminPanel />
      </ProtectedRoute>
    ),
    children: [
      { path: "users", element: <Users /> },
      { path: "products", element: <Products /> },
      { path: "adminArticle", element: <Articles /> },
      { path: "comments", element: <Comments /> },
      { path: "articleComments", element: <ArticleComments /> },
      { path: "gifts", element: <GiftsAdmin /> },
      { path: "orders", element: < Orders/> },
      { path: "mainPage", element: < MainPage/> },
    ],
  },

        { path: "/p-user", element: <DashboardLayoutUser /> ,
              children: [

       { path: "information", element: <UserDashboard /> },
    //    { path: "products", element: <Products /> },
    //    { path: "adminArticle", element: < AdminArticle/> },
    //    { path: "comments", element: <Comments /> },
        

  
        ],

    },
    
];


export default routes