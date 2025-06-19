const connection = require('../../Config/Database');
const userModel = require('../../Models/User_Model');
const OrganizationModal = require('../../Models/Organization_Model');
const Job = require('../../Models/JobModel');
const Candidate = require('../../Models/Candidate');
const Comment = require('../../Models/Comment');
const bcrypt = require('bcrypt');

async function createSampleData() {
    await connection();
    
    console.log('Creating sample data...');

    // Create organization data
    const organizationData = {
        username: 'testuser',
        organization_name: 'TechCorp Solutions',
        phoneNo: 1234567890,
        website: 'https://techcorp-solutions.com',
        logo: 'https://via.placeholder.com/150x150/007bff/ffffff?text=TC',
        departments: ['IT', 'HR', 'Marketing', 'Finance', 'Operations'],
        office_address: '123 Business Park, Suite 456',
        office_city: 'New York',
        office_country: 'USA',
        fb_url: 'https://facebook.com/techcorp',
        linkedIn_url: 'https://linkedin.com/company/techcorp',
        insta_url: 'https://instagram.com/techcorp',
        yt_url: 'https://youtube.com/techcorp',
        team_members: [
            {
                name: 'John Smith',
                email: 'john.smith@techcorp.com',
                role: 'HR Manager'
            },
            {
                name: 'Sarah Johnson',
                email: 'sarah.johnson@techcorp.com',
                role: 'IT Director'
            },
            {
                name: 'Mike Davis',
                email: 'mike.davis@techcorp.com',
                role: 'Marketing Lead'
            }
        ]
    };

    // Check if organization exists
    let existingOrg = await OrganizationModal.findOne({ username: organizationData.username });
    if (!existingOrg) {
        existingOrg = await OrganizationModal.create(organizationData);
        console.log('Organization created successfully!');
    } else {
        console.log('Organization already exists.');
    }

    // Update test user to link with organization
    const testUser = await userModel.findOne({ email: 'testuser@example.com' });
    if (testUser) {
        testUser.org_registered = true;
        testUser.org_id = existingOrg._id.toString();
        await testUser.save();
        console.log('Test user linked to organization successfully!');
    } else {
        console.log('Test user not found!');
    }

    // Create sample jobs
    const sampleJobs = [
        {
            jobPosition: 'Senior Software Engineer',
            officeLocation: 'New York Office',
            department: 'IT',
            jobType: 'Full Time',
            numberOfSeats: 2,
            salaryRangeFrom: 80000,
            salaryRangeUpto: 120000,
            job_description: 'We are looking for a Senior Software Engineer to join our dynamic team. The ideal candidate will have 5+ years of experience in full-stack development, strong problem-solving skills, and experience with modern technologies like React, Node.js, and cloud platforms.',
            city: 'New York',
            country: 'USA',
            org_name: 'TechCorp Solutions',
            org_id: existingOrg._id.toString(),
            applicants_no: 8,
            job_status: 'Active',
            report_status: {
                applied: 8,
                hired: 1,
                rejected: 2,
                withdrawn: 1
            },
            report_experience: {
                nill: 1,
                oneyear: 2,
                two_to_three: 3,
                four_to_five: 1,
                five_plus: 1
            },
            report_educational_level: ['BS', 'MS', 'BS', 'MS', 'BS', 'MS', 'BS', 'BS'],
            report_city: ['New York', 'Boston', 'Chicago', 'Los Angeles', 'Seattle', 'Austin', 'Denver', 'Miami'],
            report_university: ['MIT', 'Stanford', 'Harvard', 'UC Berkeley', 'CMU', 'Georgia Tech', 'UIUC', 'UT Austin'],
            report_male_vs_female: {
                male: 5,
                female: 3
            }
        },
        {
            jobPosition: 'HR Specialist',
            officeLocation: 'New York Office',
            department: 'HR',
            jobType: 'Full Time',
            numberOfSeats: 1,
            salaryRangeFrom: 50000,
            salaryRangeUpto: 70000,
            job_description: 'We are seeking an experienced HR Specialist to manage recruitment, employee relations, and HR operations. The ideal candidate will have 3+ years of HR experience, excellent communication skills, and knowledge of HR best practices.',
            city: 'New York',
            country: 'USA',
            org_name: 'TechCorp Solutions',
            org_id: existingOrg._id.toString(),
            applicants_no: 5,
            job_status: 'Active',
            report_status: {
                applied: 5,
                hired: 0,
                rejected: 1,
                withdrawn: 0
            },
            report_experience: {
                nill: 0,
                oneyear: 2,
                two_to_three: 2,
                four_to_five: 1,
                five_plus: 0
            },
            report_educational_level: ['BS', 'MS', 'BS', 'BS', 'MS'],
            report_city: ['New York', 'Boston', 'Chicago', 'Philadelphia', 'Washington DC'],
            report_university: ['NYU', 'Boston University', 'Northwestern', 'UPenn', 'Georgetown'],
            report_male_vs_female: {
                male: 2,
                female: 3
            }
        },
        {
            jobPosition: 'Marketing Manager',
            officeLocation: 'New York Office',
            department: 'Marketing',
            jobType: 'Full Time',
            numberOfSeats: 1,
            salaryRangeFrom: 60000,
            salaryRangeUpto: 90000,
            job_description: 'We are looking for a creative Marketing Manager to develop and execute marketing strategies. The ideal candidate will have 4+ years of marketing experience, strong analytical skills, and experience with digital marketing tools.',
            city: 'New York',
            country: 'USA',
            org_name: 'TechCorp Solutions',
            org_id: existingOrg._id.toString(),
            applicants_no: 6,
            job_status: 'Active',
            report_status: {
                applied: 6,
                hired: 1,
                rejected: 2,
                withdrawn: 1
            },
            report_experience: {
                nill: 0,
                oneyear: 1,
                two_to_three: 2,
                four_to_five: 2,
                five_plus: 1
            },
            report_educational_level: ['BS', 'MS', 'BS', 'MS', 'BS', 'MS'],
            report_city: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco', 'Boston'],
            report_university: ['NYU', 'UCLA', 'Northwestern', 'University of Miami', 'UC Berkeley', 'Boston University'],
            report_male_vs_female: {
                male: 3,
                female: 3
            }
        }
    ];

    const createdJobs = [];
    for (const jobData of sampleJobs) {
        const existingJob = await Job.findOne({ 
            jobPosition: jobData.jobPosition, 
            org_id: jobData.org_id 
        });
        
        if (!existingJob) {
            const job = await Job.create(jobData);
            createdJobs.push(job);
            console.log(`Job "${jobData.jobPosition}" created successfully!`);
        } else {
            createdJobs.push(existingJob);
            console.log(`Job "${jobData.jobPosition}" already exists.`);
        }
    }

    // Create sample candidates
    const sampleCandidates = [
        // Software Engineer candidates
        {
            firstName: 'Alex',
            lastName: 'Chen',
            dob: '15/03/1990',
            gender: 'Male',
            address: '456 Tech Street, Apt 789',
            city: 'New York',
            zipCode: 10001,
            institute: ['MIT'],
            level: ['MS'],
            majors: ['Computer Science'],
            session: [{ from: '2018', to: '2020' }],
            title: ['Software Engineer'],
            duration: [3],
            companyName: ['Google'],
            emailAddress: ['alex.chen@email.com'],
            phoneNo: 1234567890,
            linkedinProfile: 'https://linkedin.com/in/alexchen',
            gitHubProfile: 'https://github.com/alexchen',
            profilePic: 'https://via.placeholder.com/150x150/28a745/ffffff?text=AC',
            ResumeURL: 'https://via.placeholder.com/800x1000/007bff/ffffff?text=Resume',
            jobID: createdJobs[0]._id.toString(),
            orgID: existingOrg._id.toString(),
            recruitmentCycle: 'Applied'
        },
        {
            firstName: 'Emily',
            lastName: 'Rodriguez',
            dob: '22/07/1988',
            gender: 'Female',
            address: '789 Innovation Ave, Suite 101',
            city: 'Boston',
            zipCode: 02101,
            institute: ['Stanford'],
            level: ['MS'],
            majors: ['Software Engineering'],
            session: [{ from: '2016', to: '2018' }],
            title: ['Senior Developer'],
            duration: [5],
            companyName: ['Microsoft'],
            emailAddress: ['emily.rodriguez@email.com'],
            phoneNo: 2345678901,
            linkedinProfile: 'https://linkedin.com/in/emilyrodriguez',
            gitHubProfile: 'https://github.com/emilyrodriguez',
            profilePic: 'https://via.placeholder.com/150x150/dc3545/ffffff?text=ER',
            ResumeURL: 'https://via.placeholder.com/800x1000/007bff/ffffff?text=Resume',
            jobID: createdJobs[0]._id.toString(),
            orgID: existingOrg._id.toString(),
            recruitmentCycle: 'Interviewing'
        },
        {
            firstName: 'David',
            lastName: 'Kim',
            dob: '10/11/1992',
            gender: 'Male',
            address: '321 Startup Blvd, Apt 456',
            city: 'Chicago',
            zipCode: 60601,
            institute: ['Harvard'],
            level: ['BS'],
            majors: ['Computer Science'],
            session: [{ from: '2014', to: '2018' }],
            title: ['Full Stack Developer'],
            duration: [4],
            companyName: ['Amazon'],
            emailAddress: ['david.kim@email.com'],
            phoneNo: 3456789012,
            linkedinProfile: 'https://linkedin.com/in/davidkim',
            gitHubProfile: 'https://github.com/davidkim',
            profilePic: 'https://via.placeholder.com/150x150/ffc107/ffffff?text=DK',
            ResumeURL: 'https://via.placeholder.com/800x1000/007bff/ffffff?text=Resume',
            jobID: createdJobs[0]._id.toString(),
            orgID: existingOrg._id.toString(),
            recruitmentCycle: 'Reccomended'
        },
        {
            firstName: 'Sarah',
            lastName: 'Johnson',
            dob: '05/12/1985',
            gender: 'Female',
            address: '654 Corporate Drive, Suite 200',
            city: 'Los Angeles',
            zipCode: 90001,
            institute: ['UC Berkeley'],
            level: ['MS'],
            majors: ['Computer Science'],
            session: [{ from: '2017', to: '2019' }],
            title: ['Lead Developer'],
            duration: [6],
            companyName: ['Apple'],
            emailAddress: ['sarah.johnson@email.com'],
            phoneNo: 4567890123,
            linkedinProfile: 'https://linkedin.com/in/sarahjohnson',
            gitHubProfile: 'https://github.com/sarahjohnson',
            profilePic: 'https://via.placeholder.com/150x150/17a2b8/ffffff?text=SJ',
            ResumeURL: 'https://via.placeholder.com/800x1000/007bff/ffffff?text=Resume',
            jobID: createdJobs[0]._id.toString(),
            orgID: existingOrg._id.toString(),
            recruitmentCycle: 'Hired'
        },
        // HR Specialist candidates
        {
            firstName: 'Michael',
            lastName: 'Brown',
            dob: '18/09/1987',
            gender: 'Male',
            address: '987 HR Street, Apt 123',
            city: 'New York',
            zipCode: 10002,
            institute: ['NYU'],
            level: ['BS'],
            majors: ['Human Resources'],
            session: [{ from: '2015', to: '2019' }],
            title: ['HR Coordinator'],
            duration: [3],
            companyName: ['IBM'],
            emailAddress: ['michael.brown@email.com'],
            phoneNo: 5678901234,
            linkedinProfile: 'https://linkedin.com/in/michaelbrown',
            gitHubProfile: 'https://github.com/michaelbrown',
            profilePic: 'https://via.placeholder.com/150x150/6f42c1/ffffff?text=MB',
            ResumeURL: 'https://via.placeholder.com/800x1000/007bff/ffffff?text=Resume',
            jobID: createdJobs[1]._id.toString(),
            orgID: existingOrg._id.toString(),
            recruitmentCycle: 'Applied'
        },
        {
            firstName: 'Lisa',
            lastName: 'Wang',
            dob: '25/04/1990',
            gender: 'Female',
            address: '456 Talent Ave, Suite 789',
            city: 'Boston',
            zipCode: 02102,
            institute: ['Boston University'],
            level: ['MS'],
            majors: ['Organizational Psychology'],
            session: [{ from: '2018', to: '2020' }],
            title: ['HR Specialist'],
            duration: [2],
            companyName: ['Deloitte'],
            emailAddress: ['lisa.wang@email.com'],
            phoneNo: 6789012345,
            linkedinProfile: 'https://linkedin.com/in/lisawang',
            gitHubProfile: 'https://github.com/lisawang',
            profilePic: 'https://via.placeholder.com/150x150/e83e8c/ffffff?text=LW',
            ResumeURL: 'https://via.placeholder.com/800x1000/007bff/ffffff?text=Resume',
            jobID: createdJobs[1]._id.toString(),
            orgID: existingOrg._id.toString(),
            recruitmentCycle: 'Interviewing'
        },
        // Marketing Manager candidates
        {
            firstName: 'Jessica',
            lastName: 'Taylor',
            dob: '12/06/1989',
            gender: 'Female',
            address: '789 Marketing Way, Apt 456',
            city: 'New York',
            zipCode: 10003,
            institute: ['NYU'],
            level: ['MS'],
            majors: ['Marketing'],
            session: [{ from: '2017', to: '2019' }],
            title: ['Marketing Specialist'],
            duration: [4],
            companyName: ['Nike'],
            emailAddress: ['jessica.taylor@email.com'],
            phoneNo: 7890123456,
            linkedinProfile: 'https://linkedin.com/in/jessicataylor',
            gitHubProfile: 'https://github.com/jessicataylor',
            profilePic: 'https://via.placeholder.com/150x150/fd7e14/ffffff?text=JT',
            ResumeURL: 'https://via.placeholder.com/800x1000/007bff/ffffff?text=Resume',
            jobID: createdJobs[2]._id.toString(),
            orgID: existingOrg._id.toString(),
            recruitmentCycle: 'Applied'
        },
        {
            firstName: 'Robert',
            lastName: 'Garcia',
            dob: '30/01/1986',
            gender: 'Male',
            address: '321 Brand Street, Suite 101',
            city: 'Los Angeles',
            zipCode: 90002,
            institute: ['UCLA'],
            level: ['BS'],
            majors: ['Business Administration'],
            session: [{ from: '2014', to: '2018' }],
            title: ['Marketing Manager'],
            duration: [5],
            companyName: ['Coca-Cola'],
            emailAddress: ['robert.garcia@email.com'],
            phoneNo: 8901234567,
            linkedinProfile: 'https://linkedin.com/in/robertgarcia',
            gitHubProfile: 'https://github.com/robertgarcia',
            profilePic: 'https://via.placeholder.com/150x150/20c997/ffffff?text=RG',
            ResumeURL: 'https://via.placeholder.com/800x1000/007bff/ffffff?text=Resume',
            jobID: createdJobs[2]._id.toString(),
            orgID: existingOrg._id.toString(),
            recruitmentCycle: 'Hired'
        }
    ];

    const createdCandidates = [];
    for (const candidateData of sampleCandidates) {
        const existingCandidate = await Candidate.findOne({
            emailAddress: candidateData.emailAddress[0],
            jobID: candidateData.jobID
        });
        
        if (!existingCandidate) {
            const candidate = await Candidate.create(candidateData);
            createdCandidates.push(candidate);
            console.log(`Candidate "${candidateData.firstName} ${candidateData.lastName}" created successfully!`);
        } else {
            createdCandidates.push(existingCandidate);
            console.log(`Candidate "${candidateData.firstName} ${candidateData.lastName}" already exists.`);
        }
    }

    // Create sample comments for candidates
    const sampleComments = [
        {
            CandidateID: createdCandidates[1]._id.toString(), // Emily Rodriguez
            Interviewing: 'Strong technical skills, excellent communication. Scheduled for technical interview.',
            Initialized: true
        },
        {
            CandidateID: createdCandidates[2]._id.toString(), // David Kim
            Reccomended: 'Outstanding candidate with relevant experience. Highly recommended for the position.',
            Initialized: true
        },
        {
            CandidateID: createdCandidates[3]._id.toString(), // Sarah Johnson
            Hired: 'Excellent candidate with perfect fit for the role. Offer extended and accepted.',
            Initialized: true
        },
        {
            CandidateID: createdCandidates[5]._id.toString(), // Lisa Wang
            Interviewing: 'Good HR background, scheduled for behavioral interview.',
            Initialized: true
        },
        {
            CandidateID: createdCandidates[7]._id.toString(), // Robert Garcia
            Hired: 'Strong marketing experience and leadership skills. Perfect fit for the team.',
            Initialized: true
        }
    ];

    for (const commentData of sampleComments) {
        const existingComment = await Comment.findOne({ CandidateID: commentData.CandidateID });
        
        if (!existingComment) {
            await Comment.create(commentData);
            console.log(`Comment created for candidate ${commentData.CandidateID}`);
        } else {
            console.log(`Comment already exists for candidate ${commentData.CandidateID}`);
        }
    }

    console.log('\n✅ Sample data creation completed successfully!');
    console.log(`📊 Created/Found:`);
    console.log(`   - 1 Organization`);
    console.log(`   - ${createdJobs.length} Jobs`);
    console.log(`   - ${createdCandidates.length} Candidates`);
    console.log(`   - ${sampleComments.length} Comments`);
    
    process.exit(0);
}

createSampleData().catch(e => {
    console.error('Error creating sample data:', e);
    process.exit(1);
});
