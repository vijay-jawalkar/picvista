import AllRoutes from './routes/AllRoutes';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="bg-cover bg-[url('https://images.pexels.com/photos/266708/pexels-photo-266708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
      <Header/>
   <AllRoutes/>
    </div>
  );
}

export default App;
