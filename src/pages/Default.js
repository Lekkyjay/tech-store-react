import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import defaultBcg from '../images/defaultBcg.jpeg'

const Default = () => {
  
  return (
    <Hero img={defaultBcg} title="404" max="true">
      <h2 className="text-uppercase">page not found</h2>
      <Link to="/" className="main-link" style={{ marginTop: "2rem" }}>
        return home
      </Link>
    </Hero>
  )
}

export default Default
