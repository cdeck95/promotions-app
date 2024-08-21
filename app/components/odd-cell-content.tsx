import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';
import classnames from 'classnames';
import { formatLastUpdate } from '../utils/date-helpers';
import { formatOdds } from '../utils/format-odds';
import { Clock10Icon, Medal } from 'lucide-react';

export type OddCellContentProps = {
    price: number | undefined;
    maxPrice: number;
    lastUpdate: string | undefined;
};

const OddCellContent = ({
    price,
    maxPrice,
    lastUpdate
}: OddCellContentProps) => {
    return (
        <div className="relative">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            className={classnames('w-16 text-sm', {
                                'cursor-not-allowed opacity-50': !price
                            })}
                            disabled={!price}
                        >
                            {
                                <span
                                    className={classnames({
                                        'font-semibold': price === maxPrice
                                    })}
                                >
                                    {(price && formatOdds(price)) || 'N/A'}
                                </span>
                            }
                            {price === maxPrice && (
                                <Medal
                                    data-testid="max-odd-medal"
                                    className="absolute right-1 top-1 text-green-600"
                                />
                            )}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <div className="flex items-center gap-1">
                            <Clock10Icon />
                            <span className="text-xs">{` Last update: ${formatLastUpdate(lastUpdate!)}`}</span>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export default OddCellContent;
