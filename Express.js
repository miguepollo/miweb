 
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
  });
  const express = require('express');
  const compression = require('compression');
  const app = express();
  
  app.use(compression());