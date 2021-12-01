import logo from './green-leaf.svg';
import vk_logo from './assets/Vk_Logo.png'
//import images from './assets/*.jpeg';
import './App.css';
import Photo from './Photo';
import CarouselBox from './CarouselBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {refs, Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

//let images = [back, back, logo];

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('./assets/main/', false, /\.(png|jpe?g|svg)$/));


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

let myRef = React.createRef();

function Home(height) {
  return <CarouselBox height={getWindowDimensions().height - height.height}/>;
}

function About(props) {
  return (<div style={{marginTop : props.marginTop, backgroundImage : images[0].default}}>
    <h6 style={{textAlign : 'center', paddingRight : props.width/5, paddingLeft : props.width/5, paddingTop : props.marginTop}}>Здесь вы можете увлекательно провести время с семьей и друзьями. Устроить дискотеку или отдохнуть от шумного города. Искупаться в речке, попариться в бане, устроить пикник, и все это в одном месте, ведь мы находимся на самом берегу реки, вдали от любого города.</h6>
    <div style={{position : 'absolute', bottom : 10, left : 15}}>
    <h4>Вы можете найти нас:</h4>
    <img style={{cursor: 'pointer', width: props.width/50}} onClick={() => { 
     window.location.href = 'https://vk.com/club192815106'; 
     return null;
}} src={vk_logo}/>
    <div>Или по телефону: +7 (910) 810-07-25</div>
    <div>В группе также находится прайс-лист.</div>
    </div>
    </div>);
}

function Users() {
  return <Photo/>;
}

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      height: 0,
      width : 0
    }
  }

  componentDidMount() {
    const height = this.divElement.clientHeight;
    const width = this.divElement.clientWidth;
    this.setState({ height, width });
  }

  render(){
  return (
  <>
  <Router>
      <div>
      <Navbar ref={ (divElement) => { this.divElement = divElement } } fixed="top" bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="/">
    <img
        src={logo}
        width="37"
        height="30"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
      База отдыха "Белогостицы"</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/">Главная</Nav.Link>
        <Nav.Link href="/users">Галерея</Nav.Link>
        <Nav.Link href="/about">О нас</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
        
        <Switch>
          <Route path="/about">
            <About marginTop={this.state.height} width={this.state.width}/>
          </Route>
          <Route path="/users">
          <Photo marginTop={this.state.height}/>
          </Route>
          <Route path="/">
          <CarouselBox height={getWindowDimensions().height - this.state.height} marginTop={this.state.height}/>
          </Route>
        </Switch>
      </div>
    </Router>
    {/*<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
  </div>*/}
      </>
  );
}
}




//export default App;
