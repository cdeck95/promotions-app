import {
    formatDayOfWeek,
    formatLastUpdate,
    formatToISOWithoutMilliseconds,
    getDateFromISODate,
    getHourOfDay
} from '../date-helpers';

describe('Format date to ISO without milliseconds', () => {
    it('should return an formatted ISO date without milliseconds', () => {
        const result = formatToISOWithoutMilliseconds(new Date('2024-08-20'));
        expect(result).toBe('2024-08-20T00:00:00Z');
    });

    it('should return an empty string for invalid date', () => {
        const result = formatToISOWithoutMilliseconds(null as any as Date);
        expect(result).toBe('');
    });
});

describe('Get date from ISO date', () => {
    it('should return a formatted date', () => {
        const result = getDateFromISODate('2024-08-20T10:00:00Z');
        expect(result).toBe('2024-08-20');
    });

    it('should return the original ISO date for invalid date', () => {
        const result = getDateFromISODate('invalid-date');
        expect(result).toBe('invalid-date');
    });
});

describe('Format day of week', () => {
    it('should return a formatted day of week', () => {
        const result = formatDayOfWeek('2024-08-20T10:00:00Z');
        expect(result).toBe('Tue Aug 20');
    });

    it('should return the original ISO date for invalid date', () => {
        const result = formatDayOfWeek('invalid-date');
        expect(result).toBe('invalid-date');
    });

    it('should return an empty string for an empty date', () => {
        const result = formatDayOfWeek('');
        expect(result).toBe('');
    });
});

describe('Get hour of day', () => {
    it('should return a formatted hour of day', () => {
        const result = getHourOfDay('2024-08-20T10:00:00Z');
        expect(result).toBe('7:00 AM');
    });

    it('should return the original ISO date for invalid date', () => {
        const result = getHourOfDay('invalid-date');
        expect(result).toBe('invalid-date');
    });
});

describe('Format last update', () => {
    it('should return a formatted last update', () => {
        const result = formatLastUpdate('2024-08-20T10:00:00Z');
        expect(result).toBe('08-20-2024 7:00 AM');
    });
    it('should return the original ISO date for invalid date', () => {
        const result = formatLastUpdate('invalid-date');
        expect(result).toBe('invalid-date');
    });
});
