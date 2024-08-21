import { format, parseISO } from 'date-fns';
export function formatToISOWithoutMilliseconds(date: Date): string {
    try {
        const isDateValid = Date.parse(date.toISOString());
        if (isNaN(isDateValid)) return '';

        return (
            date.getUTCFullYear() +
            '-' +
            String(date.getUTCMonth() + 1).padStart(2, '0') +
            '-' +
            String(date.getUTCDate()).padStart(2, '0') +
            'T' +
            String(date.getUTCHours()).padStart(2, '0') +
            ':' +
            String(date.getUTCMinutes()).padStart(2, '0') +
            ':' +
            String(date.getUTCSeconds()).padStart(2, '0') +
            'Z'
        );
    } catch (error) {
        return '';
    }
}

export function getDateFromISODate(isoString: string): string {
    try {
        const date = parseISO(isoString);
        const formattedDate = format(date, 'yyyy-MM-dd');

        return formattedDate;
    } catch (error) {
        return isoString;
    }
}

export function formatDayOfWeek(isoString: string): string {
    if (!isoString) return '';

    try {
        const date = parseISO(isoString);
        const formattedDate = format(date, 'EEE MMM dd');

        return formattedDate;
    } catch (error) {
        return isoString;
    }
}

export function getHourOfDay(isoString: string): string {
    try {
        const date = parseISO(isoString);

        const formattedTime = format(date, 'h:mm aa');

        return formattedTime;
    } catch (error) {
        return isoString;
    }
}

export function formatLastUpdate(isoString: string): string {
    try {
        const formattedDate = format(new Date(isoString), 'MM-dd-yyyy h:mm a');
        return formattedDate;
    } catch (error) {
        return isoString;
    }
}
