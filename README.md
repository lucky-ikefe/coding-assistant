### **Coding Assistant AI**

🚀 **Your AI-powered expert for debugging, code optimization, and function generation!**

---

## **🔹 Overview**

Coding Assistant AI is an intelligent code assistant designed to help developers debug, and generate clean, efficient code. Whether you need error detection, or function creation, this tool provides structured and well-documented solutions.

It leverages **Groq's AI model** to analyze code, fix errors, and improve efficiency while maintaining best practices for various programming languages and frameworks.

---

## **🔹 Features**

✅ **Debugging Assistance** – Detects syntax errors, logic flaws, and best-practice violations.  
✅ **Error Fixing & Optimization** – Corrects errors while preserving original intent and improving performance.  
✅ **Function Generation** – Creates efficient, well-documented functions based on provided requirements.  
✅ **Code Explanation** – Provides detailed explanations for detected issues and fixes.

---

## **🔹 Installation & Setup**

1️⃣ **Clone the Repository:**

```sh
git clone https://github.com/lucky-ikefe/coding-assistant.git
cd coding-assistant
```

2️⃣ **Install Dependencies:**

```sh
npm install
```

3️⃣ **Set Up Environment Variables:**  
Create a `.env` file in the root directory and add:

```sh
GROQ_API_KEY=your_api_key_here
```

4️⃣ **Run the Application:**

```sh
npm start
```

---

## **🔹 Usage**

### **Debugging Code**

Call the `debugCode` function with an array of messages:

```ts
import { debugCode } from "./debug"

const messages = [{ role: "user", content: "const x = 5 console.log(x)" }]

const result = await debugCode(messages)
console.log(result)
```

### **Generating Functions**

Call the `createFunction` function with an array of messages:

```ts
import { createFunction } from "./create"

const messages = [
  { role: "user", content: "Write a function that sorts an array of numbers" },
]

const result = await createFunction(messages)
console.log(result)
```

---

## **🔹 Contributing**

Contributions are welcome! If you’d like to improve the assistant, follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes and commit (`git commit -m "Add new feature"`)
4. Push to your fork (`git push origin feature-branch`)
5. Open a Pull Request

---

## **🔹 License**

This project is licensed under the **MIT License**.

---

Let me know if you'd like to customize this further! 🚀
