import { Game } from '@/app/components/table-body';
import { getMaxOdds } from '../get-max-odds';

const gameMock: Game = {
    id: '986321dd7daaf18c2456c62649a7e045',
    sport_key: 'baseball_mlb',
    sport_title: 'MLB',
    commence_time: '2024-08-14T17:11:00Z',
    home_team: 'Minnesota Twins',
    away_team: 'Kansas City Royals',
    bookmakers: [
        {
            key: 'fanduel',
            title: 'FanDuel',
            last_update: '2024-08-14T17:33:11Z',
            markets: [
                {
                    key: 'h2h',
                    last_update: '2024-08-14T17:33:11Z',
                    outcomes: [
                        {
                            name: 'Kansas City Royals',
                            price: -180
                        },
                        {
                            name: 'Minnesota Twins',
                            price: 140
                        }
                    ]
                }
            ]
        },
        {
            key: 'draftkings',
            title: 'DraftKings',
            last_update: '2024-08-14T17:33:10Z',
            markets: [
                {
                    key: 'h2h',
                    last_update: '2024-08-14T17:33:10Z',
                    outcomes: [
                        {
                            name: 'Kansas City Royals',
                            price: -190
                        },
                        {
                            name: 'Minnesota Twins',
                            price: 150
                        }
                    ]
                }
            ]
        }
    ]
};
describe('Get max odds', () => {
    it('Should return max odds for home and away teams', () => {
        const maxOdds = getMaxOdds(gameMock);
        expect(maxOdds.maxOddHomeTeam).toEqual({
            bookmakerKey: 'draftkings',
            price: 150
        });
        expect(maxOdds.maxOddAwayTeam).toEqual({
            bookmakerKey: 'fanduel',
            price: -180
        });
        expect(maxOdds.cells.length).toBe(8); // 8 bookmakers
        // -- for simplicity, I only test 2 bookmakers
        expect(maxOdds.cells).toEqual([
            {
                bookmakerKey: 'betmgm',
                homeTeamPrice: undefined,
                awayTeamPrice: undefined,
                homeTeamPricePosition: 'initial',
                awayTeamPricePosition: 'initial',
                lastUpdate: undefined
            },
            {
                bookmakerKey: 'betrivers',
                homeTeamPrice: undefined,
                awayTeamPrice: undefined,
                homeTeamPricePosition: 'initial',
                awayTeamPricePosition: 'initial',
                lastUpdate: undefined
            },
            {
                bookmakerKey: 'betus',
                homeTeamPrice: undefined,
                awayTeamPrice: undefined,
                homeTeamPricePosition: 'initial',
                awayTeamPricePosition: 'initial',
                lastUpdate: undefined
            },
            {
                bookmakerKey: 'bovada',
                homeTeamPrice: undefined,
                awayTeamPrice: undefined,
                homeTeamPricePosition: 'initial',
                awayTeamPricePosition: 'initial',
                lastUpdate: undefined
            },
            {
                bookmakerKey: 'williamhill_us',
                homeTeamPrice: undefined,
                awayTeamPrice: undefined,
                homeTeamPricePosition: 'initial',
                awayTeamPricePosition: 'initial',
                lastUpdate: undefined
            },
            {
                bookmakerKey: 'draftkings',
                homeTeamPrice: 150,
                awayTeamPrice: -190,
                homeTeamPricePosition: 'initial',
                awayTeamPricePosition: 'initial',
                lastUpdate: '2024-08-14T17:33:10Z'
            },
            {
                bookmakerKey: 'fanduel',
                homeTeamPrice: 140,
                awayTeamPrice: -180,
                homeTeamPricePosition: 'initial',
                awayTeamPricePosition: 'initial',
                lastUpdate: '2024-08-14T17:33:11Z'
            },
            {
                bookmakerKey: 'wynnbet',
                homeTeamPrice: undefined,
                awayTeamPrice: undefined,
                homeTeamPricePosition: 'initial',
                awayTeamPricePosition: 'initial',
                lastUpdate: undefined
            }
        ]);
    });
});
