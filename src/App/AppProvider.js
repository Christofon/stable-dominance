import React from "react";
import _ from 'lodash';
import moment from 'moment';

const CoinGecko = require('coingecko-api');
const cg = new CoinGecko();

const cc = require('cryptocompare');
cc.setApiKey('2d4bc8914f719b5cd7e3969b416372090549ea712205ccb7cdeb20f200121075')

export const AppContext = React.createContext();

const TIME_UNITS = 10;

export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "dashboard",
            coins: ['tether', 'usd-coin','dai','true-usd','paxos-standard','nusd'], //automatic sorting by highest MarketCap?
            timeInterval: '30',
            ...this.savedSettings(),
            setPage: this.setPage,
            isInFavorites: this.isInFavorites,
            setFilteredCoins: this.setFilteredCoins,
            setCurrentFavorite: this.setCurrentFavorite,
            changeChartSelect: this.changeChartSelect,
            calculateCombinedMarketCap: this.calculateCombinedMarketCap,
            combinedMarketCap: 0,
            numberFormat: this.numberFormat,
        }
    }

    numberFormat(number, decPlaces) {
        decPlaces = Math.pow(10, decPlaces);
        var abbrev = [ "k", "m", "b", "t" ];
        for (var i=abbrev.length-1; 1>=0; i--) {
            var size = Math.pow(10, (i+1)*3);
            if (size <= number) {
                number = Math.round(number*decPlaces/size)/decPlaces;
                if ((number  == 1000) && (i < abbrev.length - 1)) {
                    number = 1;
                    i++;
                }
                number += abbrev[i];
                break;
            }
        }
        return number;
    }

    isInFavorites = key => _.includes(this.state.favorites, key)

    componentDidMount = () => {
        this.fetchCoins();
        this.fetchHistorical();
    }

    //TODO implement historical fetch
    //TODO refractor and sort codebase (prettier in every file)

    fetchHistorical = async () => {
        let results = await this.historical();
        let historical = [
            {
                name: this.state.currentFavorite,
                data: results.map((ticker, index) => [
                    moment().subtract({[this.state.timeInterval]: TIME_UNITS - index}).valueOf(),
                    ticker.USD
                ])
            }
        ]
        this.setState({historical});
    }

    calculateCombinedMarketCap = () => {
        let mcap = 0;
        this.state.coinList.forEach(function(sum){
            mcap += sum.market_data.market_cap.usd;
        })
        this.setState({combinedMarketCap: mcap});
        console.log(this.state.combinedMarketCap);
    }

    historical = () => {
        let promises = [];
        for (let units = TIME_UNITS; units > 0; units--) {
            promises.push(
                cg.coins.fetchMarketChart('tether', {days: 1}),
                )
        }
        console.log(promises);
        return Promise.all(promises);
    }


    fetchCoins = async () =>  {
        let coins = await this.coins();
        this.setState({coinList: coins});
        this.calculateCombinedMarketCap();
    }

    coins = async () => {
        let returnData = [];
        for (let i = 0; i < this.state.coins.length; i++) {
            try {
                let coinData = await cg.coins.fetch(this.state.coins[i]);
                returnData.push(coinData.data);
            } catch (e) {
                console.warn('Fetch coin error: ', e);
            }
        }
        return returnData;
    }

    setCurrentFavorite = (sym) => {
        this.setState({
            currentFavorite: sym,
            historical: null
        }, this.fetchHistorical);
        localStorage.setItem('stableDominance', JSON.stringify({
            ...JSON.parse(localStorage.getItem('stableDominance')),
            currentFavorite: sym
        }))
    }

    savedSettings() {
        let stableDominanceData = JSON.parse(localStorage.getItem("stableDominance"));
        if (!stableDominanceData) {
            return { page: "settings", firstVisit: true };
        }
        let {favorites, currentFavorite} = stableDominanceData;
        return {favorites, currentFavorite};
    }

    setPage = page => this.setState({ page });

    setFilteredCoins = (filteredCoins) => this.setState({filteredCoins})

    changeChartSelect = (value) => {
        this.setState({timeInterval: value, historical: null}, this.fetchHistorical);
    }

    render() {
        return <AppContext.Provider value={this.state}>{this.props.children}</AppContext.Provider>;
    }
}
