import React from 'react';
import {AppContext} from "../App/AppProvider";

export default function(props) {
    return <AppContext.Consumer>
        {({coinList, coins, firstVisit}) => {
            if(!coinList){
                return <div> Loading Coins </div>
            }
            if(!firstVisit && !coins) {
                return <div> Loading MarketCaps  </div>
            }
            return <div> {props.children} </div>
        }}
    </AppContext.Consumer>
}
