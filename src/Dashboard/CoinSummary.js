import React, {useState} from "react";
import { Tile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";
import styled from 'styled-components';

export default function() {
    return (
        <AppContext.Consumer>
            {({ combinedMarketCap, numberFormat }) => (
                <Tile>
                    <h2>Combined MarketCap</h2>
                    {numberFormat(combinedMarketCap, 2)}             
                </Tile>
            )}
        </AppContext.Consumer>
    );
}
