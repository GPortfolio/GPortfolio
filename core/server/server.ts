import build from './sh/build';

export default (app: any) => {
  app.get('/api/sh/build', async (req: any, res: any) => {
    const response = await build();
    res.json(response);
  });
};
