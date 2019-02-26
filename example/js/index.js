import scrollEvent from '../../src/index';

function generateAction(resultContainer, displayMode) {
  return () => {
    const elementStyle = document.querySelector(resultContainer).style;

    elementStyle.display = displayMode;

    setTimeout(() => elementStyle.display = 'none', 200);
  };
}

function createListener(exampleClass) {
  return scrollEvent.create()
    .container(document.querySelector(`.${exampleClass} .container`))
    .action(generateAction(`.${exampleClass} .result`, 'block'));
}

document.addEventListener('DOMContentLoaded', () => {
  scrollEvent.create()
    .action(generateAction('footer .result', 'table-cell'))
    .listen();

  createListener('example-condition-direction')
    .conditions({ direction: 'up' })
    .listen();

  createListener('example-condition-offset')
    .conditions({ offset: 300 })
    .listen();

  createListener('example-condition-custom')
    .conditions({ custom: () => document.getElementById('custom-condition-switch').checked })
    .listen();

  createListener('example-throttling')
    .throttling(2000)
    .listen();

  createListener('example-once')
    .once()
    .listen();
});

