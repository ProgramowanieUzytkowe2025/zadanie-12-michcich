import './App.css'
import { AppCalculator } from './AppCalculator'
import { AppHeader } from './AppHeader'
import { FontProvider, FontContext } from './FontContext' 
import { useContext } from 'react'

function AppLayout() {
  const { czcionka } = useContext(FontContext);

  return (
    <div className="app" style={{ fontSize: czcionka }}>
      <div>
        <AppHeader imie={'Imię'} nazwisko={'Nazwisko'} />
      </div>
      <div>
        <AppCalculator />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <FontProvider>
      <AppLayout />
    </FontProvider>
  )
}