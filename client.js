const net = require("net");

const conn = net.createConnection({
  host: "localhost",
  port: 3000,
});

conn.setEncoding("utf-8");

conn.on("data", (data) => {
  console.log("Server says: ", data);
});

conn.on("connect", () => {
  conn.write("Hello From Client!\n");
  conn.write("Can you help me find a file?\n");
  conn.write("Find Guide.txt");
});

