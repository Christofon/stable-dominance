import React from "react";
import styled, { css } from "styled-components";

const CoinImage = styled.img`
  height: 50px;
  ${(props) =>
    props.spotlight &&
    css`
      height: 200px;
      margin: auto;
      display: block;
    `}
`;

export default function ({ coin, spotlight }) {
  return (
    <CoinImage
      spotlight={spotlight}
      alt={coin ? coin.CoinSymbol : "no coin symbol  found"}
      src={`http://cryptocompare.com/${
        coin ? coin.ImageUrl : "no coin url found"
      }`}
    />
  );
}
