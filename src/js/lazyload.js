import * as $ from 'jquery';
import * as Lazyoad from 'lazyload';

$(() => {
  new Lazyoad($('img.lazyload')); // eslint-disable-line no-new
});
