import './App.css';

import { useEffect, useState } from 'react';

function App() {

  const [campaign, setCampaign] = useState([]);

  useEffect(() => {
    getCampaign()
      .then(c => {
        setCampaign(c)
      })
  }, [])

  return (
    <div className="container">
      <title>Nextjs PoC</title>
      <link rel="icon" href="/favicon.ico" />

      <p>{campaign.Name}</p>

      <img
        src={`http://127.0.0.1:1337/uploads/small_1_Ik_Coen_9xn_K_Gvu4ol8_T_Xbw_5b7c90a9d0.png?10219`}
        alt="testing"
        layout="fill"
      />

    </div>
  )
}

export default App;


function getCampaign() {
  return fetch('http://127.0.0.1:1337/campaigns')
    .then(data => data.json())
}