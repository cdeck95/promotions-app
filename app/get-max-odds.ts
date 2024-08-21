import { bookmakerMap } from '../bookmaker-map';
import { Game } from '../components/table-body';

type MaxOdd = {
    bookmakerKey: string;
    price: number;
};

type OddCell = {
    bookmakerKey: string;
    homeTeamPrice: number | undefined;
    awayTeamPrice: number | undefined;
    homeTeamPricePosition: 'equal' | 'lower' | 'initial';
    awayTeamPricePosition: 'equal' | 'lower' | 'initial';
    lastUpdate: string | undefined;
};

export type GetMaxOddsResult = {
    maxOddHomeTeam: MaxOdd;
    maxOddAwayTeam: MaxOdd;
    cells: OddCell[];
};

export function getMaxOdds(game: Game): GetMaxOddsResult {
    const cells: OddCell[] = [];

    let maxOddHomeTeam: MaxOdd = {
        bookmakerKey: '',
        price: -Infinity
    };
    let maxOddAwayTeam: MaxOdd = {
        bookmakerKey: '',
        price: -Infinity
    };

    Object.entries(bookmakerMap).map(([key, value]) => {
        const bookmaker = game.bookmakers.find((b) => b.key === key);
        const h2hMarket = bookmaker?.markets.find((m) => m.key === 'h2h');
        const lastUpdate = h2hMarket?.last_update;

        const homeTeam = h2hMarket?.outcomes.find(
            (o) => o.name === game.home_team
        );
        const awayTeam = h2hMarket?.outcomes.find(
            (o) => o.name === game.away_team
        );
        // -- check for max odds
        const homeTeamPrice = homeTeam?.price;
        if (homeTeamPrice && homeTeamPrice > maxOddHomeTeam.price) {
            maxOddHomeTeam = {
                bookmakerKey: key,
                price: homeTeamPrice
            };
        }

        const awayTeamPrice = awayTeam?.price;
        if (awayTeamPrice && awayTeamPrice > maxOddAwayTeam.price) {
            maxOddAwayTeam = {
                bookmakerKey: key,
                price: awayTeamPrice
            };
        }

        cells.push({
            bookmakerKey: key,
            homeTeamPrice,
            awayTeamPrice,
            homeTeamPricePosition: 'initial',
            awayTeamPricePosition: 'initial',
            lastUpdate
        });
    });
    console.log('cells', cells);
    return {
        maxOddHomeTeam,
        maxOddAwayTeam,
        cells
    };
}
