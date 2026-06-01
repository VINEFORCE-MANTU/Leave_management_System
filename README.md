# Leave Management System

Leave Management System built using ASP.NET Boilerplate (ABP) and Angular.

---

## Technologies Used

### Backend

* ASP.NET Boilerplate (ABP)
* ASP.NET Core
* Entity Framework Core
* SQL Server

### Frontend

* Angular
* Bootstrap
* PrimeNG
* ngx-bootstrap

---

## Features

### Leave Management

* Apply Leave
* Edit Leave Request
* Delete Leave Request
* View Leave List
* Leave Type Selection
* Start Date & End Date Validation
* Automatic Total Days Calculation

### Leave Status Management

* Pending Status (Default)
* Approve Leave Request
* Reject Leave Request
* Separate Status Update Module
* Status-Based Edit Restrictions

### Validations

* Employee Name Required
* Leave Type Required
* Start Date Required
* End Date Required
* End Date Cannot Be Earlier Than Start Date
* Only Pending Leave Requests Can Be Edited
* Status Cannot Be Updated Multiple Times

---

## Project Structure

### Backend

UserCrud.Core

* Leave Entity
* LeaveType Enum
* Status Enum

UserCrud.Application

* Leave Application Service
* Leave DTOs
* Leave Status DTO

### Frontend

src/app/leave

* leave.component
* create.component
* edit.component
* status.component

---

## Prerequisites

Install the following before running the project:

* Visual Studio 2022
* .NET SDK
* Node.js
* Angular CLI
* SQL Server
* Git

---

# Start Project

## Step 1: Clone Repository

```bash
git clone https://github.com/VINEFORCE-MANTU/Leave_Management_System.git
```

## Step 2: Open Backend Project

Open the solution file in Visual Studio:

```text
UserCrud.sln
```

## Step 3: Configure Database

Open:

```text
appsettings.json
```

Update the connection string:

```json
"Default": "Server=.;Database=LeaveManagementDb;Trusted_Connection=True;TrustServerCertificate=True;"
```

## Step 4: Run Database Migration

Open Package Manager Console:

```powershell
Update-Database
```

## Step 5: Run Backend

Press:

```text
F5
```

Backend will run on:

```text
https://localhost:44311
```

---

# Frontend Setup

## Step 1: Open Angular Folder

```bash
cd angular
```

## Step 2: Install Dependencies

```bash
npm install --force
```

## Step 3: Start Angular Application

```bash
npm start
```

OR

```bash
ng serve
```

Frontend will run on:

```text
http://localhost:4200
```

---

## Leave Workflow

Employee
↓
Apply Leave
↓
Status = Pending
↓
Admin Reviews Request
↓
Approve / Reject
↓
Status Updated

---

## Author

Developed using ASP.NET Boilerplate (ABP), Angular, PrimeNG, and SQL Server.
