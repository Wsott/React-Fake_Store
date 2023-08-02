import './styles/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Categories from './pages/Categories'
import Products from './pages/Products'
import CartDetail from './pages/CartDetail'
import { QueryClient, QueryClientProvider } from 'react-query'
import Navbar from './components/shared/Navbar'
import AdminProductForm from './components/unique/AdminProductForm'
import AdminProduct from './pages/AdminProduct'
import AdminPanel from './pages/AdminPanel'
import AdminCategoryForm from './components/unique/AdminCategoryForm'
import AdminCategory from './pages/AdminCategory'
import ProductInfo from './pages/ProductInfo'
import Footer from './components/shared/Footer'
import NotFound from './pages/NotFound'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Register/>}/>
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/categories/create" element={<AdminCategory/>}/>
          <Route path="/categories/edit/:id" element={<AdminCategoryForm/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:id" element={<ProductInfo/>}/>
          <Route path="/products/create" element={<AdminProduct/>}/>
          <Route path="/products/edit/:id" element={<AdminProductForm/>}/>
          <Route path="/cart-detail" element={<CartDetail/>}/>
          <Route path="/admin-panel" element={<AdminPanel/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
