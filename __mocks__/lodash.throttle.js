import throttle from 'lodash.throttle';

export default jest.genMockFromModule('lodash.throttle').mockImplementation(throttle);
