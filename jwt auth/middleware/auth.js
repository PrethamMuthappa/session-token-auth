const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
const cookieparser = require('cookie-parser');
const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(cookieparser());
const id = require('../model/jwt');
const key = process.env.SECRETE_KEY;
const refkey = process.env.REFRESH;

const auths = async (req, res, next) => {
  const token = req.cookies.ids;
  if (!token) {
    return res.status(401).send('Not authorized');
  }

  jwt.verify(token, key, (err, decoded) => {
    if (err) {
      return res.status(401).send('Not authorized');
    }
    req.user = decoded;

    if (decoded.roles === 'admin') {
      return res.status(403).send('Admin access not allowed');
    }

    next(); 
  });

  const reftoken = req.cookies.ref;
  if (!reftoken) {
    return res.status(401).send('Not authorized');
  }

  jwt.verify(reftoken, refkey, (err, dec) => {
    if (err) {
      return res.status(401).send('Not authorized');
    }

    if (Date.now() > dec.exp * 1000) {
      return res.status(401).send('Token is expired');
    }

    
    const newAccessToken = jwt.sign({ user: dec.user, roles: dec.roles }, key, {
      expiresIn: '25m'
    });

    res.cookie('ids', newAccessToken, {
      expires: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: true,
      secure: true
    });

    req.user = dec;

    next(); // Continue processing the request
  });
};

module.exports = auths;
