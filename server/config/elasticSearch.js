const { Client } = require("@elastic/elasticsearch");
const ESClient = new Client({ node: "http://elasticsearch:9200" });

module.exports = ESClient;
