/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { AppLazyRoutes } from './routes';
import { mockPageTitles, items } from './mocks';

const testLazyRoute = (index: number) => {
    const title = new RegExp(mockPageTitles[index], 'i');
    const lazyElement = screen.getByText(title);
    expect(lazyElement).toBeInTheDocument();
};

jest.mock('../../../features/pages/work/work', () => {
    return () => <p>{mockPageTitles[0]}</p>;
});

jest.mock('../../../features/pages/animation/animation', () => {
    return () => <p>{mockPageTitles[1]}</p>;
});

jest.mock('../../../features/pages/about/about', () => {
    return () => <p>{mockPageTitles[2]}</p>;
});

jest.mock('../../../features/pages/contact/contact', () => {
    return () => <p>{mockPageTitles[3]}</p>;
});
jest.mock('../../../features/pages/details/details', () => {
    return () => <p>{mockPageTitles[4]}</p>;
});
jest.mock('../../../features/pages/login/login', () => {
    return () => <p>{mockPageTitles[5]}</p>;
});

describe('Given AppRoutes Lazy component', () => {
    let lazyPaths: Array<string>;
    beforeEach(() => {
        lazyPaths = items.map((item) => item.path);
    });
    describe(`When we render the component 
                And the lazy route is Work`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={0}>
                        <AppLazyRoutes items={items} />
                    </Router>
                );
            });
        });
        test('Then it should display the WorkPage', () => {
            testLazyRoute(0);
        });
    });
    describe(`When we render the component 
                And the lazy route is Animation`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={1}>
                        <AppLazyRoutes items={items} />
                    </Router>
                );
            });
        });
        test('Then it should display the AnimationPage', () => {
            testLazyRoute(1);
        });
    });
    describe(`When we render the component 
                And the lazy route is About`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={2}>
                        <AppLazyRoutes items={items} />
                    </Router>
                );
            });
        });
        test('Then it should display the AboutPage', () => {
            testLazyRoute(2);
        });
    });
    describe(`When we render the component 
                And the lazy route is Contact`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={3}>
                        <AppLazyRoutes items={items} />
                    </Router>
                );
            });
        });
        test('Then it should display the ContactPage', () => {
            testLazyRoute(3);
        });
    });
    describe(`When we render the component 
                And the lazy route is Detail`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={4}>
                        <AppLazyRoutes items={items} />
                    </Router>
                );
            });
        });
        test('Then it should display the DetailPage', () => {
            testLazyRoute(4);
        });
    });
    describe(`When we render the component 
                And the lazy route is Login`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={5}>
                        <AppLazyRoutes items={items} />
                    </Router>
                );
            });
        });
        test('Then it should display the Login', () => {
            testLazyRoute(5);
        });
    });
});
