# 🚀 DSA Visualizer

A comprehensive **Data Structures and Algorithms Visualizer** built with Next.js, React, and TypeScript. This interactive web application helps students and developers understand complex algorithms through step-by-step visual animations.

![DSA Visualizer Demo](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=DSA+Visualizer+Demo)

## ✨ Features

### 🔄 Sorting Algorithms
- **Bubble Sort** - Compare adjacent elements and swap
- **Selection Sort** - Find minimum and place at beginning
- **Insertion Sort** - Insert elements in sorted portion
- **Merge Sort** - Divide and conquer approach
- **Quick Sort** - Partition-based sorting
- **Heap Sort** - Binary heap-based sorting

### 🔍 Searching Algorithms
- **Linear Search** - Sequential element search
- **Binary Search** - Divide and conquer search
- **Depth-First Search (DFS)** - Graph traversal
- **Breadth-First Search (BFS)** - Level-order traversal

### 📊 Data Structures
- **Arrays** - Insert, delete, and traverse operations
- **Stacks** - LIFO operations (push, pop, peek)
- **Queues** - FIFO operations (enqueue, dequeue, peek)
- **Linked Lists** - Singly, doubly, and circular variants
- **Binary Trees** - Tree traversal and operations
- **Binary Search Trees** - Insert, delete, search operations
- **Graphs** - Directed and undirected graph operations

### 🧮 Dynamic Programming
- **Fibonacci Sequence** - Multiple approaches (tabulation, memoization, space-optimized)
- **Longest Common Subsequence** - String comparison algorithm
- **0/1 Knapsack Problem** - Optimization problem
- **Coin Change Problem** - Minimum coins needed

### 🔙 Backtracking Algorithms
- **N-Queens Problem** - Place N queens on chessboard
- **Sudoku Solver** - Solve 9x9 Sudoku puzzles
- **Maze Solving** - Find path through maze
- **Permutation Generator** - Generate all permutations

### 🎨 Enhanced Features
- **Interactive Controls** - Play, pause, reset, step-by-step execution
- **Speed Control** - Adjust animation speed (0.5x to 3x)
- **Theme Support** - Dark and light mode
- **Responsive Design** - Works on desktop and mobile
- **Algorithm Info** - Time/space complexity and explanations
- **Random Data Generation** - Generate random arrays, matrices, and graphs
- **Multiple Variants** - Choose different algorithm approaches
- **Visual Feedback** - Color-coded elements and step descriptions

## 🛠️ Technologies Used

- **Frontend Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **Animations**: CSS Transitions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/abhimnyu09/dsa-visualizer.git
   cd dsa-visualizer
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 📖 Usage Guide

### Basic Navigation
1. **Select Category** - Choose from Sorting, Searching, Data Structures, etc.
2. **Pick Algorithm** - Select the specific algorithm to visualize
3. **Configure Input** - Set array size, input values, or use random generation
4. **Control Playback** - Use play/pause buttons and speed controls
5. **Step Through** - Use step-by-step mode for detailed analysis

### Algorithm-Specific Features

#### Sorting Algorithms
- Adjust array size (5-50 elements)
- Generate random arrays or input custom values
- Watch elements being compared and swapped in real-time

#### Graph Algorithms
- Add vertices and edges interactively
- Choose between directed and undirected graphs
- Visualize traversal paths with different colors

#### Dynamic Programming
- Select different approaches (tabulation vs memoization)
- See the DP table being filled step by step
- Compare time and space complexities

#### Backtracking
- Generate random problem instances
- Watch the algorithm explore and backtrack
- See the final solution highlighted

## 🎯 Key Features Explained

### Visual Elements
- 🔴 **Red**: Elements being compared
- 🟡 **Yellow**: Elements being moved/swapped
- 🟢 **Green**: Sorted/processed elements
- 🔵 **Blue**: Current position/active element
- ⚫ **Gray**: Unprocessed elements

### Control Panel
- ▶️ **Play**: Start/resume animation
- ⏸️ **Pause**: Pause current animation
- 🔄 **Reset**: Reset to initial state
- ⏭️ **Step**: Execute one step at a time
- 🎚️ **Speed**: Adjust animation speed

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- 💻 **Desktop** (1024px+)
- 📱 **Tablet** (768px - 1023px)
- 📱 **Mobile** (320px - 767px)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Ways to Contribute
1. **Report Bugs** - Open an issue with bug details
2. **Suggest Features** - Propose new algorithms or improvements
3. **Submit Pull Requests** - Fix bugs or add new features
4. **Improve Documentation** - Enhance README or code comments

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Use meaningful variable names
- Add comments for complex logic
- Ensure responsive design

## 📋 Roadmap

### Upcoming Features
- [ ] **More Algorithms**: Radix Sort, Counting Sort, Dijkstra's Algorithm
- [ ] **Advanced Trees**: AVL Trees, Red-Black Trees, B-Trees
- [ ] **Export Functionality**: Save visualizations as GIF/MP4
- [ ] **Algorithm Comparison**: Side-by-side algorithm comparison
- [ ] **Code Display**: Show actual algorithm code alongside visualization
- [ ] **Performance Metrics**: Real-time performance statistics
- [ ] **Custom Input**: Upload custom datasets
- [ ] **Sharing**: Share visualizations via URL

## 🐛 Known Issues

- Large datasets (>100 elements) may cause performance issues
- Some animations may not work smoothly on older browsers
- Mobile touch interactions could be improved

## 👨‍💻 Author

**Abhimanyu Sharma**
- GitHub: [@abhimnyu09](https://github.com/abhimnyu09)
- LinkedIn: [LinkedIn](linkedin.com/in/abhimanyu-sharma-2b2130292)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Lucide React](https://lucide.dev/) - Beautiful icons
- Algorithm visualizations inspired by [VisuAlgo](https://visualgo.net/)

*Happy Learning! 🚀*
