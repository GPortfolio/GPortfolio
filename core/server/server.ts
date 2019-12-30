import build from './sh/build';

export default (app: any) => {
  app.get('/api/sh/build', async (req: any, resp: any) => {
    const response = await build();
    resp.json(response);
  });
};
