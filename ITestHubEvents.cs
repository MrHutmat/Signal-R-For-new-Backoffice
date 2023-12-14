namespace SignalRProjectSite
{
    public interface ITestHubEvents
    {
        public Task Pong();

        public Task UpdateUsersConnected(int usersConnected);
    }
}
