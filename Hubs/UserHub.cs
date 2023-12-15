using Microsoft.AspNetCore.SignalR;

namespace SignalRProjectSite.Hubs
{
    public class UserHub : Hub
    {
        public static int UsersConnected { get; set; } = 0;

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
    }
}