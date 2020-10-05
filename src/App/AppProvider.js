import React from "react";
import _ from "lodash";
import moment from "moment";

const CoinGecko = require("coingecko-api");
const cg = new CoinGecko();

//const cc = require("cryptocompare");
//cc.setApiKey(
//  "2d4bc8914f719b5cd7e3969b416372090549ea712205ccb7cdeb20f200121075"
//);

export const AppContext = React.createContext();

const TIME_UNITS = 10;

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      coins: [
        "tether",
        "usd-coin",
        "dai",
        "true-usd",
        "paxos-standard",
        "nusd",
      ], //automatic sorting by highest MarketCap?
      timeInterval: "max",
      setPage: this.setPage,
      isInFavorites: this.isInFavorites,
      setFilteredCoins: this.setFilteredCoins,
      setCurrentFavorite: this.setCurrentFavorite,
      changeChartSelect: this.changeChartSelect,
      calculateCombinedMarketCap: this.calculateCombinedMarketCap,
      combinedMarketCap: 0,
      tetherDominance: 0,
      numberFormat: this.numberFormat,
      calculateTetherDominance: this.calculateTetherDominance,
      currentFavorite: "tether",
    };
  }

  numberFormat(number, decPlaces) {
    decPlaces = Math.pow(10, decPlaces);
    var abbrev = ["k", "m", "b", "t"];
    for (var i = abbrev.length - 1; 1 >= 0; i--) {
      var size = Math.pow(10, (i + 1) * 3);
      if (size <= number) {
        number = Math.round((number * decPlaces) / size) / decPlaces;
        if (number === 1000 && i < abbrev.length - 1) {
          number = 1;
          i++;
        }
        number += abbrev[i];
        break;
      }
    }
    return number;
  }

  isInFavorites = (key) => _.includes(this.state.favorites, key);

  componentDidMount = () => {
    this.fetchCoins();
    this.fetchHistorical();
  };

  fetchHistorical = async () => {
    let results = await this.historical();
    let hist = results.data.market_caps;
    let historical = [
      {
        name: this.state.currentFavorite,
        data: hist,
      },
    ];
    this.setState({ historical });
  };

  calculateTetherDominance = () => {
    const tetherMarketCap = this.state.coinList[0].market_data.market_cap.usd;
    let dominance = tetherMarketCap * 100 / this.state.combinedMarketCap;
    dominance = Math.round(dominance * 100) / 100;
    this.setState({tetherDominance: dominance});
  }

  calculateCombinedMarketCap = () => {
    let mcap = 0;
    this.state.coinList.forEach(function (sum) {
      mcap += sum.market_data.market_cap.usd;
    });
    this.setState({ combinedMarketCap: mcap });
  };
  
  historical = () => {
    let hist = cg.coins.fetchMarketChart(this.state.currentFavorite, {days: this.state.timeInterval});
    return hist;
  };

  fetchCoins = async () => {
    let coins = await this.coins();
    this.setState({ coinList: coins });
    this.calculateCombinedMarketCap();
    this.calculateTetherDominance();
  };

  coins = async () => {
    let returnData = [];
    for (let i = 0; i < this.state.coins.length; i++) {
      try {
        let coinData = await cg.coins.fetch(this.state.coins[i]);
        returnData.push(coinData.data);
      } catch (e) {
        console.warn("Fetch coin error: ", e);
      }
    }
    return returnData;
  };

  setCurrentFavorite = (sym) => {
    this.setState(
      {
        currentFavorite: sym,
        historical: null,
      },
      this.fetchHistorical
    );
    }

  setPage = (page) => this.setState({ page });

  setFilteredCoins = (filteredCoins) => this.setState({ filteredCoins });

  changeChartSelect = (value) => {
    this.setState(
      { timeInterval: value, historical: null },
      this.fetchHistorical
    );
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
