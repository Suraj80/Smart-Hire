# Sample Data for Smart Cruiter Application

This document describes the sample data that has been created for testing the Smart Cruiter application.

## 🚀 Quick Start

To create sample data, run:
```bash
npm run create-sample-data
```

Or directly:
```bash
node Controllers/UserController/CreateSampleData.js
```

## 📊 Sample Data Overview

### 1. Organization
- **Name**: TechCorp Solutions
- **Username**: testuser
- **Location**: New York, USA
- **Departments**: IT, HR, Marketing, Finance, Operations
- **Team Members**: 3 members (HR Manager, IT Director, Marketing Lead)

### 2. Jobs (3 Active Positions)

#### Senior Software Engineer
- **Department**: IT
- **Salary Range**: $80,000 - $120,000
- **Seats**: 2
- **Status**: Active
- **Applicants**: 8 candidates
- **Recruitment Status**:
  - Applied: 8
  - Interviewing: 1
  - Recommended: 1
  - Hired: 1
  - Rejected: 2
  - Withdrawn: 1

#### HR Specialistgit
- **Department**: HR
- **Salary Range**: $50,000 - $70,000
- **Seats**: 1
- **Status**: Active
- **Applicants**: 5 candidates
- **Recruitment Status**:
  - Applied: 5
  - Interviewing: 1
  - Rejected: 1

#### Marketing Manager
- **Department**: Marketing
- **Salary Range**: $60,000 - $90,000
- **Seats**: 1
- **Status**: Active
- **Applicants**: 6 candidates
- **Recruitment Status**:
  - Applied: 6
  - Hired: 1
  - Rejected: 2
  - Withdrawn: 1

### 3. Candidates (8 Total)

#### Software Engineer Candidates
1. **Alex Chen** - Applied
   - Education: MS Computer Science (MIT)
   - Experience: 3 years at Google
   - Location: New York

2. **Emily Rodriguez** - Interviewing
   - Education: MS Software Engineering (Stanford)
   - Experience: 5 years at Microsoft
   - Location: Boston
   - **Comment**: "Strong technical skills, excellent communication. Scheduled for technical interview."

3. **David Kim** - Recommended
   - Education: BS Computer Science (Harvard)
   - Experience: 4 years at Amazon
   - Location: Chicago
   - **Comment**: "Outstanding candidate with relevant experience. Highly recommended for the position."

4. **Sarah Johnson** - Hired
   - Education: MS Computer Science (UC Berkeley)
   - Experience: 6 years at Apple
   - Location: Los Angeles
   - **Comment**: "Excellent candidate with perfect fit for the role. Offer extended and accepted."

#### HR Specialist Candidates
5. **Michael Brown** - Applied
   - Education: BS Human Resources (NYU)
   - Experience: 3 years at IBM
   - Location: New York

6. **Lisa Wang** - Interviewing
   - Education: MS Organizational Psychology (Boston University)
   - Experience: 2 years at Deloitte
   - Location: Boston
   - **Comment**: "Good HR background, scheduled for behavioral interview."

#### Marketing Manager Candidates
7. **Jessica Taylor** - Applied
   - Education: MS Marketing (NYU)
   - Experience: 4 years at Nike
   - Location: New York

8. **Robert Garcia** - Hired
   - Education: BS Business Administration (UCLA)
   - Experience: 5 years at Coca-Cola
   - Location: Los Angeles
   - **Comment**: "Strong marketing experience and leadership skills. Perfect fit for the team."

### 4. Comments
- 5 candidates have comments in different recruitment stages
- Comments provide context for candidate evaluation and next steps

## 🔧 Test User Credentials

Use these credentials to login and test the application:

### Test User 1:
- **Email**: `testuser@example.com`
- **Password**: `TestPassword123`

### Test User 2:
- **Email**: `testuser2@example.com`
- **Password**: `TestPassword456`

## 📈 Analytics Data

The sample data includes comprehensive analytics information:
- **Experience Distribution**: From no experience to 5+ years
- **Educational Levels**: BS, MS degrees from top universities
- **Geographic Distribution**: Multiple cities across the US
- **Gender Distribution**: Balanced male/female representation
- **University Data**: Top-tier universities represented

## 🎯 Testing Scenarios

With this sample data, you can test:

1. **Job Management**
   - View all posted jobs
   - See job details and statistics
   - Filter jobs by department

2. **Candidate Management**
   - View candidates in different recruitment stages
   - Filter candidates by status
   - Add comments and feedback

3. **Recruitment Cycle**
   - Move candidates between stages
   - Schedule interviews
   - Send emails to candidates
   - Generate reports

4. **Analytics & Reports**
   - View recruitment statistics
   - Analyze candidate demographics
   - Track hiring metrics

5. **Organization Settings**
   - View organization profile
   - Manage team members
   - Update company information

## 🔄 Recreating Sample Data

If you need to recreate the sample data:
1. Delete existing data from your database
2. Run `npm run create-sample-data`
3. The script will create fresh sample data

## 📝 Notes

- All candidates have placeholder profile pictures and resumes
- Email addresses are fictional and for testing purposes only
- The data represents a realistic recruitment scenario
- Comments provide context for testing the feedback system 