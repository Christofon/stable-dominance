import React from "react";
import styled, { css } from "styled-components";
import { SelectableTile } from "../Shared/Tile";
import { fontSize3, fontSizeBig, greenBoxShadow } from "../Shared/Styles";
import { CoinHeaderStyled } from "./CoinHeaderGrid";
import { AppContext } from "../App/AppProvider";

const JustifyRight = styled.div`
    justify-self: right;
`;

const TickerPrice = styled.div`
    ${fontSizeBig};
`;

const ChangePct = styled.div`
    color: green;
    ${props =>
        props.red &&
        css`
            color: red;
        `}
`;

const PriceTileStyled = styled(SelectableTile)`
    ${props =>
        props.compact &&
        css`
            ${fontSize3}
        `}

    ${props =>
        props.currentFavorite &&
        css`
            ${greenBoxShadow}
            pointer-events: none;
        `}
`;

function numberFormat(number, decPlaces) {
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

function PriceTile({ sym, data, currentFavorite, setCurrentFavorite }) {
    return (
        <PriceTileStyled onClick={setCurrentFavorite} currentFavorite={currentFavorite}>
            <CoinHeaderStyled>
                <div> {sym} </div>
            </CoinHeaderStyled>
            <TickerPrice>{numberFormat(data.market_data.market_cap.usd, 2)}</TickerPrice>
        </PriceTileStyled>
    );
}

export default function({ coin }) {
    let sym = coin.name;

    return (
        <AppContext.Consumer>
        {({ currentFavorite, setCurrentFavorite }) =>
            <PriceTile
            sym={sym}
            data={coin}
            currentFavorite={currentFavorite === sym}
            setCurrentFavorite={() => setCurrentFavorite(sym)}
            >
            </PriceTile>
        }
        </AppContext.Consumer>
    )
        }
