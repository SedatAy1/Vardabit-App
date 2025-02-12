// Düzeltilmiş App.js ÖRNEĞİ:
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList/ProductList'; // Yolun DOĞRU olduğundan emin olun.
import ProductDetail from './pages/ProductDetail/ProductDetail'; // Yolun DOĞRU olduğundan emin olun
import  GlobalStyles  from './styles/GlobalStyles'; // Eğer GlobalStyles bir bileşense

function App() {
  return (
    <Router>
       <GlobalStyles />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;