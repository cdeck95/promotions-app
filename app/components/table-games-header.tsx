import { Button } from '@/components/ui/button';
import { TableHead, TableRow } from '@/components/ui/table';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';
import Image from 'next/image';
import Link from 'next/link';
import { bookmakerMap } from '../bookmaker-map';
import { formatDayOfWeek } from '../utils/date-helpers';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
    onSchedlueClick: (direction: 'previous' | 'next') => void;
    currentGameDate: string;
};
const TableGamesHeader = ({ onSchedlueClick, currentGameDate }: Props) => {
    return (
        <TableRow>
            <TableHead className="w-[20rem]">
                <div className="flex items-center justify-start">
                    <p>Scheduled</p>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    onClick={() => onSchedlueClick('previous')}
                                >
                                    <ChevronLeft />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Previous date</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <p className="text-gray-600">
                        {currentGameDate && formatDayOfWeek(currentGameDate)}
                    </p>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    onClick={() => onSchedlueClick('next')}
                                >
                                    <ChevronRight />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Next date</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </TableHead>
            <TableHead>Best Odd</TableHead>
            {Object.entries(bookmakerMap).map((bookmaker) => (
                <TableHead key={bookmaker[0]} className="w-[5rem] p-0">
                    {bookmaker[1].name ? (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger
                                    asChild
                                    className="w-15 ml-2 h-10"
                                >
                                    <div className="relative">
                                        <Link href={`${bookmaker[1].link}`}>
                                            <Image
                                                src={`/images/bookmaker/${bookmaker[1].image}`}
                                                alt={`${bookmaker[1].name}`}
                                                fill
                                                className="rounded-md"
                                            />
                                        </Link>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {bookmaker[1].name}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : (
                        bookmaker[1].name
                    )}
                </TableHead>
            ))}
        </TableRow>
    );
};

export default TableGamesHeader;
