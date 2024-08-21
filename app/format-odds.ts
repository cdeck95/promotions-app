export function formatOdds(odds: number): string {
    if (odds > 0) return '+' + odds;

    return odds.toString();
}
