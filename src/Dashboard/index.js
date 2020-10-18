import React from "react";
import Page from "../Shared/Page";
import PriceGrid from "./PriceGrid";
import CoinSummary from "./CoinSummary";
import styled from "styled-components";
import PriceChart from "./PriceChart";
import {device} from "../Shared/Styles";
const ChartGrid = styled.div`
  display: grid;
  margin-top: 20px;
  grid-gap: 15px;

  @media ${device.mobileL} {
    grid-template-columns: 2fr 3fr;
  }
  grid-template-columns: 1fr;
`;

export default function () {
  return (
    <Page name="dashboard">
      <ChartGrid>
        <CoinSummary />
        <PriceChart />
      </ChartGrid>
      <PriceGrid />
    </Page>
  );
}
