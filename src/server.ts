import os from 'os';
import config from './common/config';
import app from './app';

app.listen(config.PORT, () =>
  process.stdout.write(`App is running on http://localhost:${config.PORT}${os.EOL}`)
);