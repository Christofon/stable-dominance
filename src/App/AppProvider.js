import React from "react";
import _ from 'lodash';
import moment from 'moment';

const CoinGecko = require('coingecko-api');
const cg = new CoinGecko();

const cc = require('cryptocompare');
cc.setApiKey('2d4bc8914f719b5cd7e3969b416372090549ea712205ccb7cdeb20f200121075')

export const AppContext = React.createContext();

const MAX_FAVORITES= 10;

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
            coinList: [],
        }
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


    fetchCoins =  async () =>  {
        let coins = await this.coins();
        this.setState({coinList: coins});
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
