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
    .start();

  const elementCD = document.querySelector('.config-condition-directions');
  const listenerCD = createListener('example-condition-directions');
  listenerCD
    .conditions({ directions: Array.from(elementCD.selectedOptions).map(o => o.value) })
    .start();
  elementCD.onchange = event => {
    listenerCD.conditions({
      directions: Array.from(event.srcElement.selectedOptions).map(o => o.value),
    });
  };

  const elementCO = document.querySelector('.config-condition-offset');
  const listenerCO = createListener('example-condition-offset');
  listenerCO
    .conditions({ offset: elementCO.value })
    .start();
  elementCO.onkeyup = event => listenerCO.conditions({ offset: event.srcElement.value });

  const elementCC = document.querySelector('.config-condition-custom');
  const listenerCC = createListener('example-condition-custom');
  listenerCC
    .conditions({ custom: () => eval(elementCC.value) })
    .start();
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
    .start();
  elementT.onkeyup = event => listenerT.throttling(event.srcElement.value).start();

  const elementO = document.querySelector('.config-once');
  const listenerO = createListener('example-once');
  listenerO
    .once(elementO.checked)
    .start();
  elementO.onchange = event => listenerO.once(event.srcElement.checked).start();
});
