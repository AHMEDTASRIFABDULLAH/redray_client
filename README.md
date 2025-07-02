# RedRay

RedRay is a platform that connects blood donors, volunteers, and admins for managing blood donations and related activities. It provides a seamless experience for users to register, request, and manage blood donations.

## Live Link

Visit the live version of the project [here](https://calm-snickerdoodle-bcd538.netlify.app/).

## Features

### 1. Role Management

- **Admin**: Has access to all features, including user management, donation requests, and content management.
- **Donor**: Can register, view donation requests, and respond to them, while maintaining their own profile.
- **Volunteer**: Can create and manage donation requests.
- **Make a user admin by editing from the database**.

### 2. User Authentication

- **Registration**: Users can register with email, name, avatar, blood group, district, upazila, and password.
- **Login**: Users can log in using their registered email and password.

### 3. Dashboard (Private)

- **Profile Page**: Users can view and update their profile, excluding email.
- **Donor Dashboard**: Displays recent donation requests, donation statuses, and options to view, edit, or delete requests.
- **Admin Dashboard**: Admin can manage users, including blocking/unblocking, and making users volunteers or admins.
- **Volunteer Dashboard**: Volunteers can view and manage donation requests, with limited permissions compared to admins.

### 4. Donation Request Management

- **Create Donation Request**: Users can request blood donations by providing details like recipient name, hospital, and donation date/time.
- **Donation Request Details**: Admin and donor can view and update the status of donation requests.
- **Funding Page**: Users can donate funds, and the admin can view all donations.

### 5. Content Management

- **Blogs**: Admin can create, publish, and delete blogs. Volunteers have restricted access.

### 6. JWT Authentication

- JWT is implemented for secure login and private API access.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Payment**: Stripe (for funding)
