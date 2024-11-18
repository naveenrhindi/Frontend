Coal Mine Owner Dashboard
This project is a comprehensive web application designed to help coal mine owners efficiently manage and visualize various aspects of their operations. The dashboard provides an intuitive interface for data input, visualization, and suggestions to improve overall efficiency and sustainability.

Features
Data Input: Enter data related to fuel consumption, coal production, electricity usage, water usage, and emission levels.
Visualize: Interactive charts and graphs to understand trends and patterns in the entered data.
Suggestions: Recommendations based on the input data to optimize operations and reduce environmental impact.
User Profile: View and update profile information, including account settings.
Charts: Multiple chart types (Area, Bar, Donut) for diverse data visualization.
Technologies Used
React: JavaScript library for building user interfaces.
React Router: Library for routing in React applications.
Tailwind CSS: Utility-first CSS framework for styling.
ApexCharts: Library for creating interactive charts.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/PrajwalWadekar/SihUserDashboard.git
Navigate to the project directory:

bash
Copy code
cd SihUserDashboard
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm run dev
Project Structure
plaintext
Copy code
src
├── components
│   ├── DataInput
│   │   └── DataInput.jsx
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── Suggestions
│   │   └── Suggestion.jsx
│   ├── UserProfile
│   │   ├── MyProfile.jsx
│   │   └── AccountSettings.jsx
│   ├── Visualise
│   │   ├── Visualization.jsx
│   │   ├── ChartOne.jsx
│   │   ├── ChartTwo.jsx
│   │   └── ChartThree.jsx
├── DashboardLayout.jsx
├── Routes
│   └── routes.js
└── App.js
Usage
Data Input
Navigate to the Data Input section.
Enter details such as fuel consumption, coal production, electricity usage, water usage, and emission levels.
This data will be used for generating visualizations and suggestions.
Visualize
The Visualize section provides various charts to help understand trends and patterns in your data.
Select chart types (Area, Bar, Donut) from the sidebar to view respective visualizations.
Suggestions
The Suggestions section offers insights and recommendations based on the entered data to optimize operations and reduce environmental impact.
User Profile
View and update profile information in the User Profile section.
Access account settings to make changes to your account details.
Contributing
Contributions are welcome! If you'd like to contribute to this project:

Fork the repository.
Create a new branch for your feature:
bash
Copy code
git checkout -b feature-name
Commit your changes:
bash
Copy code
git commit -m "Add feature: feature-name"
Push the branch:
bash
Copy code
git push origin feature-name
Create a pull request.
