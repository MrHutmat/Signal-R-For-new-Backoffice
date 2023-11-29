

namespace SignalRProjectSite.Hubs
{
    public class TestHub : Hub
    {
        // when a client sends us a ping
        public async Task Ping()
        {
            // we trigger the pong event on all clients
            await Clients.All.Pong();
        }
    }
}