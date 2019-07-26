const { Client } = require("@elastic/elasticsearch");
const ESClient = new Client({ node: "http://localhost:9200" });

module.exports = ESClient;
