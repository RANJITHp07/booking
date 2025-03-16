export const users = [
    {
        name: 'Malavika',
        email: "malavika@gmail.com",
        phone: '817074398656',
        age: 20,
        ABC: '817074398656',
        class: '6MBA KE HR',
        password: '1234',
        route: '/profile',
        role: 'student',
        qualifications: [
            {
                degree: "Secondary School (10th Grade)",
                institution: "ABC High School",
                yearOfPassing: 2018,
                grade: "A",
            },
            {
                degree: "Higher Secondary (Plus Two)",
                institution: "XYZ Higher Secondary School",
                yearOfPassing: 2020,
                stream: "Commerce",
                grade: "A+",
            },
            {
                degree: "Bachelor of Business Administration (BBA)",
                institution: "XYZ University",
                yearOfPassing: 2022,
                grade: "A",
            },
        ]
    },
    {
        name: "Dr. Anil Kumar",
        email: "anil.kumar@gmail.com",
        phone: "9876543210",
        employeeId: "TCH12345",
        route: "/teacher-profile",
        password: '1234'
    }
]


export const classes = {
    "Finance": ['F1', "F2", "F3"],
    "Marketing": ['M1', 'M2'],
    'Business Analytics': ['BA'],
    'Lean Operating System': ['LOS'],
    'Human Resources': ['HR']
}

export const initialTeacherTimeTable = [
    {
        date: "2025-03-17",
        day: "Monday",
        class: "HR",
        "09:00-10:30": { subject: "Innovation and Design Thinking", bookedBy: "" },
        "10:45-12:15": { subject: "Innovation and Design Thinking", bookedBy: "" },
        "13:00-14:30": { subject: "Workplace Wellbeing", bookedBy: "" },
        "14:45-16:15": { subject: "Workplace Wellbeing", bookedBy: "" }
    },
    {
        date: "2025-03-18",
        day: "Tuesday",
        class: "HR",
        "09:00-10:30": { subject: "E-Business", bookedBy: "" },
        "10:45-12:15": { subject: "Innovation and Design Thinking", bookedBy: "Dr. Patel" },
        "13:00-14:30": { subject: "", bookedBy: "" },
        "14:45-16:15": { subject: "", bookedBy: "" }
    },
    {
        date: "2025-03-19",
        day: "Wednesday",
        class: "HR",
        "09:00-10:30": { subject: "Technology of HR", bookedBy: "" },
        "10:45-12:15": { subject: "Business Sustainability, Governance, and Ethics", bookedBy: "Dr. Smith" },
        "13:00-14:30": { subject: "", bookedBy: "" },
        "14:45-16:15": { subject: "", bookedBy: "" }
    },
    {
        date: "2025-03-20",
        day: "Thursday",
        class: "HR",
        "09:00-10:30": { subject: "Workplace Wellbeing", bookedBy: "" },
        "10:45-12:15": { subject: "Business Sustainability, Governance, and Ethics", bookedBy: "Prof. John" },
        "13:00-14:30": { subject: "", bookedBy: "" },
        "14:45-16:15": { subject: "", bookedBy: "" }
    },
    {
        date: "2025-03-21",
        day: "Friday",
        class: "HR",
        "09:00-10:30": { subject: "Business Sustainability, Governance, and Ethics", bookedBy: "" },
        "10:45-12:15": { subject: "Business Sustainability, Governance, and Ethics", bookedBy: "" },
        "13:00-14:30": { subject: "Technology of HR", bookedBy: "" },
        "14:45-16:15": { subject: "", bookedBy: "" }
    },
    {
        date: "2025-03-22",
        day: "Saturday",
        class: "HR",
        "09:00-10:30": { subject: "Technology of HR", bookedBy: "" },
        "10:45-12:15": { subject: "Business Sustainability, Governance, and Ethics", bookedBy: "" },
        "13:00-14:30": { subject: "", bookedBy: "" },
        "14:45-16:15": { subject: "", bookedBy: "" }
    }
];



