import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { RoutesApp } from './routes/RoutesApp';
import { UsuarioProvider } from './context/UsuarioContext';
import { EspecialidadProvider } from './context/EspecialidadContext';
function App() {
  return (
    <>
    <EspecialidadProvider>
      <UsuarioProvider>
          <RoutesApp />
      </UsuarioProvider>
    </EspecialidadProvider>
    </>
  );
}

export default App;
