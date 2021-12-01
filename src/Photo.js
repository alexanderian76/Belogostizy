import logo from './logo.svg';
import back from './1.jpeg';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const descriptions = ["Огромное пространство для размещения всех ваших гостей. Целый этаж, который вы можете оборудовать в зависимости от ваших потребностей, либо переместиться на просторную веранду, если хотите посидеть на свежем воздухе.",
 "Холода - не повод не отдыхать на природе, в теплом бревенчатом доме вы можете согреться в компании друзей после прогулки на лыжах и попариться в бане, у нас всегда прорублены проруби для любителей острых ощущений.",
 "Парилки сделаны так, чтобы каждый нашел себе место. Все сделано так, чтобы вы получили максимум удовольствий.",
 "У нас хватит места для всех, номера для семей или компаний друзей, каждый найдет свое.",
 "Номера сделаны так, чтобы вы чувствовали себя как дома. Душ, санузел, удобная кровать и стол. Созданы все удобства."];

function importAll(r) {
  console.log(r.keys().map(r));
  return r.keys();
}

const images = importAll(require.context('./assets/photo/', false, /\.(png|jpe?g|svg)$/)).map(require.context('./assets/photo/', false, /\.(png|jpe?g|svg)$/));
const keys = importAll(require.context('./assets/photo/', false, /\.(png|jpe?g|svg)$/));



function MyVerticallyCenteredModal(props) {
  const [resp, setResp] = useState('');
  function ClickHandler() {
    
    fetch("http://127.0.0.1:8000/polls/",
    {
      method : 'POST',
      header : {
        'Content-Type': 'application/x-www-form-urlencoded', 
      },
      body : JSON.stringify({action : "This is POST method."}),
    }
    )
    .then(response => {
      response.text().then(txt => setResp(txt));
    })
    .then(response => {
      console.log(response);
      
    })
  }


  return (
    <Modal
    {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
        {props.header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img style={{width: '100%'}} src={props.image}/>
        
        <div className="Indent">
          {props.description}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

class Photo extends React.Component {   
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      setModalShow: (show) => {this.setState({modalShow: show})},
      image: "",
      header: "",
      description: ""
    };
  }
  render () {
  return (
    <Row style={{marginTop: this.props.marginTop}} xs={1} md={2} className="g-4">
  {Array.from({ length: images.length }).map((_, idx) => (
    <Col key={idx} className="Card">
      <Card style={{backgroundColor : '#fafafa'}}>
        <Card.Img style={{cursor: 'pointer'}} variant="top" src={images[idx].default} onClick={() => this.setState({modalShow: true, image: images[idx].default, header: keys[idx].slice(2, keys[idx].length - 5), description: descriptions[idx]})}/>
        <Card.Body>
          
          <Card.Text style={{fontSize:18, textAlign : 'center'}}>
          {keys[idx].slice(2, keys[idx].length - 5)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
  <MyVerticallyCenteredModal
      show={this.state.modalShow}
      onHide={() => this.state.setModalShow(false)}
      image={this.state.image}
      header={this.state.header}
      description={this.state.description} />
</Row>
  );
}
}



export default Photo;
