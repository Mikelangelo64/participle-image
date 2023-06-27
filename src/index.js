import './styles/styles.scss';
import init from './scripts/main';
import vevet from './scripts/config/vevet';

// document.addEventListener('DOMContentLoaded', () => {
//   init();
// });

vevet.pageLoad.onLoaded(() => {
  init();
});
