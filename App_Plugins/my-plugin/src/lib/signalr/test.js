var connection = new signalR.HubConnectionBuilder()
  .withUrl("/umbraco/userhub") // this is the url that we created in the routing `TestHubRoutes.GetTestHubRoute()`
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Warning)
  .build();

// register our callbacks when the hub sends us an event
connection.on("Pong", function () {
  console.log("Pong");
});

// start the connection
connection
  .start()
  .then(function () {
    console.info("signalR connection established");

    // connection is established => call a function on the hub
    connection.invoke("Ping").catch(function (err) {
      return console.error(
        "Could not invoke method [Ping] on signalR connection",
        err.toString()
      );
    });
  })
  .catch(function (err) {
    return console.error(
      "could not establish a signalR connection",
      err.toString()
    );
  });
