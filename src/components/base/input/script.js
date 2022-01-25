import Inputmask from 'inputmask';
import * as $ from 'jquery';
import './style.scss';

Inputmask('+7 (999) 999-99-99').mask('input[type="tel"]');

$(document).on('change', '.input input[required]', (e) => {
  const input = $(e.target);
  const parent = input.parent('.input');
  const val = input.val();

  if (val) {
    parent.removeClass('input--error');
  } else if (!val && !parent.hasClass('input--error')) {
    parent.addClass('input--error');
  }
});
