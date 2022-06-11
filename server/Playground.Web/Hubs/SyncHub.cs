using Microsoft.AspNetCore.SignalR;
using Playground.Data.Models;

namespace Playground.Web.Hubs;

public class SyncHub : Hub
{
    public async Task TriggerSync(Sync sync) =>
        await Clients
            .All
            .SendAsync("sync", sync);
}