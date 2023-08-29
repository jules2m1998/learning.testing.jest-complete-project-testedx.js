import { rest } from "msw";
import { setupServer } from "msw/node";

/**
 *
 * @param {{method: string, path: string, res: (req, res, ctx) => Object[]}} actions
 * @returns
 */
export const createServer = (actions) => {
  const handlers = actions.map((x) => {
    return rest[x.method ?? "get"](x.path, (req, res, ctx) => {
      return res(ctx.json(x.res(req, res, ctx)));
    });
  });
  const server = setupServer(...handlers);
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  return server;
};
