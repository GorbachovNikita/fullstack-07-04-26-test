import * as process from 'process';

const SERVER = {
   PORT: parseInt(process.env.PORT || '5000', 10),
   CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
};

export { SERVER };
