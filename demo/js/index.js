import Actonscroll from '../../src/index';

function generateAction(resultContainer) {
  return () => {
    const elementStyle = document.querySelector(resultContainer).style;

    elementStyle.display = 'block';

    setTimeout(() => elementStyle.display = 'none', 200);
  };
}

function createActonscroll(exampleClass) {
  return (new Actonscroll())
    .container(document.querySelector(`.${exampleClass} .container`))
    .action(generateAction(`.${exampleClass} .result`));
}

document.addEventListener('DOMContentLoaded', () => {
  (new Actonscroll())
    .action(generateAction('.result-body'))
    .start();

  const elementCD = document.querySelector('.config-condition-directions');
  const actonscrollCD = createActonscroll('example-condition-directions');
  actonscrollCD
    .conditions({ directions: Array.from(elementCD.selectedOptions).map(o => o.value) })
    .start();
  elementCD.onchange = event => {
    actonscrollCD.conditions({
      directions: Array.from(event.srcElement.selectedOptions).map(o => o.value),
    });
  };

  const elementCO = document.querySelector('.config-condition-offset');
  const actonscrollCO = createActonscroll('example-condition-offset');
  actonscrollCO
    .conditions({ offset: { y: elementCO.value } })
    .start();
  elementCO.onkeyup = event => actonscrollCO.conditions({ offset: { y: event.srcElement.value } });

  const elementCC = document.querySelector('.config-condition-custom');
  const actonscrollCC = createActonscroll('example-condition-custom');
  actonscrollCC
    .conditions({ custom: () => eval(elementCC.value) })
    .start();
  elementCC.onkeyup = event => actonscrollCC.conditions({
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
  const actonscrollT = createActonscroll('example-throttling');
  actonscrollT
    .throttling(elementT.value)
    .start();
  elementT.onkeyup = event => actonscrollT.throttling(event.srcElement.value).start();

  const elementO = document.querySelector('.config-once');
  const actonscrollO = createActonscroll('example-once');
  actonscrollO
    .once(elementO.checked)
    .start();
  elementO.onchange = event => actonscrollO.once(event.srcElement.checked).start();
});
