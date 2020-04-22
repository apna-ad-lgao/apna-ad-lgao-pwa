import { isAndroid } from 'mobile-device-detect';
import buildAnchorData from '@/analytics/build-anchor-event-data';

const handleUrlClick = (event) => {
  buildAnchorData({ event, name: 'OpenExternalLink', action: 'click' });
  if (window.cordova) {
    event.preventDefault();
    const target = event.currentTarget;
    const { skipInApp } = target.dataset;
    let options = 'location=no,navigationbuttoncolor=#ffffff,closebuttoncaption=Close,closebuttoncolor=#ffffff,enableViewportScale=yes';
    if (isAndroid) {
      options = 'hideurlbar=yes';
    }
    if (window.inapp_instance) window.inapp_instance.close();
    setTimeout(() => {
      window.inapp_instance = window.cordova.InAppBrowser.open(target.href, skipInApp && skipInApp === 'true' ? '_system' : '_blank', options);
      window.inapp_instance.addEventListener('exit', () => { window.inapp_instance.close(); });
    }, 500);
  }
};

export default {
  bind(el) {
    el.addEventListener('click', handleUrlClick);
  },
  unbind(el) {
    el.removeEventListener('click');
  },
};
