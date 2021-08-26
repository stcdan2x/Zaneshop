import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <>
      <Header />
        <main className="py-2" >
          <Container>
            <h1>Welcome to SkyZen</h1>
          </Container>
        </main>
      <Footer />
    </>
  );
}

export default App;
