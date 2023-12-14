

using Microsoft.AspNetCore.SignalR;

namespace SignalRProjectSite.Hubs
{
    public class TestHub : Hub
    {
        public static int UsersConnected { get; set; } = 0;

        public static string TestString { get; set; } = "A new user has joinned";

        public override Task OnConnectedAsync()
        {
            UsersConnected++;
            Clients.All.SendAsync("updateTotalUsers", UsersConnected).GetAwaiter().GetResult();
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            UsersConnected--;
            Clients.All.SendAsync("updateTotalUsers", UsersConnected).GetAwaiter().GetResult();
            return base.OnDisconnectedAsync(exception);

        }

        public async Task HelloWorld()
        {
            await Clients.All.SendAsync("ReceiveMessage", TestString);
        }
        // when a client sends us a ping
        //public async Task Ping()
        //{
        //    // we trigger the pong event on all clients
        //    await Clients.All.SendAsync("pong");
        //}


    }
}