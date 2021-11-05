import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loading from 'src/components/Loading';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Connect from './pages/Connect';
import Profil from './pages/Profil';
import Categories from './pages/Categories';
import Services from './pages/Services';
import NavBaar from './components/NavBaar';
import Footer from './components/Footer';
import { fetchCategories } from './actions/category';
import { fetchServices } from './actions/service';

function App() {
  // We need to know if the user is logged and if is admin
  // to enable or disable specific routes
  const isLogged = useSelector((state) => state.user.logged);
  const isAdmin = useSelector((state) => state.user.isAdmin);


  // We need to have the loading state of categories and services
  const serviceLoading = useSelector((state) => state.services.loading);
  const categoryLoading = useSelector((state) => state.categories.loading);

  const dispatch = useDispatch();

  // At the first render of App, we fetch categories and services
  // we checked if there is a token in localStorage
  // if there is, we set the user as logged
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchServices());
    // const token = localStorage.getItem('token');
    // if (token) {
    //   dispatch({ type: 'SET_LOGGED', payload: true });
    // }
  }, []);

  return (
    <Router>
      <NavBaar />
      {/* We use ternary operator to display Loading components
      if categories or services is loading */}
      {(serviceLoading || categoryLoading) ? (
        <Loading />
      )
        : (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/a-propos" component={About} />
            <Route path="/inscription" component={Register} />
            <Route path="/connexion" component={Connect} />
            <Route path="/profil" component={Profil} />
            <Route path="/categories" exact component={Categories} />
            <Route path="/categories/:id/services"component={Services} />
          </Switch>
        )}
      <Footer />
    </Router>
  );
}

export default App;
