import * as $ from 'jquery';
import './style.scss';

$(document).on('change', '.textarea textarea[required]', (e) => {
  const textarea = $(e.target);
  const parent = textarea.parent('.textarea');
  const val = textarea.val();

  if (val) {
    parent.removeClass('textarea--error');
  } else if (!val && !parent.hasClass('textarea--error')) {
    parent.addClass('textarea--error');
  }
});
