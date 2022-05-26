import Catalog from "../../features/catalog/Catalog";
import {Container, createTheme, CssBaseline, ThemeProvider} from '@mui/material'
import Header from "./Header";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactsPage from "../../features/contacts/ContactsPage";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  const palatteType = darkMode? 'dark' : 'light'

  const theme = createTheme({
    palette:{
      mode : palatteType,
      background: {
        default: palatteType==='light'? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange(){
    setDarkMode(!darkMode);
  }
 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/*to remove default css of browser*/}
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Routes>
          <Route  path='/' element={<HomePage/>} />
          <Route path='/catalog' element={<Catalog/>} />
          <Route path='/catalog/:id' element={<ProductDetails/>} />
          <Route path='/about' element={<AboutPage/>} />
          <Route path='/contact' element={<ContactsPage/>} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
