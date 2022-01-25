import * as $ from 'jquery';
import './style.scss';

$('.tabs-form .tabs-form__item').on('click', (e) => {
  const btn = $(e.target);
  const tabsId = btn.data('tabs-id');
  const tab = btn.attr('href');

  btn.parents('.tabs-form').find('.tabs-form__item--active').removeClass('tabs-form__item--active');
  btn.addClass('tabs-form__item--active');

  $(`.tab-block[data-tabs-id=${tabsId}]`).addClass('d-none');
  $(`.tab-block[data-tabs-id=${tabsId}]`).find('input, textarea, select').prop('disabled', true);

  $(tab).removeClass('d-none');
  $(tab).find('input, textarea, select').prop('disabled', false);

  return false;
});
