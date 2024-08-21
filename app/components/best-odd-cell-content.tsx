import { Button } from '@/components/ui/button';
import { formatOdds } from '../utils/format-odds';

type Props = {
    maxPrice: number;
    bookmakerTitle: string;
};
const BestOddCellContent = ({ maxPrice, bookmakerTitle }: Props) => {
    return (
        <div>
            <Button variant="outline" className="w-32 text-xs">
                <div className="flex items-center gap-1">
                    <p className="text-xs">{bookmakerTitle}</p>
                    <p> | </p>
                    <p>{formatOdds(maxPrice)}</p>
                </div>
            </Button>
        </div>
    );
};

export default BestOddCellContent;
