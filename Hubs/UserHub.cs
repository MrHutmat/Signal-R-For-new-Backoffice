using Microsoft.AspNetCore.SignalR;

namespace SignalRProjectSite.Hubs
{
    public class UserHub : Hub
    {
        // A static property to keep track of the number of connected users
        public static int UsersConnected { get; set; } = 0;

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

            // Notify all clients about the updated total number of users. (Decrease the number of users in realtime on front-end)
            Clients.All.SendAsync("updateTotalUsers", UsersConnected).GetAwaiter().GetResult();

            // Call the base class implementation. This ensures the connection management goes through
            return base.OnDisconnectedAsync(exception);

        }
    }
}