import { Metadata } from "next";

import { getTickets } from "@/lib/api/tickets";

export const metadata: Metadata = {
  title: "Support Tickets",
  description: "View support tickets and their status",
};

export const revalidate = 3600;

interface Ticket {
  id: string;
  type: string;
  title: string;
  urgent: boolean;
  content: string;
  status: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

const TicketsPage = async () => {
  const tickets = await getTickets();

  // Group tickets by status
  const ticketsByStatus: Record<string, Ticket[]> = {
    open: [],
    "in-progress": [],
    resolved: [],
    closed: [],
  };

  tickets.forEach((ticket) => {
    if (ticketsByStatus[ticket.status]) {
      ticketsByStatus[ticket.status].push(ticket);
    }
  });

  const statusLabels: Record<string, string> = {
    open: "Open Tickets",
    "in-progress": "In Progress",
    resolved: "Resolved",
    closed: "Closed",
  };

  const statusColors: Record<string, string> = {
    open: "bg-red-100 text-red-800",
    "in-progress": "bg-yellow-100 text-yellow-800",
    resolved: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Support Tickets</h1>
          <p className="text-lg text-gray-600">
            Track the status of your submitted support tickets
          </p>
        </div>

        {tickets.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500">No tickets found</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(statusLabels).map(([status, label]) => {
              const ticketsInStatus = ticketsByStatus[status];
              if (ticketsInStatus.length === 0) return null;

              return (
                <div key={status}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">{label}</h2>
                  <div className="grid gap-4">
                    {ticketsInStatus.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">Ticket ID: {ticket.id}</p>
                          </div>
                          <div className="flex gap-2 ml-4 flex-wrap justify-end">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                statusColors[ticket.status]
                              }`}
                            >
                              {ticket.status}
                            </span>
                            {ticket.urgent && (
                              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-red-200 text-red-900">
                                Urgent
                              </span>
                            )}
                            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                              {ticket.type}
                            </span>
                          </div>
                        </div>

                        <div className="prose prose-sm max-w-none mb-4">
                          <p className="text-gray-700 whitespace-pre-wrap">{ticket.content}</p>
                        </div>

                        {ticket.adminNotes && (
                          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                            <h4 className="font-semibold text-blue-900 mb-2">Admin Notes</h4>
                            <p className="text-blue-800 whitespace-pre-wrap">{ticket.adminNotes}</p>
                          </div>
                        )}

                        <div className="flex justify-between text-sm text-gray-500 mt-4 pt-4 border-t">
                          <span>
                            Created:{" "}
                            {new Date(ticket.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span>
                            Updated:{" "}
                            {new Date(ticket.updatedAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketsPage;
