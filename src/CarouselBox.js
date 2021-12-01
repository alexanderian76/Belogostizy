import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import firstImg from './1.jpeg'
import secondImg from './2.jpeg'
import logo from './logo.svg';
import './App.css';

//let images = [firstImg, secondImg, logo];

function importAll(r) {
    console.log(r.keys().map(r));
    return r.keys();
  }

const images = importAll(require.context('./assets/main/', false, /\.(png|jpe?g|svg)$/)).map(require.context('./assets/main/', false, /\.(png|jpe?g|svg)$/));
const keys = importAll(require.context('./assets/main/', false, /\.(png|jpe?g|svg)$/));
const labels = ['Семейный отдых на природе', 'Отвлекитесь от ежедневной суеты', 'Проведите незабываемые выходные в единении в единении с природой']
export default class CarouselBox extends Component {
    render() {
        return(
            <Carousel style={{height: this.props.height}} style={{marginTop: this.props.marginTop}} nextLabel="" prevLabel="">
                {keys.map((image, index) =>
                    <Carousel.Item><img className="d-block w-100 InSlide" style={{height: this.props.height}} src={images[index].default} alt="Image"/>
                    <Carousel.Caption style={{fontSize : 20}}>
                        {image.slice(2,image.length - 5)}.
                        </Carousel.Caption>
                        </Carousel.Item>
                )}
                {/*<Carousel.Item>
                    <img className="d-block w-100 InSlide" style={{height: this.props.height}} src={firstImg} alt="Image"/>
                    <Carousel.Caption>
                        First image
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                    <img className="d-block w-100 InSlide" style={{height: this.props.height}} src={secondImg} alt="Image"/>
                    <Carousel.Caption>
                        Second image
                </Carousel.Caption>
                </Carousel.Item>*/}
                    
                </Carousel>
        );
    }
} 