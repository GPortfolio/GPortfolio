import build from './sh/build';

export default (app: any) => {
  /**
   * Build project (create dist)
   */
  app.get('/api/sh/build', async (req: any, resp: any) => {
    const response = await build();
    resp.json(response);
  });
};
