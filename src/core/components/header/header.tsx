import './header.scss';
export function Header({ children }: { children: JSX.Element }) {
    const title = 'Marina Labella';
    const subtitle = 'ILLUSTRATION';
    return (
        <header>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            {children}
        </header>
    );
}
