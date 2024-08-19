## Overview

![CarePulse Home Page](/public/assets/images/CarePulse.png)

<div style="display: flex; justify-content: center; align-items: center;">
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E" alt="appwrite" />
  </div>

## Table of Contents

- [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Wins](#wins)
- [Challenges](#challenges)
- [Future Improvements](#future-improvements)

## <a name="installation">Installation</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone git@github.com:camjohnson-code/carepulse.git
cd carepulse
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
#APPWRITE
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
PROJECT_ID=
API_KEY=
DATABASE_ID=
PATIENT_COLLECTION_ID=
APPOINTMENT_COLLECTION_ID=
NEXT_PUBLIC_BUCKET_ID=

NEXT_PUBLIC_ADMIN_PASSKEY=111111
```

Replace the placeholder values with your actual Appwrite credentials. You can obtain these credentials by signing up on the [Appwrite website](https://appwrite.io/).

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="tech-stack">Tech Stack</a>

- Next.js
- Appwrite
- Typescript
- TailwindCSS
- ShadCN
- Twilio

## <a href='wins'>Wins</a>

- **Next.js Mastery:** This project was my first experience with Next.js, where I significantly deepened my understanding of server-side rendering and dynamic routing.

- **Responsive Design with Tailwind:** Achieved a responsive and adaptive design by utilizing Tailwind classes. Understanding and applying these classes from the provided codebase was essential.

- **TypeScript Integration:** Introduced TypeScript into the project, enhancing code reliability and maintainability with static typing.

- **Robust Testing Setup:** Set up testing frameworks and wrote unit and integration tests to ensure code quality and reliability.

- **Shadcn Implementation:** Utilized Shadcn for the first time, integrating its components to enhance the user interface and streamline development with a set of modern design elements.

## <a href='challenges'>Challenges</a>

- **Learning Curve with Next.js**:** As my first project using Next.js, I faced a steep learning curve with concepts like server-side rendering, static site generation, and dynamic routing. It took time to grasp these new paradigms and integrate them effectively into the project.

- **Integrating Shadcn:** Using Shadcn for the first time presented challenges in understanding its component library and how to best utilize its features for UI development. Adapting to its design system and customizing components to fit the project’s needs required additional effort and experimentation.

- **TypeScript Adaptation:** While I have some experience with TypeScript, applying it effectively in this project was a learning experience. I had to adjust to its static typing features and integrate them into the existing codebase to enhance code reliability.

## <a href='future-improvements'>Future Improvements</a>

- **Enhanced Testing Coverage:** While I set up Cypress and wrote e2e tests, I condensed the testing process due to time constraints. In the future, I plan to expand test coverage to include more comprehensive scenarios and edge cases, ensuring thorough validation and robustness of the application. I ran into some issues at the beginning of the project setting up Jest, so once I solve them, I'll add unit tests.

- **Optimized Prop Passing in Forms:** I intend to improve the prop passing mechanism in the patient form to streamline the user experience. By implementing more efficient handling of repetitive form information, users will be able to enter data more quickly and reduce redundancy.
