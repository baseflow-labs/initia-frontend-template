# Support Center - Admin Panel Implementation

This document describes the admin panel implementation for managing support center features submitted through the user app.

## Overview

The admin support center provides a comprehensive management interface for handling user support requests, FAQs, user manuals, and contact form submissions.

## Structure

```
admin-app/src/views/auth/supportCenter/
├── index.tsx                    # Main support center management view with tabs
├── tickets/
│   ├── index.tsx               # Support tickets management
│   └── inputs.ts               # Ticket table columns and form inputs
├── contactSubmissions/
│   ├── index.tsx               # Contact form submissions management
│   └── inputs.ts               # Contact submissions table columns
├── faq/
│   ├── index.tsx               # FAQ management (CRUD operations)
│   └── inputs.ts               # FAQ table columns and form inputs
└── userManual/
    ├── index.tsx               # User manual sections management (CRUD operations)
    └── inputs.ts               # User manual table columns and form inputs
```

## Features

### 1. Support Tickets Management

**Location:** `supportCenter/tickets/`

Manages user-submitted support tickets with the following capabilities:

- **View** all support tickets
- **Update** ticket status, priority, and admin notes
- **Delete** tickets
- **Assign** tickets to support staff

**Fields:**

- Ticket ID
- Subject
- Category (Technical, Billing, Feature Request, Other)
- Priority (Low, Medium, High, Urgent)
- Status (Open, In Progress, Resolved, Closed)
- User Name & Email
- Description
- Admin Notes
- Assigned To
- Created/Updated timestamps

**API Endpoint:** `/support/tickets`

### 2. Contact Submissions Management

**Location:** `supportCenter/contactSubmissions/`

Manages contact form submissions from users:

- **View** all contact submissions
- **Delete** submissions
- Track submission status (New, Read, Responded, Archived)

**Fields:**

- Submission ID
- Name, Email, Phone
- Subject
- Message
- Status
- Submitted timestamp

**API Endpoint:** `/support/contact-submissions`

### 3. FAQ Management

**Location:** `supportCenter/faq/`

Full CRUD operations for FAQ content:

- **Create** new FAQ items
- **Read/View** all FAQs
- **Update** existing FAQs
- **Delete** FAQs
- Control publishing status

**Fields:**

- FAQ ID
- Category (Getting Started, Account & Security, Billing & Payments, Features, Troubleshooting, Other)
- Question (textarea)
- Answer (textarea)
- Display Order
- Published status (checkbox)
- Tags
- Created/Updated timestamps

**API Endpoint:** `/support/faq`

### 4. User Manual Management

**Location:** `supportCenter/userManual/`

Full CRUD operations for user manual sections:

- **Create** new manual sections
- **Read/View** all sections
- **Update** existing sections
- **Delete** sections
- Control publishing status

**Fields:**

- Section ID
- Section (Getting Started, Account Management, Core Features, Advanced Features, Troubleshooting, Best Practices)
- Subsection ID
- Title
- Content (HTML)
- Content Type (Article, Video, Tutorial)
- Display Order
- Published status
- Icon (FontAwesome)
- Video URL
- Attachments
- Created/Updated timestamps

**API Endpoint:** `/support/user-manual`

## Navigation

The support center has been added to the admin layout navigation with:

- **Route:** `/support-center-management`
- **Icon:** Headset (`faHeadset`)
- **Title:** "Support Center"

## API Integration

### Admin App API

**Location:** `admin-app/src/api/support/index.ts`

Provides all necessary API methods for managing support center data:

**Tickets:**

- `getTickets()` - Get all tickets
- `getTicketById(id)` - Get single ticket
- `updateTicket(id, data)` - Update ticket
- `deleteTicket(id)` - Delete ticket

**Contact Submissions:**

- `getContactSubmissions()` - Get all submissions
- `getContactSubmissionById(id)` - Get single submission
- `deleteContactSubmission(id)` - Delete submission

**FAQ:**

- `getFaqs()` - Get all FAQs
- `getFaqById(id)` - Get single FAQ
- `createFaq(data)` - Create new FAQ
- `updateFaq(id, data)` - Update FAQ
- `deleteFaq(id)` - Delete FAQ

**User Manual:**

- `getUserManualSections()` - Get all sections
- `getUserManualSectionById(id)` - Get single section
- `createUserManualSection(data)` - Create new section
- `updateUserManualSection(id, data)` - Update section
- `deleteUserManualSection(id)` - Delete section

### User App API

**Location:** `user-app/src/api/support/index.ts`

Provides user-facing API methods:

**Tickets:**

- `submitTicket(data)` - Submit new ticket
- `getUserTickets()` - Get user's tickets
- `getUserTicketById(id)` - Get single ticket

**Contact:**

- `submitContactForm(data)` - Submit contact form

**FAQ (Read-only):**

- `getPublishedFaqs()` - Get published FAQs

**User Manual (Read-only):**

- `getPublishedUserManual()` - Get published manual sections
- `getUserManualSection(sectionId)` - Get specific section

## User-Facing Components

The admin panel corresponds to these user app components:

1. **Support Tickets:** `user-app/src/views/auth/supportCenter/tickets/`
   - Users can submit tickets
   - View their ticket history
2. **Contact Us:** `user-app/src/views/auth/supportCenter/contact-us/`
   - Users can submit contact forms
3. **FAQ:** `user-app/src/views/auth/supportCenter/faq/`
   - Users can browse FAQ by category
   - Search functionality
4. **User Manual:** `user-app/src/views/auth/supportCenter/user-manual/`
   - Browse manual sections
   - View articles and videos

## Translation Keys

All components use i18n translation keys under the `Auth.SupportCenter.Admin` namespace:

```
Auth.SupportCenter.Admin.Title
Auth.SupportCenter.Admin.Tickets.*
Auth.SupportCenter.Admin.ContactSubmissions.*
Auth.SupportCenter.Admin.Faq.*
Auth.SupportCenter.Admin.UserManual.*
```

## Backend Requirements

The backend should implement the following endpoints:

### Tickets

- `GET /support/tickets` - List all tickets
- `GET /support/tickets/:id` - Get ticket details
- `PUT /support/tickets/:id` - Update ticket
- `DELETE /support/tickets/:id` - Delete ticket
- `POST /support/tickets` - Create ticket (user-side)
- `GET /support/tickets/my-tickets` - Get user's tickets

### Contact Submissions

- `GET /support/contact-submissions` - List all submissions
- `GET /support/contact-submissions/:id` - Get submission details
- `DELETE /support/contact-submissions/:id` - Delete submission
- `POST /support/contact` - Submit contact form (user-side)

### FAQ

- `GET /support/faq` - List all FAQs (admin)
- `GET /support/faq/published` - List published FAQs (user)
- `GET /support/faq/:id` - Get FAQ details
- `POST /support/faq` - Create FAQ
- `PUT /support/faq/:id` - Update FAQ
- `DELETE /support/faq/:id` - Delete FAQ

### User Manual

- `GET /support/user-manual` - List all sections (admin)
- `GET /support/user-manual/published` - List published sections (user)
- `GET /support/user-manual/:id` - Get section details
- `GET /support/user-manual/section/:sectionId` - Get section by subsection ID
- `POST /support/user-manual` - Create section
- `PUT /support/user-manual/:id` - Update section
- `DELETE /support/user-manual/:id` - Delete section

## Usage

1. Navigate to **Support Center Management** from the admin sidebar
2. Use the tabs to switch between different management views:
   - **Support Tickets** - Manage and respond to user tickets
   - **Contact Submissions** - Review contact form submissions
   - **FAQ Management** - Create and edit FAQ content
   - **User Manual Management** - Create and edit manual sections

3. Each view uses the standard `ApiDataTable` component for consistent CRUD operations

## Notes

- FAQ and User Manual content are managed entirely through APIs
- Content supports HTML for rich formatting
- Published/unpublished status controls visibility on user-facing pages
- All timestamps are automatically managed
- File attachments for tickets are supported
- Categories and priorities are configurable through dropdown options
