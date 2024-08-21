import { formatOdds } from '@/app/utils/format-odds';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OddCellContent, { OddCellContentProps } from '../odd-cell-content';
describe('OddCellContent', () => {
    const renderOddCellContent = ({
        price,
        maxPrice,
        lastUpdate
    }: OddCellContentProps) => {
        let formattedPrice: string | undefined = undefined;
        if (price) formattedPrice = formatOdds(price);

        render(
            <OddCellContent
                price={price}
                maxPrice={maxPrice}
                lastUpdate={lastUpdate}
            />
        );

        return {
            button: screen.getByRole('button', {
                name: `${formattedPrice ? formattedPrice : 'N/A'}`
            })
        };
    };
    it('should render with the max odd tag, if the odd is equal to the maxPrice', async () => {
        const props = {
            price: 120,
            maxPrice: 120,
            lastUpdate: '2024-08-14T17:31:33Z'
        };
        const { button } = renderOddCellContent(props);

        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(`${formatOdds(props.price)}`);

        const maxOddMedalSvgElement = screen.getByTestId('max-odd-medal');
        expect(maxOddMedalSvgElement).toBeInTheDocument();

        const user = userEvent.setup();
        await user.hover(button);

        // -- the tooltip should be visible and display the last update date
        // -- but shadcn tooltip component renders all buttons tooltip regardeless of the hovered button
        const tooltip = await screen.findAllByText(
            'Last update: 08-14-2024 2:31 PM'
        );
        expect(tooltip[0]).toBeInTheDocument();
    });

    it('should render a regular button without the max-ood-medal', async () => {
        const props = {
            price: -80,
            maxPrice: 120,
            lastUpdate: '2024-08-14T17:31:33Z'
        };
        const { button } = renderOddCellContent(props);

        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(`${formatOdds(props.price)}`);

        const maxOddMedalSvgElement = screen.queryByTestId('max-odd-medal');
        expect(maxOddMedalSvgElement).not.toBeInTheDocument();
    });

    it('should render a regular button with the text "N/A", if the price is undefined', async () => {
        const props = {
            price: undefined,
            maxPrice: 120,
            lastUpdate: '2024-08-14T17:31:33Z'
        };
        const { button } = renderOddCellContent(props);

        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('N/A');
    });
});
