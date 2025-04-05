ROOM ASSESSMENT SOP (POD MANRURA) -- COMPREHENSIVE
VERSION
1. INTRODUCTION
This Standard Operating Procedure (SOP) outlines the workflow and roles within a self-assessment and
external evaluation system for room assessment. The system is designed to ensure active participation by
various units, maintain objectivity, and promote transparency via a web-based digital dashboard. The
assessment process is tied to specific assessment events with defined time periods.
2. OBJECTIVES
Standardize the room assessment process.
Ensure the validity and objectivity of the final evaluation results.
Provide role-based access control.
Integrate account and data management features.
Schedule assessments through defined assessment events.
3. SCOPE
This SOP applies to all rooms/units under assessment and to all users (Admin, Room Representative, and
Evaluator) accessing the system via a web browser. All assessments must be conducted within the
timeframe of an active assessment event.
4. DEFINITIONS
Admin: The system manager responsible for user accounts, evaluation items, assessment events, and
assignment operations.
Room Representative: A designated user from each room responsible for completing the self-
assessment.
Evaluator: An external assessor who provides the final evaluation score.
Unit: A major installation or division (e.g., Outpatient Department).
Room: A sub-unit within a Unit (e.g., Surgical Clinic).
Assessment Event: A scheduled period during which assessment activities can be performed,
defined by start and end dates.
5. PROCEDURE
5.1 ACCOUNT MANAGEMENT & ROOM ASSIGNMENT
Room data must be entered by the Admin before creating a Room Representative account,
including mandatory details:
Unit Name
Room Name
The Admin is solely responsible for:
Adding, editing, and deleting Room Representative and Evaluator accounts.
Assigning evaluators to specific rooms via the Assignment menu.
Managing, resetting, or sending initial passwords.
Creating and managing assessment events.
Each user receives an initial username and password provided by the Admin, and users can change
their passwords through the account settings.
All account-related activities are logged for auditing purposes.
5.2 ASSESSMENT EVENT MANAGEMENT
Admin creates assessment events with the following details:
Event name
Description
Start date and time
End date and time
Status (Draft, Active, Completed, Archived)
Room Representatives and Evaluators can only perform assessment activities during an active
assessment event.
Multiple assessment events can exist in the system, but rooms and evaluators can only access and
work on active events.
The Admin can activate, deactivate, or archive assessment events as needed.
Historical assessment data is preserved and can be viewed for completed events.
5.3 MANAGEMENT OF EVALUATION ITEMS
Evaluation items can be added individually or via an Excel file upload.
Each item includes: Standard, Evaluation Element, EP Title, Number, Sub-point, Maximum Weight, and
an evidence column.
Evidence can be provided by:
File upload (PDF or image)
Link upload (external URL)
The Admin can configure the evidence input mode to allow:
Link uploads only,
File uploads only,
Or both.
Evaluation items can be linked to specific assessment events or used across multiple events.
5.4 SELF-ASSESSMENT BY THE ROOM
The Room Representative can only perform self-assessments during active assessment events.
The Room Representative enters scores (0, 5, or 10) and uploads supporting evidence based on the
mode set by the Admin.
Upon clicking the Save button (or equivalent), the self-assessment data becomes immediately
available to the assigned Evaluator.
The assessment status is updated and displayed on both the Admin and Evaluator dashboards.
The Room Representative can only view the final evaluation provided by the Evaluator and cannot
modify external assessment data.
The system prevents self-assessment activities outside the timeframe of active assessment events.
5.5 EXTERNAL EVALUATION BY THE EVALUATOR
The Evaluator only accesses rooms that have been assigned and only during active assessment
events.
The Evaluator provides a final score based on the evidence and the self-assessment inputs.
The Evaluator may temporarily save evaluation results without locking the data.
Once all assessments are complete, the Evaluator clicks the Final Validation button to change the
room's status to Assessment Completed on the dashboard.
The system prevents evaluation activities outside the timeframe of active assessment events.
5.6 DASHBOARD & REPORTING
Room Dashboard: Displays data, graphs, and assessment statuses for each room, filtered by
assessment event.
Evaluator Dashboard: Shows all assigned rooms, trend graphs, and includes the ability to edit
external evaluation scores for active events.
Admin Dashboard: Provides an overview of all assessment events, completion rates, and system
metrics.
Reporting: Complete reports can be downloaded, including a comparison of self-assessment versus
external evaluation scores, discrepancies, recommendations, and change logs, filtered by assessment
event.
5.7 ASSIGNING EVALUATORS PER STANDARD
Through the Assignment menu, the Admin designates evaluators for each evaluation standard per
room within a specific assessment event.
A single room may have multiple evaluation standards, each assigned to a different evaluator.
Assignment notifications appear on:
Room Dashboard: Showing the evaluator's name and the standard to be assessed.
Evaluator Dashboard: Listing the rooms and standards that need evaluation.
Assignments are dynamic and can be updated by the Admin as needed within active assessment
events.
6. RESPONSIBILITIES
7. DATA SECURITY
All data is centrally stored and backed up.
Passwords are not visible to the Admin.
Password resets can only be performed by the Admin using a predetermined mechanism.
All assessment data is linked to specific assessment events for proper data segregation and historical
tracking.
8. MONITORING & REVISION
Room assessments are periodically evaluated to ensure quality and consistency.
This SOP is regularly revised to accommodate changes in system requirements or organizational
policies.
Assessment events are monitored for completion rates and timeline adherence.
9. USER FLOW DIAGRAMS
9.1 ASSESSMENT EVENT CREATION FLOW
1. Admin creates a new assessment event including:
Event name
Description
Start date and time
End date and time
Status (initially set to "Draft")
2. Admin reviews event details and sets status to "Active" when ready to begin assessments
3. System notifies all Room Representatives and assigned Evaluators about the active event
4. Room Representatives and Evaluators can now perform their assessment activities
5. Admin changes event status to "Completed" after the end date has passed
6. System locks all assessment data for that event and finalizes reports
9.2 ROOM CREATION FLOW
1. Admin enters room data including:
Unit (e.g., Outpatient Department)
Room (e.g., Surgical Clinic)
2. Admin creates the Room Representative account based on the room data.
3. The system sends an initial username and password to the Room Representative.
4. Room Representative logs in and changes the password via the account settings.
5. Room Representative begins the self-assessment process during active assessment events.
10. DATABASE SCHEMA
10.1 Core Entities
Users
id (PK)
username
password_hash
email
full_name
role (admin, user_room, evaluator)
created_at
updated_at
last_login
is_active
Units
id (PK)
name
description
created_at
updated_at
Rooms
id (PK)
unit_id (FK -> Units.id)
name
description
created_at
updated_at
User_Rooms
id (PK)
user_id (FK -> Users.id)
room_id (FK -> Rooms.id)
created_at
updated_at
Assessment_Events
id (PK)
name
description
start_date
end_date
status (draft, active, completed, archived)
created_by (FK -> Users.id)
created_at
updated_at
Standards
id (PK)
code
name
description
created_at
updated_at
Assessment_Items
id (PK)
standard_id (FK -> Standards.id)
evaluation_element
ep_title
number
sub_point
max_weight
evidence_type (file, link, both)
created_at
updated_at
Assignments
id (PK)
assessment_event_id (FK -> Assessment_Events.id)
room_id (FK -> Rooms.id)
standard_id (FK -> Standards.id)
evaluator_id (FK -> Users.id)
created_at
updated_at
Room_Assessments
id (PK)
assessment_event_id (FK -> Assessment_Events.id)
room_id (FK -> Rooms.id)
assessment_item_id (FK -> Assessment_Items.id)
self_assessment_score
self_assessment_evidence_url
self_assessment_evidence_file_path
self_assessment_completed_at
self_assessment_completed_by (FK -> Users.id)
evaluation_score
evaluation_notes
evaluation_completed_at
evaluation_completed_by (FK -> Users.id)
created_at
updated_at
Activity_Logs
id (PK)
user_id (FK -> Users.id)
activity_type
description
ip_address
user_agent
created_at
11. SYSTEM DEVELOPMENT ARCHITECTURE
11.1 Recommended Technology Stack
Frontend Web:
Next.js as the React framework for building dynamic, server-side rendered web applications.
Tailwind CSS for responsive design and styling.
Backend API:
Node.js (e.g., using Express.js) for business logic and RESTful API handling.
Database:
PostgreSQL as a robust and scalable relational database.
Authentication & Cloud Storage:
Configured mechanisms for secure authentication and file uploads (supporting evidence
uploads).
11.2 Web-Based Development
The entire application is accessible via a web browser, simplifying deployment and maintenance
without the need for a separate mobile app.
Management and monitoring are conducted in real time through a web-based dashboard.
12. API ENDPOINTS
12.1 Assessment Event Management
12.2 Assessment Item Management
12.3 Evaluator Assignment Management
12.4 Room Assessment
12.5 Activity Logs
12.6 Dashboard
13. UI SCREENS AND COMPONENTS
13.1 Admin Interface
Dashboard
Overview of active assessment events
Room assessment completion status
Recent activity log
Quick action buttons
Assessment Event Management
List of all assessment events with status indicators
Create/Edit assessment event form
Event activation controls
Event details view with progress metrics
User Management
List of all users with roles
Create/Edit user form
Password reset functionality
User activity log
Room Management
List of all units and rooms
Create/Edit unit/room form
Room assignment status
Room assessment reports
Evaluator Assignment
Matrix view of evaluators and rooms by standard
Assignment form with event selection
Bulk assignment functionality
Assignment status tracking
Reporting
Event-based report generation
Comparison reports (self vs external)
Export functionality (PDF, Excel)
Historical data comparison
13.2 Room Representative Interface
Dashboard
Active assessment events
Self-assessment completion status
Assigned evaluators
Upcoming deadlines
Self-Assessment
List of assessment items by standard
Score input form with evidence upload
Save progress functionality
Submission confirmation
Reports
View final evaluation scores
Review historical assessments
Download assessment reports
13.3 Evaluator Interface
Dashboard
Active assessment events
Assigned rooms overview
Evaluation completion status
Upcoming deadlines
Evaluate Rooms
List of assigned rooms by standard
Room selection interface
Review self-assessment data and evidence
Score input form with notes
Final validation button
Reports
Evaluation summary by room
Standard-based comparison
Download evaluation reports
14. DETAILED UI COMPONENTS
14.1 Common Components
Navigation sidebar with role-based menu items
Header with user info and logout button
Notification center
Modal dialogs for confirmations
File upload components with preview
Data tables with filtering and sorting
Form components with validation
Status indicators and badges
Progress tracking components
Date pickers for event scheduling
14.2 Dashboard Components
Status cards with key metrics
Progress charts (bar, line, radar)
Calendar view for assessment events
Activity timeline
Completion percentage gauges
Standard-based score comparison charts
15. APPLICATION ARCHITECTURE DETAILS
15.1 Client-Side Architecture
Component-based structure following React best practices
Global state management for user session and preferences
API service layer for data fetching
Form handling with validation
Route guards for role-based access control
Error handling and feedback mechanisms
Responsive design for various screen sizes
15.2 Server-Side Architecture
RESTful API design
Middleware for authentication and authorization
Database access layer with ORM
Business logic services
File storage service for evidence uploads
Event-driven notifications
Data validation and sanitization
Logging and monitoring
16. DEPLOYMENT CONSIDERATIONS
Environment configuration
Database migrations
Static asset handling
Backup and recovery procedures
Performance monitoring
Security hardening
User training materials