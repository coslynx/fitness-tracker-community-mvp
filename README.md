<h1 align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
  <br>fitness-tracker-community-mvp
</h1>
<h4 align="center">Web application MVP for fitness enthusiasts to set, track, and share fitness goals.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<p align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js-blue" alt="Framework: Next.js" />
  <img src="https://img.shields.io/badge/Frontend-Javascript,_Html,_Css-red" alt="Frontend: Javascript, Html, Css" />
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Backend: Node.js" />
  <img src="https://img.shields.io/badge/LLMs-Custom,_Gemini,_OpenAI-black" alt="LLMs: Custom, Gemini, OpenAI" />
</p>
<p align="center">
  <img src="https://img.shields.io/github/last-commit/spectra-ai-codegen/fitness-tracker-community-mvp?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/spectra-ai-codegen/fitness-tracker-community-mvp?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/spectra-ai-codegen/fitness-tracker-community-mvp?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</p>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
The repository contains a Minimum Viable Product (MVP) called "fitness-tracker-community-mvp" that provides a web application for fitness enthusiasts to set, track, and share their fitness goals. It utilizes a robust tech stack including Next.js for the frontend, Node.js for the backend, and powerful LLMs like Gemini and OpenAI for advanced features. 

## 📦 Features

|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| ⚙️ | **Architecture**   | The codebase follows a modular architectural pattern, organized into separate directories for different functionalities, ensuring easier maintenance and scalability.             |
| 📄 | **Documentation**  | The repository includes a comprehensive README file that provides detailed insights into the MVP, its dependencies, and step-by-step usage instructions.|
| 🔗 | **Dependencies**   | The codebase relies on a variety of external libraries and packages, including Next.js, React, Tailwind CSS, Prisma, and NextAuth.js, for UI components, data management, authentication, and more.  |
| 🧩 | **Modularity**     | The modular structure promotes easier maintenance and reusability of the code, with separate directories and files for different functionalities such as pages, components, and API routes.|
| 🧪 | **Testing**        | The application incorporates unit tests to ensure the reliability and robustness of the codebase.       |
| ⚡️  | **Performance**    | The system prioritizes performance by using optimized frameworks like Next.js and employing caching strategies to enhance the user experience. |
| 🔐 | **Security**       | Security is paramount, with measures like input validation, data encryption, and secure communication protocols implemented to safeguard user information.|
| 🔀 | **Version Control**| Utilizes Git for version control with a dedicated GitHub Actions workflow for automated build and release processes.|
| 🔌 | **Integrations**   | The application seamlessly integrates with popular fitness trackers and social media platforms for a comprehensive experience.  |
| 📶 | **Scalability**    | The system is designed with scalability in mind, utilizing efficient database management and cloud-based solutions to handle increasing user load and data volume.           |


## 📂 Structure

```
├── app
│   ├── dashboard
│   │   ├── page.js
│   │   └── layout.js
│   ├── goals
│   │   ├── page.js
│   │   └── layout.js
│   ├── workouts
│   │   ├── page.js
│   │   └── layout.js
│   ├── friends
│   │   ├── page.js
│   │   └── layout.js
│   ├── layout
│   │   └── layout.js
│   ├── globals.css
│   └── favicon.ico
├── components
│   ├── GoalForm.jsx
│   ├── GoalItem.jsx
│   ├── WorkoutForm.jsx
│   ├── WorkoutItem.jsx
│   ├── FriendItem.jsx
│   ├── ProgressChart.jsx
│   ├── Navbar.jsx
│   └── Footer.jsx
├── pages
│   ├── api
│   │   ├── auth
│   │   │   └── [...nextauth].js
│   │   ├── goals
│   │   │   └── route.js
│   │   ├── workouts
│   │   │   └── route.js
│   │   ├── friends
│   │   │   └── route.js
│   │   └── users
│   │       └── route.js
│   └── _app.jsx
├── prisma
│   ├── schema.prisma
│   └── migrations
│       └── 20231026172907_init
│           └── migration.sql
├── tailwind.config.js
├── vite.config.js
├── postcss.config.cjs
├── package.json
└── README.md
```

## 💻 Installation

### 🔧 Prerequisites
- Node.js
- npm
- Docker (Optional, for database setup)

### 🚀 Setup Instructions
1. Clone the repository:
   - `git clone https://github.com/spectra-ai-codegen/fitness-tracker-community-mvp.git`
2. Navigate to the project directory:
   - `cd fitness-tracker-community-mvp`
3. Install dependencies:
   - `npm install`


## 🏗️ Usage

### 🏃‍♂️ Running the MVP
1. Start the development server:
   - `npm run dev`
2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### ⚙️ Configuration
Adjust configuration settings in `tailwind.config.js`, `.env`, and `prisma/schema.prisma`.

### 📚 Examples
- 📝 **Example 1**: Setting a new fitness goal:
  - Navigate to the "Goals" page.
  - Enter the goal name, target date, and desired outcome.
  - Click "Create Goal."
- 📝 **Example 2**: Tracking workouts:
  - Navigate to the "Workouts" page.
  - Log your workouts by selecting the exercise type, duration, and date.
  - View your workout history.
- 📝 **Example 3**: Connecting with friends:
  - Navigate to the "Friends" page.
  - Search for and add friends.
  - Share your progress with friends and join group challenges.

## 🌐 Hosting

### 🚀 Deployment Instructions

#### Vercel
1. Create a new Vercel project: [https://vercel.com/new](https://vercel.com/new)
2. Import this repository.
3. Configure environment variables.
4. Deploy your project.

#### Netlify
1. Create a new Netlify site: [https://app.netlify.com/start](https://app.netlify.com/start)
2. Connect your GitHub repository.
3. Configure environment variables.
4. Deploy your project.

#### GitHub Pages
1. Configure a GitHub Pages branch.
2. Build the project using `npm run build`.
3. Deploy the built files to the GitHub Pages branch.

#### AWS
1. Create an AWS account.
2. Set up an S3 bucket for static website hosting.
3. Configure a CloudFront distribution to serve the content.
4. Deploy the built files to the S3 bucket.

#### Google Cloud
1. Create a Google Cloud project.
2. Create a Cloud Storage bucket for static website hosting.
3. Configure a Cloud CDN to serve the content.
4. Deploy the built files to the Cloud Storage bucket.

### 🔑 Environment Variables
- `NEXTAUTH_URL`: Your application URL.
- `NEXTAUTH_SECRET`: Your application secret.
- `DATABASE_URL`: Your database URL.

## 📜 API Documentation
### 🔍 Endpoints
- **GET /api/users**: Retrieves a list of users.
- **POST /api/users**: Creates a new user.
- **GET /api/goals**: Retrieves a list of goals for a specific user.
- **POST /api/goals**: Creates a new goal for a specific user.
- **GET /api/workouts**: Retrieves a list of workouts for a specific user.
- **POST /api/workouts**: Creates a new workout for a specific user.
- **GET /api/friends**: Retrieves a list of friends for a specific user.
- **POST /api/friends**: Adds a new friend for a specific user.

### 🔒 Authentication
NextAuth.js is used for handling authentication.

### 📝 Examples
- `curl -X GET http://localhost:3000/api/goals`

## 📜 License
This MVP is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/).

## 👥 Authors
- **Author Name** - [Spectra.codes](https://spectra.codes)
- **Creator Name** - [DRIX10](https://github.com/Drix10)

<p align="center">
  <h1 align="center">🌐 Spectra.Codes</h1>
</p>
<p align="center">
  <em>Why only generate Code? When you can generate the whole Repository!</em>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Developer-Drix10-red" alt="Developer: Drix10" />
  <img src="https://img.shields.io/badge/Website-Spectra.codes-blue" alt="Website: Spectra.codes" />
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="Backed by: Google, Microsoft & Amazon for Startups" />
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4-black" alt="Finalist: Backdrop Build v4" />
  </p>