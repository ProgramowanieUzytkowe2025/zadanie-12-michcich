import './AppHeader.css';
import { useContext } from 'react';
import { FontContext } from './FontContext';

export function AppHeader({imie, nazwisko}) {
    const { setCzcionka } = useContext(FontContext);
    const czcionki = ['small', 'medium', 'large'];

    return (
        <div className="app-header">
            <h2>{imie} {nazwisko}</h2>
            <div className="app-header-czcionki">
                {czcionki.map(c => (
                    <span 
                        key={c} 
                        title={c} 
                        onClick={() => setCzcionka(c)} 
                        style={{ fontSize: c }}
                    >
                        A
                    </span>
                ))}
            </div>
        </div>
    );
}