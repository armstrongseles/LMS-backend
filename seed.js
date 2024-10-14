const mongoose = require('mongoose');

// Connect to your MongoDB
mongoose.connect('mongodb://localhost:27017/course', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a course schema
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  photo: String, // Photo field
  assessments: [{
    question: String,
    options: [String],
    answer: String
  }],
});

const Course = mongoose.model('Course', courseSchema);

// Course data to insert for React
const reactCourseData = {
  title: "Introduction to React",
  description: "This course is designed for beginners who want to learn React, a popular JavaScript library for building user interfaces. It covers the fundamental concepts of React, including components, props, state, and lifecycle methods. Students will engage in hands-on exercises to develop interactive web applications using React.",
  price: 59.99,
  photo: "https://pluspng.com/img-png/react-logo-png-react-js-logo-history-design-history-and-evolution-5500x3094.png", // Using the provided React logo URL
  assessments: [
    {
      question: "What is React primarily used for?",
      options: ["A) Server-side development", "B) Building user interfaces", "C) Database management", "D) CSS styling"],
      answer: "B"
    },
    {
      question: "Which of the following is a feature of React?",
      options: ["A) Virtual DOM", "B) Two-way data binding", "C) Event bubbling", "D) AJAX"],
      answer: "A"
    },
    {
      question: "What is the correct way to create a React component?",
      options: ["A) function MyComponent()", "B) class MyComponent extends Component", "C) Both A and B", "D) createComponent MyComponent()"],
      answer: "C"
    },
    {
      question: "What are props in React?",
      options: ["A) Properties passed to components", "B) State variables", "C) CSS styles", "D) React methods"],
      answer: "A"
    },
    {
      question: "What is the purpose of the useState hook?",
      options: ["A) To manage component state", "B) To handle side effects", "C) To create components", "D) To manage routing"],
      answer: "A"
    },
    {
      question: "How do you pass data from a parent component to a child component in React?",
      options: ["A) Using props", "B) Using state", "C) Using context", "D) Using refs"],
      answer: "A"
    },
    {
      question: "What is JSX?",
      options: ["A) A JavaScript syntax extension", "B) A CSS library", "C) A JavaScript framework", "D) A React method"],
      answer: "A"
    },
    {
      question: "Which hook is used to perform side effects in function components?",
      options: ["A) useEffect", "B) useState", "C) useContext", "D) useReducer"],
      answer: "A"
    },
    {
      question: "What is a controlled component?",
      options: ["A) A component that does not maintain its own state", "B) A component that maintains its own state", "C) A component that is difficult to control", "D) A component that uses hooks"],
      answer: "A"
    },
    {
      question: "Which of the following is NOT a valid way to define a React component?",
      options: ["A) Functional component", "B) Class component", "C) Arrow function component", "D) Lambda function component"],
      answer: "D"
    },
    {
      question: "What does the useContext hook do?",
      options: ["A) It provides access to context", "B) It creates a context", "C) It consumes props", "D) It manages state"],
      answer: "A"
    },
    {
      question: "What is the default behavior of forms in React?",
      options: ["A) Prevent default behavior", "B) Submit the form", "C) Reset the form", "D) Validate input"],
      answer: "B"
    },
    {
      question: "What is the use of keys in React?",
      options: ["A) To uniquely identify elements", "B) To style components", "C) To manage state", "D) To perform routing"],
      answer: "A"
    },
    {
      question: "What will happen if you try to update the state directly in React?",
      options: ["A) The component will re-render", "B) React will not detect the change", "C) It will throw an error", "D) It will work as expected"],
      answer: "B"
    },
    {
      question: "What is React Router used for?",
      options: ["A) To manage state", "B) To handle API requests", "C) To handle navigation", "D) To style components"],
      answer: "C"
    },
    {
      question: "What is the purpose of the React.Fragment component?",
      options: ["A) To group multiple elements", "B) To create a link", "C) To manage state", "D) To define a component"],
      answer: "A"
    },
    {
      question: "Which method is called when a React component is being removed from the DOM?",
      options: ["A) componentDidMount", "B) componentWillUnmount", "C) render", "D) componentDidUpdate"],
      answer: "B"
    },
    {
      question: "How do you conditionally render a component in React?",
      options: ["A) Using if statements", "B) Using ternary operators", "C) Using logical && operator", "D) All of the above"],
      answer: "D"
    },
    {
      question: "What is the purpose of the Redux library in a React application?",
      options: ["A) To manage component state", "B) To manage global state", "C) To handle routing", "D) To manage side effects"],
      answer: "B"
    },
  ]
};

// Insert course data into the database
Course.create(reactCourseData)
  .then(() => {
    console.log("React Course added successfully!");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("Error inserting React course:", err);
    mongoose.connection.close();
  });
