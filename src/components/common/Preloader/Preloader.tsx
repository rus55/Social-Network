import React from 'react'
import preloader from "../../../assests/images/loader.gif";
type PreloaderType = {

}
let Preloader = (props: PreloaderType) => {
    return <div style={{backgroundColor: 'white'}}>
        <img src={preloader}/>
    </div>
}

export default Preloader

