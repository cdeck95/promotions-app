'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Table,
    TableBody,
    TableCaption,
    TableHeader
} from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { addWeeks } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import TableGamesBody, { Game } from '../components/table-body';
import TableGamesHeader from '../components/table-games-header';
import { getGames } from '../services/get-games';
import {
    formatToISOWithoutMilliseconds,
    getDateFromISODate
} from '../utils/date-helpers';

export default function Home() {
    const [data, setData] = useState<Game[]>([]);

    const [gamesSchedule, setGamesSchedule] = useState<string[]>([]);
    const [currentGameDate, setCurrentGameDate] = useState<string>('');

    // -- Params to get games out in a week
    const today = new Date();
    const todayISO = formatToISOWithoutMilliseconds(today);
    // Add one week to the current date
    const nextWeek = addWeeks(today, 1);
    const nextWeekISO = formatToISOWithoutMilliseconds(nextWeek);

    const {
        data: games,
        isError,
        isLoading,
        error,
        isSuccess
    } = useQuery({
        queryKey: ['games'],
        queryFn: () =>
            getGames({
                apiKey: `${process.env.NEXT_PUBLIC_ODDS_API_KEY}`,
                regions: 'us',
                markets: 'h2h',
                dateFormat: 'iso',
                oddsFormat: 'american',
                commenceTimeFrom: todayISO,
                commenceTimeTo: nextWeekISO
            }),
        staleTime: 60 * 5000 // 5 minutes
    });

    useEffect(() => {
        if (isSuccess && games?.length > 0) {
            const schedules = new Set<string>();
            for (let i = 0; i < games.length; i++) {
                schedules.add(games[i].commence_time);
            }
            const schedulesArray = Array.from(schedules);
            setGamesSchedule(schedulesArray);
            setData(games);
            setCurrentGameDate(schedulesArray[0]);
        }
    }, [isSuccess, games]);

    if (isError) console.log('Error fetching data:', error);

    const handleFilterGameDate = (direction: 'previous' | 'next') => {
        const totalGames = gamesSchedule.length;
        const currentIndex = gamesSchedule.indexOf(currentGameDate);
        // -- edge case: if current game date is the first or last, do nothing
        if (direction === 'previous' && currentIndex - 1 < 0) return;
        if (direction === 'next' && currentIndex + 1 >= totalGames) return;

        const newIndex =
            direction === 'previous' ? currentIndex - 1 : currentIndex + 1;
        console.log('====', gamesSchedule[newIndex]);

        setCurrentGameDate(gamesSchedule[newIndex]);
    };

    const filtered = data.filter(
        (game) =>
            getDateFromISODate(game.commence_time) ===
            getDateFromISODate(currentGameDate)
    );
    return (
        <>
            <div className="flex items-center justify-start gap-2">
                <figure>
                    <Image
                        src={`/images/ball.png`}
                        alt={`baseball ball`}
                        width={70}
                        height={70}
                        priority={true}
                    />
                </figure>
                <h1 className="text-2xl font-bold tracking-tight">Games Odd</h1>
            </div>

            <ScrollArea className="w-auto overflow-hidden">
                <section>
                    <Table className="max-w-[80rem]">
                        <TableCaption>
                            A list of your US bookmakers
                        </TableCaption>
                        <TableHeader>
                            <TableGamesHeader
                                onSchedlueClick={handleFilterGameDate}
                                currentGameDate={currentGameDate}
                            />
                        </TableHeader>
                        <TableBody>
                            {data.length > 0 && (
                                <TableGamesBody games={filtered} />
                            )}
                        </TableBody>
                    </Table>
                </section>
            </ScrollArea>
        </>
    );
}
