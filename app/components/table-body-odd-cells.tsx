import { TableCell } from '@/components/ui/table';
import { bookmakerMap } from '../bookmaker-map';
import { Game } from '../components/table-body';
import { getMaxOdds } from '../utils/get-max-odds';
import BestOddCellContent from './best-odd-cell-content';
import OddCellContent from './odd-cell-content';

type Props = {
    game: Game;
};

const TableBodyOddCells = ({ game }: Props) => {
    const { maxOddHomeTeam, maxOddAwayTeam, cells } = getMaxOdds(game);

    return (
        <>
            <TableCell key="best">
                <div className="flex flex-col items-start gap-2">
                    <BestOddCellContent
                        maxPrice={maxOddHomeTeam.price}
                        bookmakerTitle={
                            bookmakerMap[maxOddHomeTeam.bookmakerKey].name
                        }
                    />
                    <BestOddCellContent
                        maxPrice={maxOddAwayTeam.price}
                        bookmakerTitle={
                            bookmakerMap[maxOddAwayTeam.bookmakerKey].name
                        }
                    />
                </div>
            </TableCell>
            {cells.map((cell) => (
                <TableCell key={cell.bookmakerKey}>
                    <div className="flex flex-col items-start gap-3">
                        <OddCellContent
                            price={cell.homeTeamPrice}
                            maxPrice={maxOddHomeTeam.price}
                            lastUpdate={cell.lastUpdate}
                        />
                        <OddCellContent
                            price={cell.awayTeamPrice}
                            maxPrice={maxOddAwayTeam.price}
                            lastUpdate={cell.lastUpdate}
                        />
                    </div>
                </TableCell>
            ))}
        </>
    );
};

export default TableBodyOddCells;
