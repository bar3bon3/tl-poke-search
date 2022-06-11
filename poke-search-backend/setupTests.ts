import server from './__tests__/server/test-server';
import { API_BASE_URL } from './src/helpers/constants';

// Establish API mocking before all tests.
beforeAll(() =>
  server.listen({
    onUnhandledRequest: ({ url, method }, print) => {
      if (!url.href.startsWith(API_BASE_URL)) {
        return;
      }
      print.warning();
    },
  })
);

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
});

// Clean up after the tests are finished.
afterAll(() => server.close());
