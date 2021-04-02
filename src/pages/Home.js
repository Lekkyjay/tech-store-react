import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Featured from '../components/Home/Featured'
import Services from '../components/Home/Services'

const Home = () => {
  return (
    <div>
      <Hero title="awesome gadgets" max="true">
        <Link to="/products" className="main-link" style={{ margin: "2rem" }}>
          our products
        </Link>
      </Hero>
      <Services />
      <Featured />
    </div>
  )
}

export default Home
