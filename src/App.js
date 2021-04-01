import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Switch } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import Default from './pages/Default';
import Navbar from './components/Navbar';
import SideCart from './components/SideCart';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <SideCart />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/about' component={About} />
        <Route path='/cart' component={Cart} />
        <Route path='/contact' component={Contact} />
        <Route path='/products' exact component={Products} />
        <Route path='/products/:id' component={SingleProduct} />
        <Route component={Default} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
