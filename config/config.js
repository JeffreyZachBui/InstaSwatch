var in_client_id = 'dc49c638a16442a986efdf2efa8d84d3',
    in_client_secret = ' 497eb5b378214531b16ed0aba79aaebb',
    in_redirect_uri = 'http://localhost:3000/auth',
    in_auth_url = 'https://api.instagram.com/oauth/authorize/?client_id='
                  + in_client_id + '&redirect_uri='
                  + in_redirect_uri + '&response_type=code';

var db_user = 'Ryan-Sheehan',
    db_password = '%40Mattproof44',
    db_uri = 'mongodb://'
             + db_user + ':'
             + db_password + '@ds133557.mlab.com:33557/instaswatch';

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    uri: db_uri
  },
  instagram: {
    client_id: in_client_id,
    client_secret: in_client_secret,
    auth_url: in_auth_url
  }
};
