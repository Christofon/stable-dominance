import React from "react";
import styled from "styled-components";
import { DeleteableTile } from "../Shared/Tile";

export const CoinHeaderStyled = styled.div`
  margin-bottom: 5px;
`;

export const CoinSymbol = styled.div`
  justify-self: right;
`;

const DeleteIcon = styled.div`
  justify-self: right;
  display: none;
  ${DeleteableTile}:hover & {
    display: block;
    color: red;
  }
`;

export default function ({ name, symbol, topSection }) {
  return (
    <CoinHeaderStyled>
      <div> {name} </div>
      {topSection ? (
        <DeleteIcon> X </DeleteIcon>
      ) : (
        <CoinSymbol> {symbol} </CoinSymbol>
      )}
    </CoinHeaderStyled>
  );
}
