import React from 'react';
import Tracks from './Tracks';
import Search from './Search';

const Index = ()=>{
    return(
        <React.Fragment>
          <Search/>
          <Tracks/>
        </React.Fragment>
    )
}

export default Index;