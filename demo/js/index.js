import actonscroll from '../../src/index';

function generateAction(resultContainer) {
  return () => {
    const elementStyle = document.querySelector(resultContainer).style;

    elementStyle.display = 'block';

    setTimeout(() => elementStyle.display = 'none', 200);
  };
}

function createListener(exampleClass) {
  return actonscroll.create()
    .container(document.querySelector(`.${exampleClass} .container`))
    .action(generateAction(`.${exampleClass} .result`));
}

document.addEventListener('DOMContentLoaded', () => {
  actonscroll.create()
    .action(generateAction('.result-body'))
    .listen();

  const elementCDV = document.querySelector('.config-condition-direction-vertical');
  const listenerCDH = createListener('example-condition-direction-vertical');
  listenerCDH
    .conditions({ directions: elementCDV.value })
    .listen();
  elementCDV.onchange = event => listenerCDH.conditions({ directions: event.srcElement.value });

  const elementCDH = document.querySelector('.config-condition-direction-horizontal');
  const listenerCDH = createListener('example-condition-direction-horizontal');
  listenerCDH
    .conditions({ directions: elementCDH.value })
    .listen();
  elementCDH.onchange = event => listenerCDH.conditions({ directions: event.srcElement.value });

  const elementCO = document.querySelector('.config-condition-offset');
  const listenerCO = createListener('example-condition-offset');
  listenerCO
    .conditions({ offset: elementCO.value })
    .listen();
  elementCO.onkeyup = event => listenerCO.conditions({ offset: event.srcElement.value });

  const elementCC = document.querySelector('.config-condition-custom');
  const listenerCC = createListener('example-condition-custom');
  listenerCC
    .conditions({ custom: () => eval(elementCC.value) })
    .listen();
  elementCC.onkeyup = event => listenerCC.conditions({
    custom: () => {
      try {
        elementCC.style.borderColor = 'white';
        elementCC.style.backgroundColor = 'white';
        return eval(event.srcElement.value);
      } catch (error) {
        elementCC.style.borderColor = '#c36565';
        elementCC.style.backgroundColor = '#ff8484';
      }
    },
  });

  const elementT = document.querySelector('.config-throttling');
  const listenerT = createListener('example-throttling');
  listenerT
    .throttling(elementT.value)
    .listen();
  elementT.onkeyup = event => listenerT.throttling(event.srcElement.value).listen();

  const elementO = document.querySelector('.config-once');
  const listenerO = createListener('example-once');
  listenerO
    .once(elementO.checked)
    .listen();
  elementO.onchange = event => listenerO.once(event.srcElement.checked).listen();
});
