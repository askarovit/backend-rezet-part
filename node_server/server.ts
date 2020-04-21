import 'module-alias/register';
import app from './app';
import { initRoute } from './src/routes';
import './src/modules';

initRoute(app);

app.listen(process.env.PROD_PORT || 9996, () => {
  console.log('Server ready...')
});