const mongoose = require("mongoose");
const faker = require("faker");
const Post = require("./models/Post");

mongoose.connect("mongodb://localhost:27017/blog");

const userId = "67cf212ca6e887e3e27ed28d";

const technologies = [
  "React",
  "Vue",
  "Angular",
  "Svelte",
  "Node.js",
  "Express.js",
  "NestJS",
  "Django",
  "Flask",
  "Spring Boot",
  "Laravel",
  "ASP.NET",
  "GraphQL",
  "REST API",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Firebase",
  "WebSockets",
  "OAuth",
  "JWT",
  "Docker",
  "Kubernetes",
  "CI/CD",
  "Webpack",
  "Vite",
  "Parcel",
  "Tailwind CSS",
  "Bootstrap",
  "Material-UI",
  "SASS",
  "LESS",
  "TypeScript",
  "JavaScript",
  "ES6+",
  "Next.js",
  "Nuxt.js",
  "Gatsby",
  "Jest",
  "Mocha",
  "Chai",
  "Redux",
  "Recoil",
  "Zustand",
  "RxJS",
  "WebRTC",
  "Three.js",
  "D3.js",
  "Electron",
  "PWA",
  "Service Workers",
  "WebAssembly",
  "GraphQL Subscriptions",
  "Microservices",
  "Serverless",
  "TDD",
  "BEM",
  "MVC",
  "MVVM",
  "SOLID Principles",
];

const generatePosts = async () => {
  try {
    await Post.deleteMany();
    const posts = [];
    for (let i = 0; i < 100; i++) {
      const tech =
        technologies[Math.floor(Math.random() * technologies.length)];
      posts.push(
        new Post({
          title: `${faker.lorem.words(3)} - ${tech}`,
          content: faker.lorem.paragraphs(3),
          user: userId,
          isPublished: faker.datatype.boolean(),
          isPopular: faker.datatype.boolean(),
          image: faker.image.imageUrl(),
        })
      );
    }
    await Post.insertMany(posts);
    console.log("100 blog posts seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Seeding failed", err);
    mongoose.connection.close();
  }
};

generatePosts();
