import Moralis from "moralis";

Moralis.start({
  serverUrl: 'https://qqmhgwptk8vf.usemoralis.com:2053/server', //process.env.VUE_APP_MORALIS_SERVER_URL,
  appId:'AbMB6Sj6oYLl5T13SJJYvtt8N8hn3sCveq4tSKBo',// process.env.VUE_APP_MORALIS_APP_ID,
});

export default Moralis;
