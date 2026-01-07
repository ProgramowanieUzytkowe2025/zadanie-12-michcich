import './AppCalculator.css';
import { useState, useEffect, useReducer } from 'react'; 
import { AppButton } from './AppButton';
import { AppCalculationHistory } from './AppCalculationHistory';
import { useKalkulator } from './useKalkulator';

function ostatniaCzynnoscReducer(state, action) {
    switch (action.type) {
        case 'ZMIANA_A':
            return 'Zmodyfikowano wartość liczby A';
        case 'ZMIANA_B':
            return 'Zmodyfikowano wartość liczby B';
        case 'OBLICZENIA':
            return 'Wykonano obliczenia';
        case 'PRZYWROCENIE':
            return 'Przywrócono historyczny stan';
        default:
            return state;
    }
}

export function AppCalculator() {
    const [ostatniaCzynnosc, dispatch] = useReducer(ostatniaCzynnoscReducer, 'Brak');

    const [liczbaA, setLiczbaA] = useState(() => {
        const saved = sessionStorage.getItem('calc_a');
        return saved ? JSON.parse(saved) : null;
    });
    const [liczbaB, setLiczbaB] = useState(() => {
        const saved = sessionStorage.getItem('calc_b');
        return saved ? JSON.parse(saved) : null;
    });

    const [porownanie, setPorownanie] = useState('');

    const { 
        wynik, historia, setWynik, setHistoria, 
        dodaj, odejmij, pomnoz, podziel 
    } = useKalkulator(liczbaA, liczbaB);

    useEffect(() => {
        sessionStorage.setItem('calc_a', JSON.stringify(liczbaA));
    }, [liczbaA]);

    useEffect(() => {
        sessionStorage.setItem('calc_b', JSON.stringify(liczbaB));
    }, [liczbaB]);

    useEffect(() => {
        if (liczbaA == null || liczbaB == null) {
            setPorownanie('');
        } else {
            if (liczbaA === liczbaB) {
                setPorownanie('Liczba A jest równa liczbie B.');
            } else if (liczbaA > liczbaB) {
                setPorownanie('Liczba A jest większa od liczby B.');
            } else {
                setPorownanie('Liczba B jest większa od liczby A.');
            }
        }
    }, [liczbaA, liczbaB]);

    function liczbaAOnChange(value) {
        setLiczbaA(parsujLiczbe(value));
        dispatch({ type: 'ZMIANA_A' });
    }

    function liczbaBOnChange(value) {
        setLiczbaB(parsujLiczbe(value));
        dispatch({ type: 'ZMIANA_B' });
    }

    function parsujLiczbe(value) {
        const sparsowanaLiczba = parseFloat(value);
        return isNaN(sparsowanaLiczba) ? null : sparsowanaLiczba;
    }

    function onAppCalculationHistoryClick(index) {
        const wpis = historia[index];
        const nowaHistoria = historia.slice(0, index + 1);
        setHistoria(nowaHistoria);
        setLiczbaA(wpis.a);
        setLiczbaB(wpis.b);
        setWynik(wpis.wynik);
        dispatch({ type: 'PRZYWROCENIE' });
    }

    function wykonajOperacje(operacja) {
        operacja();
        dispatch({ type: 'OBLICZENIA' });
    }

    let zablokujPrzyciski = liczbaA == null || liczbaB == null;
    let zablokujDzielenie = zablokujPrzyciski || liczbaB === 0;

    return (
        <div className='app-calculator'>
            <div className='app-calculator-pole'>
                <label>Ostatnia czynność: </label>
                <span>{ostatniaCzynnosc}</span>
            </div>
            <hr />
            
            <div className='app-calculator-pole'>
                <label>Wynik: </label>
                <span>{wynik}</span>
            </div>
            <hr />
            <div className='app-calculator-pole'>
                <label>Dynamiczne porównanie liczb: </label>
                <span>{porownanie}</span>
            </div>
            <hr />
            <div className='app-calculator-pole'>
                <label htmlFor="liczba1">Liczba 1</label>
                <input id="liczba1" type="number" value={liczbaA ?? ''} onChange={(e) => liczbaAOnChange(e.target.value)} name="liczba1" />
            </div>
            <div className='app-calculator-pole'>
                <label htmlFor="liczba2">Liczba 2</label>
                <input id="liczba2" type="number" value={liczbaB ?? ''} onChange={(e) => liczbaBOnChange(e.target.value)} name="liczba2" />
            </div>
            <hr />
            <div className='app-calculator-przyciski'>
                <AppButton disabled={zablokujPrzyciski} title="+" onClick={() => wykonajOperacje(dodaj)}/>
                <AppButton disabled={zablokujPrzyciski} title="-" onClick={() => wykonajOperacje(odejmij)}/>
                <AppButton disabled={zablokujPrzyciski} title="*" onClick={() => wykonajOperacje(pomnoz)}/>
                <AppButton disabled={zablokujDzielenie} title="/" onClick={() => wykonajOperacje(podziel)}/>
            </div>
            <hr />
            <div className='app-calculator-historia'>
                <AppCalculationHistory historia={historia} onClick={onAppCalculationHistoryClick}/>
            </div>
        </div>
    );
}