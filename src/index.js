const server = require("./config/server");

require('./app/endpoints/estudiante')(server);
server.listen(server.get("port"), () => console.log(`${server.get("port")}`));