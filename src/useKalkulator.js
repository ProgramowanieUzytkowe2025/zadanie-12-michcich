import { useState, useEffect } from 'react';

export function useKalkulator(liczbaA, liczbaB) {
    const [wynik, setWynik] = useState(() => {
        const saved = sessionStorage.getItem('calc_wynik');
        return saved ? JSON.parse(saved) : null;
    });

    const [historia, setHistoria] = useState(() => {
        const saved = sessionStorage.getItem('calc_historia');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        sessionStorage.setItem('calc_historia', JSON.stringify(historia));
    }, [historia]);

    useEffect(() => {
        sessionStorage.setItem('calc_wynik', JSON.stringify(wynik));
    }, [wynik]);

    function aktualizujHistorie(operation, wynikOperacji) {
        const nowaHistoria = [...historia, { a: liczbaA, b: liczbaB, operation: operation, wynik: wynikOperacji }];
        setHistoria(nowaHistoria);
        setWynik(wynikOperacji);
    }

    const dodaj = () => aktualizujHistorie('+', liczbaA + liczbaB);
    const odejmij = () => aktualizujHistorie('-', liczbaA - liczbaB);
    const pomnoz = () => aktualizujHistorie('*', liczbaA * liczbaB);
    const podziel = () => {
        if (liczbaB !== 0) {
            aktualizujHistorie('/', liczbaA / liczbaB);
        }
    };

    return { 
        wynik, historia, setWynik, setHistoria, 
        dodaj, odejmij, pomnoz, podziel 
    };
}