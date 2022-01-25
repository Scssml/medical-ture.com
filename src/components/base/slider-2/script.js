import * as $ from 'jquery';
import 'owl.carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import './style.scss';

$('.slider-2').owlCarousel({
  loop: true,
  margin: 30,
  nav: true,
  dots: false,
  items: 1,
});
