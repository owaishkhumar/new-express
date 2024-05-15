import React, { useState } from 'react'
import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App = () => {
  const pageSize = '6';
  const apiKey = 'e54e724bfd0744fbb87e12d466856009'
 

  const [progress, setProgress] = useState(0)

  
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <LoadingBar
          color='#f11946'
          progress={progress}
          shadow={true}
        // onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          <Route path="/" element={<News setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general" apiKey={apiKey} />} />
          <Route path="/business" element={<News setProgress={setProgress} key="business" pageSize={pageSize} country="in" category="business" apiKey={apiKey} />} />
          <Route path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment" apiKey={apiKey} />} />
          {/* <Route path="/general" element={<News setProgress={setProgress} pageSize={pageSize}  country="in" category="general" />} apiKey={apiKey} /> */}
          <Route path="/health" element={<News setProgress={setProgress} key="health" pageSize={pageSize} country="in" category="health" apiKey={apiKey} />} />
          <Route path="/science" element={<News setProgress={setProgress} key="science" pageSize={pageSize} country="in" category="science" apiKey={apiKey} />} />
          <Route path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={pageSize} country="in" category="sports" apiKey={apiKey} />} />
          <Route path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={pageSize} country="in" category="technology" apiKey={apiKey} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App