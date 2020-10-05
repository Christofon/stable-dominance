import React from "react";
import styled from "styled-components";

export const CoinHeaderStyled = styled.div`
  margin-bottom: 5px;
  text-align: center;
`;

export const CoinSymbol = styled.div`
  justify-self: right;
`;

export default function ({ name, symbol }) {
  return (
    <CoinHeaderStyled>
      <div> {name} </div>
      <CoinSymbol> {symbol} </CoinSymbol>
    </CoinHeaderStyled>
  );
}
