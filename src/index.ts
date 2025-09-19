import envVar from 'env-var';
import App from './server.js';

const PORT = envVar.get('PORT_SERVER').default(3e3).asInt();

const app = new App();
app.listen(PORT, () => {
  console.log('serve is running => http://localhost:'.concat(PORT.toString()));
});
