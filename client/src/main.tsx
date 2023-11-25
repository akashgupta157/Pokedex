import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './CSS/index.scss'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './ContextAPI/ThemeContext.tsx'
import { DataProvider } from './ContextAPI/DataContext.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <DataProvider>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </DataProvider>
)
