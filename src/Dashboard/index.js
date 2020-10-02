import React from "react";
import Page from "../Shared/Page";
import PriceGrid from "./PriceGrid";
import CoinSummary from "./CoinSummary";
import styled from "styled-components";
import PriceChart from "./PriceChart";

const ChartGrid = styled.div`
  display: grid;
  margin-top: 20px;
  grid-gap: 15px;
  grid-template-columns: 1fr 3fr;
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
