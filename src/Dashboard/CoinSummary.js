import React from "react";
import { Tile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";

export default function () {
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
