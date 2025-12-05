export const submitTicketInputs = (t: Function) => [
  {
    name: 'subject',
    label: t("Auth.SupportCenter.Tickets.SubmitTicket.Form.Subject.Label"),
    type: 'text',
    placeholder: t("Auth.SupportCenter.Tickets.SubmitTicket.Form.Subject.Placeholder"),
    required: true,
    double: true
  },
  {
    name: 'category',
    label: t("Auth.SupportCenter.Tickets.SubmitTicket.Form.Category.Label"),
    type: 'select',
    options: [
      t("Auth.SupportCenter.Tickets.SubmitTicket.Form.Category.Option1"),
      t("Auth.SupportCenter.Tickets.SubmitTicket.Form.Category.Option2"),
      t("Auth.SupportCenter.Tickets.SubmitTicket.Form.Category.Option3"),
    ],
    placeholder: t("Auth.SupportCenter.Tickets.SubmitTicket.Form.Category.Placeholder"),
    required: true,
  },
  {
    name: 'priority',
    label: t("Auth.SupportCenter.Tickets.SubmitTicket.Form.Priority.Label"),
    type: 'select',
    options: [
      { value: 'low ', label: t("Auth.SupportCenter.Tickets.SubmitTicket.Form.Priority.OptionLow") },
      { value: 'medium', label: t("Auth.SupportCenter.Tickets.SubmitTicket.Form.Priority.OptionMedium") },
      { value: 'high', label: t("Auth.SupportCenter.Tickets.SubmitTicket.Form.Priority.OptionHigh") },
    ],
    placeholder: t("Auth.SupportCenter.Tickets.SubmitTicket.Form.Priority.Placeholder"),
    required: true,
  },
  {
    name: 'description',
    label: t("Auth.SupportCenter.Tickets.SubmitTicket.Form.Description.Label"),
    type: 'textarea',
    placeholder: t("Auth.SupportCenter.Tickets.SubmitTicket.Form.Description.Placeholder"),
    required: true,
    fullWidth: true
  },
  {
    name: 'attachment',
    label: t("Auth.SupportCenter.Tickets.SubmitTicket.Form.Attachment.Label"),
    type: 'file',
    placeholder: t("Auth.SupportCenter.Tickets.SubmitTicket.Form.Attachment.Placeholder"),
    required: false,
    double: true
  }
]

export const ticketTableColumns = (t: Function) => [
  {
    name: 'id',
    label: t("Auth.SupportCenter.Tickets.MyTickets.Table.Column1"),
    sortable: true,
  },
  {
    name: 'name',
    label: t("Auth.SupportCenter.Tickets.MyTickets.Table.Column2"),
    sortable: true,
  },
  {
    name: 'email',
    label: t("Auth.SupportCenter.Tickets.MyTickets.Table.Column4"),
    sortable: true,
  },
  {
    name: 'username',
    label: t("Auth.SupportCenter.Tickets.MyTickets.Table.Column3"),
    sortable: true,
  },
]