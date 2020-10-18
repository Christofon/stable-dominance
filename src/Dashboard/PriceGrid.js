import React from "react";
import { AppContext } from "../App/AppProvider";
import styled from "styled-components";
import PriceTile from "./PriceTile";
import {device} from "../Shared/Styles";

const PriceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  grid-gap: 15px;
  margin-top: 30px;

  @media ${device.mobileL} {
 grid-template-columns: repeat(5, 2fr);   
  }
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
