/* eslint-disable testing-library/no-unnecessary-act */
import { render, act, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router';
import Swal from 'sweetalert2';
import { Item } from './item';
import {
    ArtworkContext,
    ArtworkContextStructure,
    UserContextStructure,
} from '../../context/artworks.context';
import { ARTWORK } from '../../../features/data/artmock';
import userEvent from '@testing-library/user-event';
describe('Given "Item" component', () => {
    const handleLoad = jest.fn();
    const handleDetailed = jest.fn();
    const handleDelete = jest.fn();
    const handleFile = jest.fn();
    const onDragStart = jest.fn();
    const onDragEnter = jest.fn();
    const onDragEnd = jest.fn();
    let mockContext: ArtworkContextStructure & UserContextStructure;
    const item = ARTWORK;
    Swal.fire = jest.fn();
    describe('When it is initially instantiated with admin', () => {
        beforeEach(async () => {
            mockContext = {
                artworks: [],
                handleFile,
                handleDelete,
                getAdmin: () => true,
                handleLoad,
                handleDetailed,
            } as unknown as ArtworkContextStructure & UserContextStructure;
            await act(async () => {
                render(
                    <ArtworkContext.Provider value={mockContext}>
                        <Router>
                            <Item
                                item={item}
                                dragStart={onDragStart}
                                dragEnter={onDragEnter}
                                dragEnd={onDragEnd}
                            ></Item>
                        </Router>
                    </ArtworkContext.Provider>
                );
            });
        });
        test(`Then component should be render the buttons`, () => {
            const buttons = screen.getAllByRole('button');
            const img = screen.getByRole('img', {
                name: item.title,
            });
            expect(buttons[0]).toBeInTheDocument();
            expect(buttons[1]).toBeInTheDocument();
            expect(img).toBeInTheDocument();
        });
        test(`Then component should be use the click`, () => {
            const img = screen.getByRole('img', {
                name: item.title,
            });
            userEvent.click(img);
            expect(handleDetailed).toHaveBeenCalled();
        });
        test(`Then component should be use the buttons to call Filefunction`, async () => {
            const input = screen.getByTestId('getFile');
            fireEvent.change(input, { target: { files: ['test-file.jpg'] } });
            expect(handleFile).toHaveBeenCalled();
        });
        test(`Then component should be use the buttons to call function Delete`, () => {
            const buttonDelete = screen.getByRole('button', {
                name: 'delete',
            });
            userEvent.click(buttonDelete);
            expect(handleDelete).toHaveBeenCalled();
        });
        test(`Then component should be use button to call function Swal`, () => {
            const buttonReplace = screen.getByRole('button', {
                name: 'replace',
            });
            userEvent.click(buttonReplace);
            expect(Swal.fire).toHaveBeenCalled();
        });
    });
    describe('When it is initially instantiated without admin', () => {
        beforeEach(async () => {
            mockContext = {
                artworks: [],
                handleFile,
                handleDelete,
                getAdmin: () => false,
                handleLoad,
                handleDetailed,
            } as unknown as ArtworkContextStructure & UserContextStructure;
            await act(async () => {
                render(
                    <ArtworkContext.Provider value={mockContext}>
                        <Router>
                            <Item
                                item={item}
                                dragStart={onDragStart}
                                dragEnter={onDragEnter}
                                dragEnd={onDragEnd}
                            ></Item>
                        </Router>
                    </ArtworkContext.Provider>
                );
            });
        });
        test(`Then component should be render the buttons`, () => {
            const img = screen.getByRole('img', {
                name: item.title,
            });
            expect(img).toBeInTheDocument();
        });
    });
});
