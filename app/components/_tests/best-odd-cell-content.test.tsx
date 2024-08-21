import { render, screen } from '@testing-library/react';
import BestOddCellContent from '../best-odd-cell-content';
describe('BestOddCellContent', () => {
    it('Should render correctly the component', () => {
        const props = { maxPrice: 150, bookmakerTitle: 'Caesars' };

        render(<BestOddCellContent {...props} />);
        expect(screen.getByRole('button', { name: /caesars \| \+150/i }));
    });
});
