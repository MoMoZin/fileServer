const net = require("net");
const fs = require('fs');

const server = net.createServer();

server.on("connection", (client) => {
  console.log("New client Connected");
  client.setEncoding("utf-8");
  client.write("Greeting from server!");

  client.on("data", (data) => {

    let dataList = data.split("\n");
    let fileToFind = "";
    dataList.forEach(currentData => {

      console.log("Client says: ", currentData);
      if (currentData.startsWith("Find")) {
        fileToFind = currentData.slice(5);
        console.log("Here is what I need to find => ", fileToFind);
      }
    });

    if (fileToFind.length > 0) {
      fs.readFile(fileToFind, 'utf-8', (err, data) => {
        if (err) {
          console.log(err);
        }
        if (data) {
          client.write("Found the file you are looking for!\n");
          client.write(`Here is the content of ${fileToFind}:\n${data}`);
          client.write("\nEnd of the file.");
        }
      });
    }


    console.log("Finished finding the file!");

  });

});


server.listen(3000, () => {
  console.log("Server is listening on port 3000!");
});