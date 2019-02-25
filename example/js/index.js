import scrollEvent from '../../src/index';

function createListener(exampleClass) {
  const action = () => {
    const elementStyle = document.querySelector(`.${exampleClass} .result`).style;

    elementStyle.display = 'block';

    setTimeout(() => elementStyle.display = 'none', 200);
  };

  return scrollEvent.create()
    .container(document.querySelector(`.${exampleClass} .container`))
    .action(action);
}

document.addEventListener('DOMContentLoaded', () => {
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

