import { Card, CardContent } from '@/components/ui/card';
import { TableCell, TableRow } from '@/components/ui/table';
import { getHourOfDay } from '../utils/date-helpers';
import TableBodyOddCells from './table-body-odd-cells';
import { Clock10, Settings } from 'lucide-react';

export type Game = {
    id: string;
    sport_key: string;
    sport_title: string;
    commence_time: string;
    home_team: string;
    away_team: string;
    bookmakers: {
        key: string;
        title: string;
        last_update: string;
        markets: {
            key: string;
            last_update: string;
            outcomes: {
                name: string;
                price: number;
            }[];
        }[];
    }[];
};

type Props = {
    games: Game[];
};

const TableGamesBody = ({ games }: Props) => {
    return (
        <>
            {games.map((game) => (
                <TableRow key={game.id}>
                    <TableCell>
                        <Card className="shadow-2xl">
                            <CardContent>
                                <div className="mt-3 flex flex-col items-center justify-center gap-2">
                                    <p className="text-sm font-bold text-gray-800">
                                        {game.home_team}
                                    </p>
                                    <Settings className="text-white"/>
                                    <p className="text-sm font-bold text-gray-800">
                                        {game.away_team}
                                    </p>
                                </div>
                            </CardContent>
                            <div className="rounded-b-s flex w-full items-center justify-center gap-2 rounded-b-md bg-slate-800 p-2">
                                <span className="mt-1 text-xs text-white">
                                    {getHourOfDay(game.commence_time)}
                                </span>
                                <Clock10 className="text-white" />
                            </div>
                        </Card>
                    </TableCell>
                    <TableBodyOddCells game={game} />
                </TableRow>
            ))}
        </>
    );
};

export default TableGamesBody;
