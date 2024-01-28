import React from 'react'
import ProductList from '../Components/ProductList/ProductList'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'

function ProductListPage() {
  return (
    <div>
      <Navbar/>
        <ProductList/>
        <Footer/>
    </div>
  )
}

export default ProductListPage