import React from "react";
import { AppContext } from "../App/AppProvider";
import styled from "styled-components";
import PriceTile from "./PriceTile";

const PriceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 2fr);
  grid-gap: 15px;
  margin-top: 30px;
`;

export default function () {
  return (
    <AppContext.Consumer>
      {({ coinList }) => (
        <PriceGrid>
          {coinList.map((coin) => (
            <PriceTile coin={coin} />
          ))}
        </PriceGrid>
      )}
    </AppContext.Consumer>
  );
}
