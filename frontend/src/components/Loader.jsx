import React from 'react';
import LoadingGif from '../assets/loader1.gif';

const Loader = () => {
  return (
    <div className='loader'>
        <div className="LoaderImage">
            <img className="loaderImage" src={LoadingGif} alt=''/>
        </div>
      
    </div>
  )
}

export default Loader