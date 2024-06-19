export const documentations = [
  {
    postId: "12345",
    title: "How to Use the XYZ Library",
    author: "JaneDoe",
    icon: "FaLaptopCode",
    creationDate: "2024-05-27T12:34:56Z",
    lastUpdated: "2024-05-28T14:23:10Z",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit nostrum ea, officiis laboriosam neque voluptatem enim a itaque aliquam reiciendis quod, temporibus et iusto veniam voluptatibus error ad aspernatur repudiandae!",
    tags: "JavaScript, Library, Tutorial",
    content: [
      {
        type: "Header",
        text: "Introduction",
      },
      {
        type: "Paragraph",
        text: "This documentation will guide you through the basics of using the XYZ library.",
      },
      {
        type: "Header",
        text: "Installation",
      },
      {
        type: "Code Block",
        language: "bash",
        code: "npm install xyz-library",
      },
      {
        type: "Paragraph",
        text: "After installation, you can import the library in your project as follows:",
      },
      {
        type: "Code Block",
        language: "javascript",
        code: "import XYZ from 'xyz-library';",
      },
      {
        type: "Header",
        text: "Basic Usage",
      },
      {
        type: "Paragraph",
        text: "Here's an example of how to use the library:",
      },
      {
        type: "Code Block",
        language: "javascript",
        code: "const instance = new XYZ();\ninstance.doSomething();",
      },
      {
        type: "Image",
        url: "https://example.com/image.png",
        altText: "Example Output",
      },
      {
        type: "List",
        ordered: true,
        items: ["Step 1: Do this", "Step 2: Do that"],
      },
      {
        type: "Link",
        url: "https://xyz-library-docs.com",
        text: "Full Documentation",
      },
    ],
  },
  {
    postId: "54321",
    title: "Advanced Techniques in Data Visualization",
    author: "JohnSmith",
    icon: "FaScrewdriverWrench",
    creationDate: "2024-05-25T08:45:00Z",
    lastUpdated: "2024-05-26T16:30:20Z",
    description:
      "Discover advanced methods for creating visually stunning data visualizations.",
    tags: "Data Visualization, Charts, JavaScript",
    content: [
      {
        type: "Header",
        text: "Introduction",
      },
      {
        type: "Paragraph",
        text: "This guide explores advanced techniques for data visualization using popular JavaScript libraries.",
      },
      {
        type: "Header",
        text: "Customization",
      },
      {
        type: "Paragraph",
        text: "Learn how to customize your charts to fit specific design requirements.",
      },
      {
        type: "Code Block",
        language: "javascript",
        code: "chart.setOptions({\n  theme: 'dark',\n  animation: false\n});",
      },
      {
        type: "Header",
        text: "Interactive Features",
      },
      {
        type: "Paragraph",
        text: "Implement interactive features like tooltips and zooming for enhanced user experience.",
      },
      {
        type: "Code Block",
        language: "javascript",
        code: "chart.enableTooltip();\nchart.enableZoom();",
      },
      {
        type: "Image",
        url: "https://example.com/advanced-chart.png",
        altText: "Advanced Chart Example",
      },
      {
        type: "List",
        ordered: true,
        items: [
          "Step 1: Customize chart appearance",
          "Step 2: Implement interactive features",
        ],
      },
      {
        type: "Link",
        url: "https://advanced-dataviz-guide.com",
        text: "Full Guide",
      },
    ],
  },
  {
    postId: "98765",
    title: "Mastering React State Management",
    author: "SarahJohnson",
    icon: "FaGears",
    creationDate: "2024-05-20T10:15:00Z",
    lastUpdated: "2024-05-22T11:45:30Z",
    description:
      "Explore advanced strategies for managing state in React applications.",
    tags: "React, State Management, Frontend Development",
    content: [
      {
        type: "Header",
        text: "Introduction",
      },
      {
        type: "Paragraph",
        text: "This comprehensive guide will help you master state management in React, improving the performance and maintainability of your applications.",
      },
      {
        type: "Header",
        text: "Stateful vs Stateless Components",
      },
      {
        type: "Paragraph",
        text: "Understand the difference between stateful and stateless components, and when to use each.",
      },
      {
        type: "Code Block",
        language: "javascript",
        code: "class StatefulComponent extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { count: 0 };\n  }\n  render() {\n    return <div>{this.state.count}</div>;\n  }\n}",
      },
      {
        type: "Header",
        text: "Redux Integration",
      },
      {
        type: "Paragraph",
        text: "Learn how to integrate Redux, a popular state management library, into your React applications.",
      },
      {
        type: "Code Block",
        language: "javascript",
        code: "import { createStore } from 'redux';\nimport rootReducer from './reducers';\nconst store = createStore(rootReducer);",
      },
      {
        type: "List",
        ordered: true,
        items: [
          "Step 1: Define actions and reducers",
          "Step 2: Connect components to the Redux store",
        ],
      },
      {
        type: "Link",
        url: "https://react-state-management-guide.com",
        text: "Full Guide",
      },
    ],
  },
  {
    postId: "24680",
    title: "Efficient Data Structures in Python",
    author: "MichaelChen",
    icon: "FaLightbulb",
    creationDate: "2024-05-10T09:00:00Z",
    lastUpdated: "2024-05-12T13:20:15Z",
    description:
      "Discover optimized data structures for better performance in Python programming.",
    tags: "Python, Data Structures, Optimization",
    content: [
      {
        type: "Header",
        text: "Introduction",
      },
      {
        type: "Paragraph",
        text: "This guide explores various data structures in Python and how they can be used to improve the efficiency of your code.",
      },
      {
        type: "Header",
        text: "Lists vs. Sets vs. Dictionaries",
      },
      {
        type: "Paragraph",
        text: "Understand the differences between lists, sets, and dictionaries, and when to use each for optimal performance.",
      },
      {
        type: "Header",
        text: "Custom Data Structures",
      },
      {
        type: "Paragraph",
        text: "Learn how to implement custom data structures tailored to your specific needs.",
      },
      {
        type: "Code Block",
        language: "python",
        code: "class CustomDataStructure:\n    def __init__(self):\n        self.data = []\n    def add_element(self, element):\n        self.data.append(element)\n    def remove_element(self, element):\n        self.data.remove(element)",
      },
      {
        type: "Header",
        text: "Performance Optimization",
      },
      {
        type: "Paragraph",
        text: "Discover techniques for optimizing the performance of your data structures, such as using built-in functions and algorithms.",
      },
      {
        type: "List",
        ordered: true,
        items: [
          "Step 1: Choose the right data structure",
          "Step 2: Implement custom data structures if needed",
          "Step 3: Optimize performance",
        ],
      },
      {
        type: "Link",
        url: "https://python-data-structures-guide.com",
        text: "Full Guide",
      },
    ],
  },
];
