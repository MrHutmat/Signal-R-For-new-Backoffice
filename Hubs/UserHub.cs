using Microsoft.AspNetCore.SignalR;

namespace SignalRProjectSite.Hubs
{
    public class UserHub : Hub
    {
        // A static property to keep track of the number of connected users
        public static int UsersConnected { get; set; } = 0;

        //A list of UmbracoUsers to keep track of identity
        public static List<UmbracoUser> ConnectedUserToTheHub { get; } = new List<UmbracoUser>();

        // Method invoked when a client connects to the hub
        public override Task OnConnectedAsync()
        {
            // Increment the count of connected users
            UsersConnected++;

            // Notify all clients about the updated total number of users. (Increase the number of users in realtime on front-end)
            Clients.All.SendAsync("updateTotalUsers", UsersConnected).GetAwaiter().GetResult();

            // Call the base class implementation. This ensures the connection management goes through
            return base.OnConnectedAsync();
        }

        // Method invoked when a client disconnects from the hub
        public override Task OnDisconnectedAsync(Exception? exception)
        {
            // Decrement the count of connected users
            UsersConnected--;

            //Get ConnectionID and locate the corresponding connected User
            var connectionId = Context.ConnectionId;
            var connectedUser = ConnectedUserToTheHub.Find(user => user.Id == connectionId);


            // Notify all clients about the updated total number of users. (Decrease the number of users in realtime on front-end)
            if (connectedUser != null)
            {
                ConnectedUserToTheHub.Remove(connectedUser);
                await Clients.All.SendAsync("updateConnectedUsers", ConnectedUserToTheHub);
            }
            await Clients.All.SendAsync("updateTotalUsers", UsersConnected);

            // Call the base class implementation. This ensures the connection management goes through
            return base.OnDisconnectedAsync(exception);

        }
        // Method to connect a user to the hub
        public async Task ConnectUser(string userName, string connectionId)
        {
            if (!string.IsNullOrEmpty(userName) && !string.IsNullOrEmpty(connectionId))
            {
                // Create a new UmbracoUser and add it to the connected users list
                var connectedUser = new UmbracoUser
                {
                    Name = userName,
                    Id = connectionId
                };
                ConnectedUserToTheHub.Add(connectedUser);

                // Notify all clients about the updated list of connected users
                await Clients.All.SendAsync("updateConnectedUsers", ConnectedUserToTheHub);
            }
        }
    }
}