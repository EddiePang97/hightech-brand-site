import React from 'react'
import Hero from './sections/Hero'
import About from './sections/About'
import BoxStackZoom from './sections/BoxStackZoom'
import Footer from './sections/footter'

import { wavePartyKData, onfnData, f0fData, wavePartyKVideoSources, onfnVideoSources, f0fVideoSources } from './constants/cardData'
function App() {
  return (
    <main>
      <Hero />
      <About/>
      <BoxStackZoom title="Wave Party K" cardData={wavePartyKData} videoSources={wavePartyKVideoSources}/>
      <BoxStackZoom title="1949 Club" cardData={onfnData} videoSources={onfnVideoSources}/>
      <BoxStackZoom title="404 Club Not Found" cardData={f0fData} videoSources={f0fVideoSources}/>
      <Footer/>
    </main>
  )
}

export default App
