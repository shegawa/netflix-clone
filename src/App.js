import './App.css';
import Banner from './components/Banner/Banner.js';
import Footer from './components/Footer/Footer.js';
import Header from './components/Header/Header.js'
import RowContainer from './components/Rows/RowList/RowContainer.js';
function App() {
  return (
    <div>
      <Header />
      <Banner />
      <RowContainer />
      <Footer />
    </div>
  );
}

export default App;
