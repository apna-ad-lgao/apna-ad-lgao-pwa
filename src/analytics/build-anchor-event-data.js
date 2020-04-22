import analytics from '@/analytics/new-relic';

export default ({
  event,
  name = '',
  action = '',
  properties = {},
}) => {
  try {
    const target = event.currentTarget;
    const originalTarget = event.target;
    const { title, type } = target.dataset;

    const targetClass = Array.from(target.classList).length ? `.${Array.from(target.classList).join('.')}` : '';
    const originalTargetClass = Array.from(originalTarget.classList).length ? `.${Array.from(originalTarget.classList).join('.')}` : '';
    const targetElemStr = `${target.nodeName}${target.id ? `#${target.id}` : ''}${targetClass}`.toLowerCase();
    const originalTargetElemStr = `${originalTarget.nodeName}${originalTarget.id ? `#${originalTarget.id}` : ''}${originalTargetClass}`.toLowerCase();

    const data = {
      type: 'InteractionEvent',
      properties: {
        name,
        action,
        title: title || target.title || target.innerText,
        originalAction: event.type,
        originalTarget: originalTargetElemStr,
        originalTargetElem: originalTarget.nodeName,
        targetId: target.id,
        target: targetElemStr,
        targetElem: target.nodeName,
        targetHref: target.href,
        targetType: type,
        targetDataSet: target.dataset,
        ...properties,
      },
    };

    analytics.track(data);
  } catch (e) {
    console.warn(`Error sending 'InteractionEvent' event at '${window.location.href}' with error: `, e); // eslint-disable-line
  }
};
