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

