import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import List from './Components/List';
import Favourites from './Components/Favourite';
import  {BrowserRouter,Routes,Route}   from  'react-router-dom'
function App() {
  return (
   <>
   <BrowserRouter>
   <Navbar/>
  {/* <Banner/> */}
  <Routes>
    <Route path="/"  element={
      <>
      <Banner/>
      <List/>
      </>
    
    }/>
    <Route path="/faV"  element={<Favourites/>}/>
  </Routes>
  
  
  </BrowserRouter>
   </>
  );
}

export default App;
