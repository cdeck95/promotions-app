import { formatOdds } from '../format-odds';

describe('Format odds', () => {
    it('should format positive odds', () => {
        const odds = 1;
        const formattedOdds = formatOdds(odds);
        expect(formattedOdds).toBe('+1');
    });

    it('should format negative odds', () => {
        const odds = -1;
        const formattedOdds = formatOdds(odds);
        expect(formattedOdds).toBe('-1');
    });
});
