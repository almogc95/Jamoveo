// import components
import MyRouter from "./routes/MyRouter";
import AuthContextProvider from './context/AuthContext';
import AuthContextProviderAdmin from "./context/AuthContextAdmin";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AuthContextProviderAdmin>
          <AuthContextProvider>
            <MyRouter />
          </AuthContextProvider>
        </AuthContextProviderAdmin>
      </header>
    </div >
  );
}

export default App;
