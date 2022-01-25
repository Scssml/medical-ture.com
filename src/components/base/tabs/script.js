import * as $ from 'jquery';
import './style.scss';

$('.tabs .btn').on('click', (e) => {
  const btn = $(e.target);
  const tabsId = btn.data('tabs-id');
  const tab = btn.attr('href');

  btn.parents('.tabs').find('.btn').addClass('btn--color-transparent');
  btn.removeClass('btn--color-transparent');

  $(`.tab-block[data-tabs-id=${tabsId}]`).addClass('d-none');
  $(tab).removeClass('d-none');

  return false;
});
