const bonjour = require('bonjour')();

const Device = require('../device/device');

test('it should create a device instance', () => {
  const testDev = new Device('dummy');
  expect(testDev.name).toBe('dummy');
  expect(testDev.type).toBe('http');
  expect(testDev.client).toBeNull();
  expect(testDev.browser).toBeNull();
  expect(testDev.panel).toEqual({});
});

test('it should init device ok', () => {
  const testDev = new Device('dummy');
  testDev.init();
  expect(testDev.panel).toEqual({});
  expect(testDev.client).toBeNull();
  expect(testDev.browser).toBeTruthy();
});

test('it should found a a service', () => {
  const testDev = new Device('dummy');
  testDev.init();
  expect(testDev.panel).toEqual({});
  expect(testDev.client).toBeNull();
  expect(testDev.browser).toBeTruthy();

  const service = bonjour.publish({
    name: 'PRM#dummyhub',
    type: 'http',
    port: 3000
  });
  service.start();
  service.on('up', service => {
    expect(testDev.panel.port).toBe(3000);
  });
});
