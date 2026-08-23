function createEmployeeData(overrides = {}) {
  const timestamp = Date.now();

  return {
    name: `Playwright Test Employee ${timestamp}`,
    age: '30',
    salary: '5000',
    durationWorked: '12',
    grade: '2',
    email: `pw-test-${timestamp}@example.com`,
    ...overrides,
  };
}

module.exports = { createEmployeeData };
