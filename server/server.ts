import 'module-alias/register';
import app from './app';
import { initRoute } from './src/routes';
import './src/modules';

initRoute(app);

app.use((err, req, res, next)=> {
  /* Some handler error */
  res
    .status(err.status || 500)
    .json({ data: err.message })
});

app.listen(process.env.PROD_PORT || 9996, () => {
  console.log('Server ready...')
});