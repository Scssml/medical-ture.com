import * as $ from 'jquery';

const flexHeightFix = () => {
  $('div[class^="col"] .flex-height-fix').css('height', 'auto');
  $('div[class^="col"] .flex-height-fix').each((index, val) => {
    const item = $(val);
    const paddingItem = item.outerHeight() - item.height();
    const parentHeight = item.parent('div[class^="col"]').height();
    item.height(parentHeight - paddingItem);
  });
};

window.flexHeightFix = flexHeightFix;

$(() => {
  setTimeout(() => {
    window.flexHeightFix();
  }, 300);
});

$(window).on('resize', flexHeightFix);
