import React from "react";
import styled from "styled-components";

export const CoinHeaderStyled = styled.div`
  margin-bottom: 5px;
`;

export const CoinSymbol = styled.div`
  justify-self: right;
`;

export default function ({ name, symbol, topSection }) {
  return (
    <CoinHeaderStyled>
      <div> {name} </div>
      <CoinSymbol> {symbol} </CoinSymbol>
    </CoinHeaderStyled>
  );
}
