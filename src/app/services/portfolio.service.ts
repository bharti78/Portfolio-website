import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Bio, SkillCategory, Experience, Education, Project } from '../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private http = inject(HttpClient);

  // Bio data as signal
  private bioData = signal<Bio>({
    name: "Bharti Dhote",
    roles: [
      "Software Engineer",
      "Competitive Coder",
    ],
    description:
      "I am a motivated and versatile individual, always eager to take on new challenges. With a passion for learning I am dedicated to delivering high-quality results. With a positive attitude and a growth mindset, I am ready to make a meaningful contribution and achieve great things.",
    github: "https://github.com/bharti78",
    resume:
      "https://drive.google.com/file/d/18k7IAXyK9T_hJoqf-bJS6xRctNn6N1F5/view",
    linkedin: "https://www.linkedin.com/in/bhartidhote/",
    twitter: "https://x.com/BHARTIDHOT71091",
    insta: "https://www.instagram.com/sereneskies19/",
    facebook: "https://www.facebook.com/profile.php?id=100075704143780",
  });

  // Skills data as signal
  private skillsData = signal<SkillCategory[]>([
    {
      title: "Frontend",
      skills: [
        {
          name: "React Js",
          image:
            "https://tse2.mm.bing.net/th/id/OIP.G_njanbXycQWkfsmAmyvVQHaGc?rs=1&pid=ImgDetMain&o=7&rm=3",
        },
        {
          name: "Redux",
          image:
            "https://d33wubrfki0l68.cloudfront.net/0834d0215db51e91525a25acf97433051f280f2f/c30f5/img/redux.svg",
        },
        {
          name: "Angular",
          image:
            "https://angular.io/assets/images/logos/angular/angular.svg",
        },
        {
          name: "Next Js",
          image:
            "https://images.seeklogo.com/logo-png/39/1/next-js-logo-png_seeklogo-394608.png",
        },
        {
          name: "ShadCN UI",
          image:
            "https://ui.shadcn.com/favicon.ico",
        },
        {
          name: "Tailwind CSS",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
        },
        {
          name: "HTML",
          image: "https://www.w3.org/html/logo/badge/html5-badge-h-solo.png",
        },
        {
          name: "CSS",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg",
        },
        {
          name: "JavaScript",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        },
        {
          name: "Bootstrap",
          image:
            "https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png",
        }
      ],
    },
    {
      title: "Backend",
      skills: [
        {
          name: "Node Js",
          image: "https://nodejs.org/static/images/logo.svg",
        },
        {
          name: "Express Js",
          image:
            "data:image/png;base64,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",
        },
        // {
        //   name: "Graph Ql",
        //   image: "https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg",
        // },
        {
          name: "Python",
          image:
            "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
        },
        // {
        //   name: "Flask",
        //   image:
        //     "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Flask_logo.svg/1280px-Flask_logo.svg.png",
        // },
        // {
        //   name: "Django",
        //   image:
        //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlFFyY16N5NRhzoG24RqB7x8Ok2t8Bdgs-tuMsOBXS2Q&s",
        // },
        {
          name: "MySQL",
          image:
            "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg",
        },
        {
          name: "Postgresql",
          image: "https://www.postgresql.org/media/img/about/press/elephant.png",
        },
        {
          name: "MongoDB",
          image:
            "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg",
        },
        {
          name: "Firebase",
          image: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
        },
      ],
    },
    {
      title: "Deployment",
      skills: [
        {
          name: "AWS",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
        },
        {
          name: "Vercel",
          image:
            "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png",
        },
        {
          name: "Netlify",
          image:
            "https://www.vectorlogo.zone/logos/netlify/netlify-icon.svg",
        },
        {
          name: "GitHub Pages",
          image:
            "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
        },
      ],
    },
    {
      title: "Others",
      skills: [
        {
          name: "Git",
          image:
            "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png",
        },
        {
          name: "GitHub",
          image:
            "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
        },
        {
          name: "Postman",
          image:
            "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
        },
        {
          name: "Cursor",
          image:
            "https://cursor.sh/brand/icon.svg",
        },
        {
          name: "Ghost CMS",
          image:
            "https://tse4.mm.bing.net/th/id/OIP.jf9Qz42wMEE2DOrGNGkRPwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
        },
        {
          name: "Figma",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
        },
      ],
    },
  ]);

  // Experiences data as signal
  private experiencesData = signal<Experience[]>([
    {
      id: 0,
      img: "https://media.licdn.com/dms/image/v2/D4D0BAQEDFqXHKKgdNw/company-logo_200_200/company-logo_200_200/0/1694257912595/inditech_technology_services_private_limited_logo?e=2147483647&v=beta&t=C7vb55wLgkw5hbA-ZhiJ7tCX10lJCN0zyBQkFI49xMk",
      role: "Product Development Intern",
      company: "Inditech Technology Services Pvt. Ltd.",
      date: "Apr 2025 - Present",
      desc: "Currently working at Inditech Technology Services Pvt. Ltd. as a Product Development Intern (Remote). I have developed 3+ real-time healthcare products using Python, Django, and PHP, integrating 20+ secure REST APIs with 99.9% uptime. I collaborate closely with UI/UX, QA, and DevOps teams to deliver scalable, production-ready applications, optimizing backend performance by 30% through efficient Django ORM queries and caching techniques.",
      skills: [
        "Python",
        "Django",
        "PHP",
        "MySQL",
        "REST APIs",
        "Backend Development",
        "Database Management",
        "Django ORM",
        "Caching Optimization",
        "Performance Optimization",
        "Collaboration with UI/UX, QA, DevOps",
        "Scalable Product Development",
    ]    
    },
    {
      id: 1,
      img: "https://media.licdn.com/dms/image/v2/D560BAQEhSFgYhzTpYA/company-logo_200_200/B56Zd34m36GQAI-/0/1750063017899/coincent_ai_logo?e=2147483647&v=beta&t=fHHRvju7PseCYsTThtlvU-9TK9dPtoPNpcVcKpHIw8Q",
      role: "AI with Python Intern",
      company: "Coincent.ai",
      date: "Apr 2024 - Jun 2024",
      desc: "Worked at Coincent.ai as an Artificial Intelligence with Python Intern. I architected and fine-tuned a Vision Transformer model for image classification on the Oxford-IIIT Pet dataset, achieving a 15% accuracy improvement. Additionally, I designed and implemented a text classification model using TensorFlow, including data preprocessing, model architecture, training, and evaluation, achieving 92% accuracy on the test data.",
      skills: [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "Vision Transformers (ViT)",
        "Text Classification",
        "TensorFlow",
        "Keras",
        "Data Preprocessing",
        "Feature Engineering",
        "Model Evaluation",
        "Accuracy Optimization",
      ],
      doc: "https://drive.google.com/file/d/1dl3juW0xY86bM1gNibmZP0mS7ggsvPbF/view?usp=sharing",
    },
    {
      id: 2,
      img: "https://miro.medium.com/v2/resize:fit:400/1%2AZfYWXN0zA6TqQQ7wGNJUOg.jpeg",
      role: "GirlScript Summer of Code 2025 Contributor",
      company: "GirlScript",
      date: "Jul 2025 - Present",
      desc: "Worked as an Open Source Contributor in GirlScript Summer of Code (GSSoC), contributing to real-world projects and collaborating with the developer community.",
      skills: [
        "ReactJS",
        "HTML",
        "CSS",
        "JavaScript",
        "GitHub",
        "Team work",
      ],
    },
  ]);

  // Education data as signal
  private educationData = signal<Education[]>([
    {
      id: 0,
      img: "assets/images/iiitk.png",
      school: "Indian Institute of Information Technology, Kota",
      date: "Aug 2023 - Sep 2027",
      grade: "6.42 CGPA",
      desc: "I am currently pursuing a Bachelor's degree in Electronics and Communication at Indian Institute of Information Technology, Kota. I have completed 4 semesters and have a CGPA of 6.42. I have taken courses in Data Structures, Algorithms, Object-Oriented Programming in C++, Database Management Systems, Operating Systems, among others.",
      degree: "Bachelor of Technology - BTech, Computer Science and Engineering",
    },
    {
      id: 1,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV8XxQXvcdySPq-4dU-s9ooGWWLkNq2j9xuw&s",
      school: "Vijay Jyoti Academy School, Dewas",
      date: "Apr 2021 - Apr 2023",
      grade: "90.8%",
      desc: "I completed my class 12 high school education at Vijay Jyoti Academy, Dewas, where I studied Science",
      degree: "State Board(XII), Science",
    },
    {
      id: 2,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV8XxQXvcdySPq-4dU-s9ooGWWLkNq2j9xuw&s",
      school: "Vijay Jyoti Academy School, Dewas",
      date: "Apr 2008 - Apr 2021",
      grade: "80%",
      desc: "I completed my class 10 education at Vijay Jyoti Academy School, Dewas.",
      degree: "State Board(X)",
    },
  ]);

  // Projects data as signal
  private projectsData = signal<Project[]>([
    {
      id: 10,
      title: "Crave - Corner Restaurant Website",
      description:
        "It is a scalable full-stack restaurant platform with robust functionalities, enabling seamless food ordering, reservations, and secure online payments. It leverages an efficient server-side framework with Express.js and MongoDB, improving processing speeds to support over 3,000 monthly active users. Integrated Stripe payment gateway to handle 100+ secure transactions and Cloudinary APIs to optimize images, reducing load time by 40% and ensuring smooth performance across 95% of devices. Implemented real-time updates for reservations and orders with Zustand, while refining back-end systems to achieve a 20% improvement in response time. Ensured robust authentication and security with TypeScript, reducing runtime errors by 30% and increasing customer trust and satisfaction.",
      image: "assets/images/food.png",
      tags: ["ReactJs", "NodeJs", "ExpressJs", "MongoDb", "JavaScript", "Bootstrap", "Stripe", "Cloudinary", "Zustand", "TypeScript"],
      github: "https://github.com/bharti78/CraveCorner",
      webapp: "https://cravecorner.onrender.com/",
    },
    {
      id: 11,
      title: "Imdb Clone",
      description:
        "It is a front-end clone of a popular movie streaming platform, built with HTML, CSS, JavaScript, and React.js, offering users a seamless movie-watching experience. The platform integrates real-time data from the TMDB API, enabling trending movie displays, search functionality, and category-based navigation. Designed with a fully responsive UI, it ensures smooth performance and compatibility across 95% of devices, enhancing accessibility and delivering an engaging user experience.",
      image: "assets/images/IMDB.png",
      tags: [
        "React Js",
        "HTML",
        "CSS",
        "JavaScript",
        "Vite",
        "TMDB API",
        "Responsive Design",
        "Fully Responsive",
      ],
      github: "https://github.com/bharti78/IMDB-Clone",
      webapp: "https://imdb-new-clone.vercel.app/",
    },
    {
      id: 9,
      title: "Social Media",
      description:
        "It is React App which demonstrates the UI/UX of a social media platform. It involves Fetching posts from a dummy JSON API. Using create post we can actually create post and post it and it will be visible to us, we can also delete posts and add post whatever we want. It is also consists of react routing.",
      image: "assets/images/social-media.png",
      tags: [
        "React Js",
        "Fetch API",
        "Routing",
        "Redux",
      ],
      github: "https://github.com/bharti78/Social-media",
      webapp: "https://social-media-ebon-nu.vercel.app/",
    },
    {
      id: 0,
      title: "Community-Hub",
      description:
        "Community Hub is a frontendweb application that connects users through forums, creating a vibrant community where discussions thrive. It features a user-friendly interface, seamless navigation, and robust authentication for secure interactions. Leveraging Next.js, it delivers a smooth, scalable platform for seamless user experience and seamless data management.",
      image: "assets/images/Community-hub.png",
      tags: ["React Js", "Fetch API", "Class-based Components", "Next.js", "Framer Motion"],
      github: "https://github.com/bharti78/Community-hub",
      webapp: "https://community-hub-pied.vercel.app/",
    },
    {
      id: 1,
      title: "Todo-App",
      description:
        "Built a Todo application using React, Vite, and MongoDB, providing a seamless user experience for creating, editing, and deleting tasks. Implemented a responsive UI with Tailwind CSS, ensuring compatibility across devices, while MongoDB handled persistent storage for all tasks. The app features modular components, efficient state management, and follows best coding practices with ESLint for code quality and a streamlined build process.",
      image: "assets/images/Todo-List.png",
      tags: [
        "React Js",
        "MongoDb",
        "Tailwind CSS",
        "ESLint",
        "Vite",
        "Dark Mode",
        "Function-based Components",
      ],
      github: "https://github.com/bharti78/Todo-app-",
      webapp: "https://todo-app-21xv.vercel.app/",
    },
    {
      id: 3,
      title: "E-Commerce Website",
      description:
        "It is a fully responsive e-commerce website built with HTML, CSS, and JavaScript, featuring product listings, shopping cart, and interactive product filtering. The website ensures a seamless user experience across devices with a modern, intuitive, and dynamic UI.",
      image: "assets/images/e-commerce.png",
      tags: ["JavaScript", "HTML", "CSS"],
      github: "https://github.com/bharti78/E-Commerce-Website",
      webapp: "https://e-commerce-website-rosy-beta.vercel.app/",
    },
  ]);

  // Loading states
  private loading = signal(false);
  private error = signal<string | null>(null);

  // Public getters using computed signals
  bio = computed(() => this.bioData());
  skills = computed(() => this.skillsData());
  experiences = computed(() => this.experiencesData());
  education = computed(() => this.educationData());
  projects = computed(() => this.projectsData());
  isLoading = computed(() => this.loading());
  errorMessage = computed(() => this.error());

  // Methods to update data (for future API integration)
  updateBio(bio: Partial<Bio>) {
    this.bioData.update(current => ({ ...current, ...bio }));
  }

  addProject(project: Project) {
    this.projectsData.update(current => [...current, project]);
  }

  updateProject(id: number, updates: Partial<Project>) {
    this.projectsData.update(current =>
      current.map(project => 
        project.id === id ? { ...project, ...updates } : project
      )
    );
  }

  // Simulate API calls (for future backend integration)
  loadPortfolioData(): Observable<boolean> {
    this.loading.set(true);
    this.error.set(null);
    
    // Simulate API delay
    return new Observable(observer => {
      setTimeout(() => {
        try {
          // Data is already loaded from constants
          this.loading.set(false);
          observer.next(true);
          observer.complete();
        } catch (error) {
          this.error.set('Failed to load portfolio data');
          this.loading.set(false);
          observer.error(error);
        }
      }, 1000);
    });
  }
}
