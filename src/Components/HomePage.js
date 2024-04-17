import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import SearchCities from './SearchCities';


const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header button1Text="Calculate" button2Text="Reduce"/>
      <Main/>
      <div className="App">
      <h1>Know Air Quality Index(AQI)</h1>
      <SearchCities />
      </div>
      <Footer/>
    </div>
  )
}

export default HomePage;
