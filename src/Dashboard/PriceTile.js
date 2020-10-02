import React from "react";
import styled, { css } from "styled-components";
import { SelectableTile } from "../Shared/Tile";
import { fontSize3, fontSizeBig, BoxShadow } from "../Shared/Styles";
import { CoinHeaderStyled } from "./CoinHeaderGrid";
import { AppContext } from "../App/AppProvider";

const TickerPrice = styled.div`
  ${fontSizeBig};
`;

const PriceTileStyled = styled(SelectableTile)`
  ${(props) =>
    props.compact &&
    css`
      ${fontSize3}
    `}

  ${(props) =>
    props.currentFavorite &&
    css`
      ${BoxShadow}
      pointer-events: none;
    `}
`;

function PriceTile({ sym, data, currentFavorite, setCurrentFavorite }) {
  return (
    <AppContext.Consumer>
      {({ numberFormat }) => (
        <PriceTileStyled
          onClick={setCurrentFavorite}
          currentFavorite={currentFavorite}
        >
          <CoinHeaderStyled>
            <div> {sym} </div>
          </CoinHeaderStyled>
          <TickerPrice>
            {numberFormat(data.market_data.market_cap.usd, 2)}
          </TickerPrice>
        </PriceTileStyled>
      )}
    </AppContext.Consumer>
  );
}

export default function ({ coin }) {
  let sym = coin.name;

  return (
    <AppContext.Consumer>
      {({ currentFavorite, setCurrentFavorite }) => (
        <PriceTile
          sym={sym}
          data={coin}
          currentFavorite={currentFavorite === sym}
          setCurrentFavorite={() => setCurrentFavorite(sym)}
        ></PriceTile>
      )}
    </AppContext.Consumer>
  );
}
