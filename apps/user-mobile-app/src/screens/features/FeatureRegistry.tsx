import { ReactNode } from "react";

import {
  DashboardConnectedView,
  MessagingConnectedView,
  NotificationsConnectedView,
  ProfileConnectedView,
  SettingsConnectedView,
} from "./ConnectedFeatureViews";
import ListLikeView from "./ListLikeView";
import {
  SupportContactView,
  SupportFaqView,
  SupportManualView,
  SupportTicketsView,
} from "./SupportCenterViews";

export const FEATURE_VIEW_BY_KEY: Record<string, ReactNode> = {
  dashboard: <DashboardConnectedView />,
  profile: <ProfileConnectedView />,
  messaging: <MessagingConnectedView />,
  notifications: <NotificationsConnectedView />,
  settings: <SettingsConnectedView />,
  "support-center": (
    <ListLikeView title="Support Center" lines={["FAQ", "Contact Us", "Tickets", "User Manual"]} />
  ),
  "support-center-faq": <SupportFaqView />,
  "support-center-contact-us": <SupportContactView />,
  "support-center-tickets": <SupportTicketsView />,
  "support-center-user-manual": <SupportManualView />,
  "template-examples-data-view": (
    <ListLikeView title="Data View" lines={["Cards", "Filters", "Summaries"]} />
  ),
  "template-examples-data-table": (
    <ListLikeView title="Data Table" lines={["Rows", "Sorting", "Pagination"]} />
  ),
  "template-examples-data-table-new": (
    <ListLikeView title="Data Table Record" lines={["Create", "Update", "Validation"]} />
  ),
  "template-examples-data-table-id": (
    <ListLikeView title="Data Table Record" lines={["Record Detail", "Edit"]} />
  ),
  "template-examples-forms": (
    <ListLikeView title="Forms" lines={["Input Controls", "Validation", "Submission"]} />
  ),
};
