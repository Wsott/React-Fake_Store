import './styles/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Categories from './pages/Categories'
import Products from './pages/Products'
import CartDetail from './pages/CartDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/products/:id" element={<Products/>}/>
        <Route path="/products/create" element={<Products/>}/>
        <Route path="/products/edit/:id" element={<Products/>}/>
        <Route path="/cart-detail" element={<CartDetail/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
