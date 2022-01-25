import * as $ from 'jquery';
import './style.scss';

$('.slider-nav__btn').on('click', (e) => {
  const btn = $(e.target);
  const sliderId = btn.parent('.slider-nav').data('slider-id');
  const slider = $('#' + sliderId);

  if (btn.hasClass('slider-nav__btn--prev')) {
    slider.trigger('prev.owl.carousel');
  } else {
    slider.trigger('next.owl.carousel');
  }
});
