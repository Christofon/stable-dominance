import React from "react";
import { AppContext } from "../App/AppProvider";
import { fontSizeBig, device } from "../Shared/Styles";
import styled from "styled-components";
import { Tile } from "../Shared/Tile";

const Heading = styled.h3`
  ${fontSizeBig};
  text-align: center;
`

const SummaryTile = styled(Tile)`
  @media ${device.mobileL} {
    width: 100%;
  }
    width: 100%;
`

const Grid = styled.div`
  display: grid;
  grid-gap: 15px;

    grid-template-columns: repeat(1, 1fr 1fr);
    
    @media ${device.mobileL} {
      grid-template-columns: repeat(1, 1fr);
    }
  
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
          <SummaryTile>
          <Heading>Combined Market Cap</Heading>
          <Ticker>{numberFormat(combinedMarketCap, 2)}</Ticker>
          </SummaryTile>
          <SummaryTile>
          <Heading>Tether Dominance</Heading>
          <Ticker>{tetherDominance}%</Ticker>
          </SummaryTile>
        </Grid>
      )}
    </AppContext.Consumer>
  );
}
