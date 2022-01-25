import * as $ from 'jquery';
import './style.scss';

setTimeout(() => {
  $('.cookie-info').addClass('cookie-info--show');
}, 1000);

$('.cookie-info').on('click', '.cookie-info__close, .btn', () => {
  $('.cookie-info').removeClass('cookie-info--show');

  return false;
});
