import React from "react";
import { AppContext } from "../App/AppProvider";
import {fontSizeBig} from "../Shared/Styles";
import styled from "styled-components";
import {Tile} from "../Shared/Tile";

const Heading = styled.h3`
  ${fontSizeBig};
  text-align: center;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 15px;
`

const Ticker = styled.div`
  font-size: 4em;
  text-align: center;

`

export default function () {
  return (
    <AppContext.Consumer>
      {({ combinedMarketCap, tetherDominance, numberFormat }) => (
        <Grid>
          <Tile>
          <Heading>Combined MarketCap</Heading>
          <Ticker>{numberFormat(combinedMarketCap, 2)}</Ticker>
          </Tile>
          <Tile>
          <Heading>Tether Dominance</Heading>
          <Ticker>{tetherDominance}%</Ticker>
          </Tile>
        </Grid>
      )}
    </AppContext.Consumer>
  );
}
