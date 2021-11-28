import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { RoutesApp } from './routes/RoutesApp';
import { UsuarioProvider } from './context/UsuarioContext';
import { EspecialidadProvider } from './context/EspecialidadContext';
import { UsuarioAdminProvider } from './context/UsuarioAdminContext';




function App() {
  return (
    <>
    <UsuarioAdminProvider>
    <EspecialidadProvider>
      <UsuarioProvider>
          <RoutesApp />
      </UsuarioProvider>
    </EspecialidadProvider>
    </UsuarioAdminProvider>
    </>
  );
}

export default App;
