import React from "react";
import highchartsConfig from "./HighchartsConfig";
import { Tile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";
import ReactHighcharts from "react-highcharts";
import { Theme } from "./HighchartTheme";
import ChartSelect from "./ChartSelect";
import styled from "styled-components";
import { device } from "../Shared/Styles";

ReactHighcharts.Highcharts.setOptions(Theme);

const StyledTile = styled(Tile)`
  heigth: 100px;
  width: 350px;

  @media ${device.mobileL} {
    width: 1050px;
    margin-left: 20px;
  }
`;

export default function () {
  return (
    <AppContext.Consumer>
      {({ historical, changeChartSelect }) => (
        <StyledTile>
          <ChartSelect
            defaultValue="max"
            onChange={(e) => changeChartSelect(e.target.value)}
          >
            <option value="1"> Day </option>
            <option value="7"> Week </option>
            <option value="30"> Month </option>
            <option value="max"> All time </option>
          </ChartSelect>
          {historical ? (
            <ReactHighcharts config={highchartsConfig(historical)} />
          ) : (
            <div> Loading historical data </div>
          )}
        </StyledTile>
      )}
    </AppContext.Consumer>
  );
}
