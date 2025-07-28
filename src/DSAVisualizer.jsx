"use client"
import { useState, useEffect, useRef } from "react"

// Main App Component
export default function DSAVisualizer() {
  const [selectedCategory, setSelectedCategory] = useState("sorting")
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble")
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(100)
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90])
  const [currentStep, setCurrentStep] = useState(-1)
  const [steps, setSteps] = useState([])
  const [searchTarget, setSearchTarget] = useState(25)
  const [inputValue, setInputValue] = useState("")
  const [theme, setTheme] = useState("dark")
  const [showHelp, setShowHelp] = useState(false)

  // User choice states
  const [traversalType, setTraversalType] = useState("inorder")
  const [dpApproach, setDpApproach] = useState("tabulation")
  const [graphType, setGraphType] = useState("directed")
  const [linkedListType, setLinkedListType] = useState("singly") // New state for linked list type
  const [insertPosition, setInsertPosition] = useState("")
  const [edgeFrom, setEdgeFrom] = useState("")
  const [edgeTo, setEdgeTo] = useState("")
  const [edgeWeight, setEdgeWeight] = useState("")

  // Data structure states
  const [stackData, setStackData] = useState([10, 20, 30])
  const [queueData, setQueueData] = useState([10, 20, 30])
  const [linkedListData, setLinkedListData] = useState([
    { id: 0, value: 10, next: 1 },
    { id: 1, value: 20, next: 2 },
    { id: 2, value: 30, next: null },
  ])
  const [treeData, setTreeData] = useState({
    value: 50,
    left: { value: 30, left: { value: 20 }, right: { value: 40 } },
    right: { value: 70, left: { value: 60 }, right: { value: 80 } },
  })
  const [graphData, setGraphData] = useState({
    nodes: [
      { id: 0, value: "A", x: 100, y: 100 },
      { id: 1, value: "B", x: 200, y: 50 },
      { id: 2, value: "C", x: 200, y: 150 },
      { id: 3, value: "D", x: 300, y: 100 },
    ],
    edges: [
      { from: 0, to: 1, weight: 4 },
      { from: 0, to: 2, weight: 2 },
      { from: 1, to: 3, weight: 3 },
      { from: 2, to: 3, weight: 1 },
    ],
  })

  // New states for enhanced algorithms
  const [sudokuBoard, setSudokuBoard] = useState([
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ])

  const [mazeData, setMazeData] = useState({
    maze: [
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 1, 0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    ],
    start: [0, 0],
    end: [9, 9],
  })

  const timeoutRef = useRef(null)

  // Algorithm definitions with descriptions
  const algorithms = {
    sorting: {
      name: "Sorting Algorithms",
      description: "Algorithms that arrange elements in a specific order",
      items: {
        bubble: {
          name: "Bubble Sort",
          complexity: "O(n²)",
          description: "Compares adjacent elements and swaps them if they're in wrong order",
          timeComplexity: "O(n²)",
          spaceComplexity: "O(1)",
        },
        selection: {
          name: "Selection Sort",
          complexity: "O(n²)",
          description: "Finds minimum element and places it at the beginning",
          timeComplexity: "O(n²)",
          spaceComplexity: "O(1)",
        },
        insertion: {
          name: "Insertion Sort",
          complexity: "O(n²)",
          description: "Builds sorted array one element at a time",
          timeComplexity: "O(n²)",
          spaceComplexity: "O(1)",
        },
        merge: {
          name: "Merge Sort",
          complexity: "O(n log n)",
          description: "Divides array and merges sorted subarrays",
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(n)",
        },
        quick: {
          name: "Quick Sort",
          complexity: "O(n log n)",
          description: "Uses pivot to partition array into smaller and larger elements",
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(log n)",
        },
        heap: {
          name: "Heap Sort",
          complexity: "O(n log n)",
          description: "Uses heap data structure to sort elements",
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(1)",
        },
      },
    },
    searching: {
      name: "Searching Algorithms",
      description: "Algorithms that find specific elements in data structures",
      items: {
        linear: {
          name: "Linear Search",
          complexity: "O(n)",
          description: "Checks each element sequentially until target is found",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
        },
        binary: {
          name: "Binary Search",
          complexity: "O(log n)",
          description: "Divides sorted array in half to find target efficiently",
          timeComplexity: "O(log n)",
          spaceComplexity: "O(1)",
        },
        dfs: {
          name: "Depth-First Search",
          complexity: "O(V + E)",
          description: "Explores as far as possible along each branch before backtracking",
          timeComplexity: "O(V + E)",
          spaceComplexity: "O(V)",
        },
        bfs: {
          name: "Breadth-First Search",
          complexity: "O(V + E)",
          description: "Explores all neighbors at current depth before going deeper",
          timeComplexity: "O(V + E)",
          spaceComplexity: "O(V)",
        },
      },
    },
    arrays: {
      name: "Array Operations",
      description: "Basic operations performed on arrays",
      items: {
        insertion: {
          name: "Array Insertion",
          complexity: "O(n)",
          description: "Adds element at specific position, shifting others",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
        },
        deletion: {
          name: "Array Deletion",
          complexity: "O(n)",
          description: "Removes element at specific position, shifting others",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
        },
        traversal: {
          name: "Array Traversal",
          complexity: "O(n)",
          description: "Visits each element in the array sequentially",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
        },
      },
    },
    linkedList: {
      name: "Linked Lists",
      description: "Linear data structure where elements are stored in nodes",
      items: {
        insertion: {
          name: "Insert Node",
          complexity: "O(1)",
          description: "Adds new node to the linked list",
          timeComplexity: "O(1)",
          spaceComplexity: "O(1)",
        },
        deletion: {
          name: "Delete Node",
          complexity: "O(n)",
          description: "Removes node from the linked list",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
        },
        traversal: {
          name: "Traverse List",
          complexity: "O(n)",
          description: "Visits each node in the linked list",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
        },
      },
    },
    stack: {
      name: "Stack Operations",
      description: "LIFO (Last In, First Out) data structure operations",
      items: {
        push: {
          name: "Stack Push",
          complexity: "O(1)",
          description: "Adds element to the top of the stack",
          timeComplexity: "O(1)",
          spaceComplexity: "O(1)",
        },
        pop: {
          name: "Stack Pop",
          complexity: "O(1)",
          description: "Removes element from the top of the stack",
          timeComplexity: "O(1)",
          spaceComplexity: "O(1)",
        },
        peek: {
          name: "Stack Peek",
          complexity: "O(1)",
          description: "Views the top element without removing it",
          timeComplexity: "O(1)",
          spaceComplexity: "O(1)",
        },
      },
    },
    queue: {
      name: "Queue Operations",
      description: "FIFO (First In, First Out) data structure operations",
      items: {
        enqueue: {
          name: "Queue Enqueue",
          complexity: "O(1)",
          description: "Adds element to the rear of the queue",
          timeComplexity: "O(1)",
          spaceComplexity: "O(1)",
        },
        dequeue: {
          name: "Queue Dequeue",
          complexity: "O(1)",
          description: "Removes element from the front of the queue",
          timeComplexity: "O(1)",
          spaceComplexity: "O(1)",
        },
        peek: {
          name: "Queue Peek",
          complexity: "O(1)",
          description: "Views the front element without removing it",
          timeComplexity: "O(1)",
          spaceComplexity: "O(1)",
        },
      },
    },
    trees: {
      name: "Tree Data Structures",
      description: "Hierarchical data structures with nodes and edges",
      items: {
        binaryTree: {
          name: "Binary Tree Traversal",
          complexity: "O(n)",
          description: "Visits all nodes in specific order (inorder, preorder, postorder)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(h)",
        },
        bst: {
          name: "Binary Search Tree",
          complexity: "O(log n)",
          description: "Binary tree where left child < parent < right child",
          timeComplexity: "O(log n)",
          spaceComplexity: "O(h)",
        },
        insertion: {
          name: "Tree Insertion",
          complexity: "O(log n)",
          description: "Adds new node to the tree maintaining properties",
          timeComplexity: "O(log n)",
          spaceComplexity: "O(h)",
        },
        deletion: {
          name: "Tree Deletion",
          complexity: "O(log n)",
          description: "Removes node from tree maintaining properties",
          timeComplexity: "O(log n)",
          spaceComplexity: "O(h)",
        },
      },
    },
    graphs: {
      name: "Graph Algorithms",
      description: "Algorithms for graph data structures with vertices and edges",
      items: {
        dfs: {
          name: "Graph DFS",
          complexity: "O(V + E)",
          description: "Depth-first traversal of graph vertices",
          timeComplexity: "O(V + E)",
          spaceComplexity: "O(V)",
        },
        bfs: {
          name: "Graph BFS",
          complexity: "O(V + E)",
          description: "Breadth-first traversal of graph vertices",
          timeComplexity: "O(V + E)",
          spaceComplexity: "O(V)",
        },
        dijkstra: {
          name: "Dijkstra's Algorithm",
          complexity: "O(V²)",
          description: "Finds shortest path from source to all vertices",
          timeComplexity: "O(V²)",
          spaceComplexity: "O(V)",
        },
        addVertex: {
          name: "Add Vertex",
          complexity: "O(1)",
          description: "Adds new vertex to the graph",
          timeComplexity: "O(1)",
          spaceComplexity: "O(1)",
        },
        addEdge: {
          name: "Add Edge",
          complexity: "O(1)",
          description: "Adds new edge between two vertices",
          timeComplexity: "O(1)",
          spaceComplexity: "O(1)",
        },
      },
    },
    dynamicProgramming: {
      name: "Dynamic Programming",
      description: "Optimization technique using overlapping subproblems",
      items: {
        fibonacci: {
          name: "Fibonacci Sequence",
          complexity: "O(n)",
          description: "Computes Fibonacci numbers using different approaches",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
        },
        lcs: {
          name: "Longest Common Subsequence",
          complexity: "O(mn)",
          description: "Finds longest subsequence common to two sequences",
          timeComplexity: "O(mn)",
          spaceComplexity: "O(mn)",
        },
        knapsack: {
          name: "0/1 Knapsack",
          complexity: "O(nW)",
          description: "Maximizes value within weight constraint",
          timeComplexity: "O(nW)",
          spaceComplexity: "O(nW)",
        },
        coinChange: {
          name: "Coin Change",
          complexity: "O(nW)",
          description: "Find minimum coins needed to make amount",
          timeComplexity: "O(nW)",
          spaceComplexity: "O(W)",
        },
      },
    },
    backtracking: {
      name: "Backtracking",
      description: "Algorithmic approach that considers searching every possible combination",
      items: {
        nQueens: {
          name: "N-Queens Problem",
          complexity: "O(N!)",
          description: "Places N queens on NxN chessboard so none attack each other",
          timeComplexity: "O(N!)",
          spaceComplexity: "O(N²)",
        },
        sudoku: {
          name: "Sudoku Solver",
          complexity: "O(9^(n*n))",
          description: "Solves 9x9 Sudoku puzzle using backtracking",
          timeComplexity: "O(9^(n*n))",
          spaceComplexity: "O(1)",
        },
        maze: {
          name: "Maze Solving",
          complexity: "O(4^(n*m))",
          description: "Finds path from start to end in a maze",
          timeComplexity: "O(4^(n*m))",
          spaceComplexity: "O(n*m)",
        },
        permutations: {
          name: "Generate Permutations",
          complexity: "O(n!)",
          description: "Generate all permutations of given array",
          timeComplexity: "O(n!)",
          spaceComplexity: "O(n)",
        },
      },
    },
  }

  // Generate random Sudoku board
  const generateRandomSudoku = () => {
    const boards = [
      [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9],
      ],
      [
        [0, 2, 0, 6, 0, 8, 0, 0, 0],
        [5, 8, 0, 0, 0, 9, 7, 0, 0],
        [0, 0, 0, 0, 4, 0, 0, 0, 0],
        [3, 7, 0, 0, 0, 0, 5, 0, 0],
        [6, 0, 0, 0, 0, 0, 0, 0, 4],
        [0, 0, 8, 0, 0, 0, 0, 1, 3],
        [0, 0, 0, 0, 2, 0, 0, 0, 0],
        [0, 0, 9, 8, 0, 0, 0, 3, 6],
        [0, 0, 0, 3, 0, 6, 0, 9, 0],
      ],
      [
        [0, 0, 0, 0, 0, 0, 6, 8, 0],
        [0, 0, 0, 0, 4, 6, 0, 0, 0],
        [7, 0, 0, 0, 0, 0, 0, 0, 9],
        [0, 5, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 6, 0, 0, 0],
        [3, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 4, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 5, 2, 0, 0, 0, 0, 0],
      ],
    ]
    const randomBoard = boards[Math.floor(Math.random() * boards.length)]
    setSudokuBoard(randomBoard)
    reset()
  }

  // Generate random maze
  const generateRandomMaze = () => {
    const mazes = [
      {
        maze: [
          [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
          [0, 1, 1, 0, 1, 0, 1, 1, 1, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
          [0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        ],
        start: [0, 0],
        end: [9, 9],
      },
      {
        maze: [
          [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 1, 0, 1, 1, 1, 1, 1, 1, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
          [1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
          [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        ],
        start: [0, 0],
        end: [9, 9],
      },
      {
        maze: [
          [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
          [1, 1, 0, 1, 0, 1, 1, 1, 1, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
          [0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
        ],
        start: [0, 0],
        end: [9, 9],
      },
    ]
    const randomMaze = mazes[Math.floor(Math.random() * mazes.length)]
    setMazeData(randomMaze)
    reset()
  }

  // Enhanced Algorithm Implementations

  // Bubble Sort - Fixed to maintain sorted state
  const bubbleSort = (arr) => {
    const steps = []
    const n = arr.length
    const tempArr = [...arr]
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          array: [...tempArr],
          comparing: [j, j + 1],
          swapping: false,
          sorted: Array.from({ length: n }, (_, k) => k >= n - i),
          description: `Comparing elements at positions ${j} and ${j + 1}`,
        })
        if (tempArr[j] > tempArr[j + 1]) {
          ;[tempArr[j], tempArr[j + 1]] = [tempArr[j + 1], tempArr[j]]
          steps.push({
            array: [...tempArr],
            comparing: [j, j + 1],
            swapping: true,
            sorted: Array.from({ length: n }, (_, k) => k >= n - i),
            description: `Swapped ${tempArr[j + 1]} and ${tempArr[j]}`,
          })
        }
      }
    }
    steps.push({
      array: [...tempArr],
      comparing: [],
      swapping: false,
      sorted: Array.from({ length: n }, () => true),
      description: "Array is now completely sorted!",
      finalArray: [...tempArr],
    })
    return steps
  }

  // Quick Sort
  const quickSort = (arr) => {
    const steps = []
    const n = arr.length
    const tempArr = [...arr]
    const partition = (low, high) => {
      const pivot = tempArr[high]
      let i = low - 1
      steps.push({
        array: [...tempArr],
        pivot: high,
        partitioning: true,
        range: [low, high],
        description: `Partitioning with pivot ${pivot} at position ${high}`,
      })
      for (let j = low; j < high; j++) {
        steps.push({
          array: [...tempArr],
          comparing: [j, high],
          pivot: high,
          range: [low, high],
          description: `Comparing ${tempArr[j]} with pivot ${pivot}`,
        })
        if (tempArr[j] < pivot) {
          i++
          if (i !== j) {
            ;[tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]]
            steps.push({
              array: [...tempArr],
              swapping: [i, j],
              pivot: high,
              range: [low, high],
              description: `Swapped ${tempArr[j]} and ${tempArr[i]}`,
            })
          }
        }
      }
      ;[tempArr[i + 1], tempArr[high]] = [tempArr[high], tempArr[i + 1]]
      steps.push({
        array: [...tempArr],
        swapping: [i + 1, high],
        pivot: i + 1,
        range: [low, high],
        description: `Placed pivot ${pivot} at correct position ${i + 1}`,
      })
      return i + 1
    }
    const quickSortHelper = (low, high) => {
      if (low < high) {
        const pi = partition(low, high)
        quickSortHelper(low, pi - 1)
        quickSortHelper(pi + 1, high)
      }
    }
    quickSortHelper(0, n - 1)
    steps.push({
      array: [...tempArr],
      sorted: Array.from({ length: n }, () => true),
      description: "Quick sort completed!",
      finalArray: [...tempArr],
    })
    return steps
  }

  // Stack Operations
  const stackPushAlgo = (stack, value) => {
    const steps = []
    const tempStack = [...stack]
    steps.push({
      stack: [...tempStack],
      pushing: true,
      value: value,
      description: `Pushing ${value} onto the stack`,
    })
    tempStack.push(value)
    steps.push({
      stack: [...tempStack],
      pushed: true,
      top: tempStack.length - 1,
      description: `${value} pushed successfully. Stack size: ${tempStack.length}`,
    })
    return steps
  }

  const stackPopAlgo = (stack) => {
    const steps = []
    const tempStack = [...stack]
    if (tempStack.length === 0) {
      steps.push({
        stack: [...tempStack],
        error: "Stack Underflow - Cannot pop from empty stack",
        description: "Error: Stack is empty!",
      })
      return steps
    }
    const poppedValue = tempStack[tempStack.length - 1]
    steps.push({
      stack: [...tempStack],
      popping: true,
      top: tempStack.length - 1,
      description: `Popping ${poppedValue} from the stack`,
    })
    tempStack.pop()
    steps.push({
      stack: [...tempStack],
      popped: true,
      poppedValue: poppedValue,
      description: `${poppedValue} popped successfully. Stack size: ${tempStack.length}`,
    })
    return steps
  }

  // Queue Operations
  const queueEnqueueAlgo = (queue, value) => {
    const steps = []
    const tempQueue = [...queue]
    steps.push({
      queue: [...tempQueue],
      enqueuing: true,
      value: value,
      description: `Enqueuing ${value} to the rear of queue`,
    })
    tempQueue.push(value)
    steps.push({
      queue: [...tempQueue],
      enqueued: true,
      rear: tempQueue.length - 1,
      description: `${value} enqueued successfully. Queue size: ${tempQueue.length}`,
    })
    return steps
  }

  const queueDequeueAlgo = (queue) => {
    const steps = []
    const tempQueue = [...queue]
    if (tempQueue.length === 0) {
      steps.push({
        queue: [...tempQueue],
        error: "Queue Underflow - Cannot dequeue from empty queue",
        description: "Error: Queue is empty!",
      })
      return steps
    }
    const dequeuedValue = tempQueue[0]
    steps.push({
      queue: [...tempQueue],
      dequeuing: true,
      front: 0,
      description: `Dequeuing ${dequeuedValue} from the front of queue`,
    })
    tempQueue.shift()
    steps.push({
      queue: [...tempQueue],
      dequeued: true,
      dequeuedValue: dequeuedValue,
      description: `${dequeuedValue} dequeued successfully. Queue size: ${tempQueue.length}`,
    })
    return steps
  }

  // Enhanced Linked List Operations with different types
  const createLinkedListByType = (data, type) => {
    if (type === "singly") {
      return data
    } else if (type === "doubly") {
      return data.map((node, index) => ({
        ...node,
        prev: index > 0 ? data[index - 1].id : null,
      }))
    } else if (type === "circular") {
      const circularList = [...data]
      if (circularList.length > 0) {
        circularList[circularList.length - 1].next = circularList[0].id
      }
      return circularList
    }
    return data
  }

  // Linked List Operations
  const linkedListInsertion = (list, value, position = 0) => {
    const steps = []
    const tempList = [...list]
    const newId = Math.max(...tempList.map((node) => node.id), -1) + 1
    steps.push({
      linkedList: [...tempList],
      inserting: true,
      position: position,
      value: value,
      description: `Inserting ${value} at position ${position}`,
    })
    if (position === 0) {
      const newNode = { id: newId, value: value, next: tempList.length > 0 ? tempList[0].id : null }
      if (linkedListType === "doubly" && tempList.length > 0) {
        newNode.prev = null
        tempList[0].prev = newId
      }
      tempList.unshift(newNode)
      for (let i = 1; i < tempList.length; i++) {
        if (i === 1) tempList[0].next = tempList[i].id
      }
    } else if (position >= tempList.length) {
      const newNode = { id: newId, value: value, next: null }
      if (linkedListType === "doubly") {
        newNode.prev = tempList.length > 0 ? tempList[tempList.length - 1].id : null
      }
      if (tempList.length > 0) {
        tempList[tempList.length - 1].next = newId
      }
      tempList.push(newNode)
    } else {
      const newNode = { id: newId, value: value, next: tempList[position].id }
      if (linkedListType === "doubly") {
        newNode.prev = position > 0 ? tempList[position - 1].id : null
        tempList[position].prev = newId
      }
      if (position > 0) {
        tempList[position - 1].next = newId
      }
      tempList.splice(position, 0, newNode)
    }

    // Handle circular linking
    if (linkedListType === "circular" && tempList.length > 1) {
      tempList[tempList.length - 1].next = tempList[0].id
    }

    steps.push({
      linkedList: [...tempList],
      inserted: true,
      newNodeId: newId,
      description: `${value} inserted successfully at position ${position}`,
    })
    return steps
  }

  const linkedListTraversal = (list) => {
    const steps = []
    for (let i = 0; i < list.length; i++) {
      steps.push({
        linkedList: [...list],
        traversing: list[i].id,
        currentIndex: i,
        description: `Visiting node ${i + 1} with value ${list[i].value}`,
      })
    }
    steps.push({
      linkedList: [...list],
      completed: true,
      description: "Linked list traversal completed!",
    })
    return steps
  }

  // Tree Traversal
  const binaryTreeTraversal = (tree, type = "inorder") => {
    const steps = []
    const result = []
    const traverse = (node, path = []) => {
      if (!node) return
      if (type === "preorder") {
        result.push(node.value)
        steps.push({
          tree: tree,
          visiting: node.value,
          traversal: [...result],
          path: [...path, node.value],
          type: type,
          description: `Visiting node ${node.value} (preorder: root → left → right)`,
        })
      }
      if (node.left) traverse(node.left, [...path, node.value])
      if (type === "inorder") {
        result.push(node.value)
        steps.push({
          tree: tree,
          visiting: node.value,
          traversal: [...result],
          path: [...path, node.value],
          type: type,
          description: `Visiting node ${node.value} (inorder: left → root → right)`,
        })
      }
      if (node.right) traverse(node.right, [...path, node.value])
      if (type === "postorder") {
        result.push(node.value)
        steps.push({
          tree: tree,
          visiting: node.value,
          traversal: [...result],
          path: [...path, node.value],
          type: type,
          description: `Visiting node ${node.value} (postorder: left → right → root)`,
        })
      }
    }
    traverse(tree)
    steps.push({
      tree: tree,
      traversal: [...result],
      completed: true,
      type: type,
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} traversal completed! Result: [${result.join(", ")}]`,
    })
    return steps
  }

  // Tree Deletion Implementation
  const treeNodeDeletion = (tree, valueToDelete) => {
    const steps = []
    const newTree = JSON.parse(JSON.stringify(tree))
    const deleteNode = (node, value) => {
      if (!node) return null
      steps.push({
        tree: newTree,
        searching: node.value,
        target: value,
        description: `Searching for node ${value}, currently at ${node.value}`,
      })
      if (value < node.value) {
        node.left = deleteNode(node.left, value)
      } else if (value > node.value) {
        node.right = deleteNode(node.right, value)
      } else {
        steps.push({
          tree: newTree,
          deleting: node.value,
          description: `Found node ${value}, proceeding with deletion`,
        })
        if (!node.left) {
          steps.push({
            tree: newTree,
            description: `Node ${value} has no left child, replacing with right child`,
          })
          return node.right
        } else if (!node.right) {
          steps.push({
            tree: newTree,
            description: `Node ${value} has no right child, replacing with left child`,
          })
          return node.left
        }
        let minRight = node.right
        while (minRight.left) {
          minRight = minRight.left
        }
        steps.push({
          tree: newTree,
          replacing: minRight.value,
          description: `Node ${value} has two children, replacing with inorder successor ${minRight.value}`,
        })
        node.value = minRight.value
        node.right = deleteNode(node.right, minRight.value)
      }
      return node
    }
    deleteNode(newTree, valueToDelete)
    steps.push({
      tree: newTree,
      completed: true,
      description: `Deletion of node ${valueToDelete} completed!`,
    })
    return steps
  }

  // Graph DFS
  const graphDFS = (graph, startNode = 0) => {
    const steps = []
    const visited = new Set()
    const stack = [startNode]
    const traversalOrder = []
    steps.push({
      graph: graph,
      stack: [...stack],
      visited: Array.from(visited),
      current: null,
      traversalOrder: [...traversalOrder],
      description: `Starting DFS from node ${graph.nodes[startNode]?.value || startNode}`,
    })
    while (stack.length > 0) {
      const current = stack.pop()
      if (!visited.has(current)) {
        visited.add(current)
        traversalOrder.push(current)
        steps.push({
          graph: graph,
          stack: [...stack],
          visited: Array.from(visited),
          current: current,
          traversalOrder: [...traversalOrder],
          description: `Visiting node ${graph.nodes[current]?.value || current}`,
        })
        const neighbors = graph.edges
          .filter((edge) => edge.from === current)
          .map((edge) => edge.to)
          .filter((neighbor) => !visited.has(neighbor))
          .reverse()
        neighbors.forEach((neighbor) => {
          if (!stack.includes(neighbor)) {
            stack.push(neighbor)
          }
        })
        if (neighbors.length > 0) {
          steps.push({
            graph: graph,
            stack: [...stack],
            visited: Array.from(visited),
            current: current,
            traversalOrder: [...traversalOrder],
            description: `Added neighbors ${neighbors.map((n) => graph.nodes[n]?.value || n).join(", ")} to stack`,
          })
        }
      }
    }
    steps.push({
      graph: graph,
      stack: [],
      visited: Array.from(visited),
      traversalOrder: [...traversalOrder],
      completed: true,
      description: `DFS completed! Traversal order: ${traversalOrder.map((n) => graph.nodes[n]?.value || n).join(" → ")}`,
    })
    return steps
  }

  // Queue Peek Implementation
  const queuePeek = (queue) => {
    const steps = []
    if (queue.length === 0) {
      steps.push({
        queue: [...queue],
        error: "Queue is empty",
        description: "Error: Cannot peek at empty queue",
      })
      return steps
    }
    const frontValue = queue[0]
    steps.push({
      queue: [...queue],
      peeking: true,
      front: 0,
      frontValue: frontValue,
      description: `Front element is ${frontValue} (queue size: ${queue.length})`,
    })
    return steps
  }

  // Enhanced DP with multiple approaches
  const fibonacciDP = (n, approach = "tabulation") => {
    const steps = []
    if (approach === "recursive") {
      return fibonacciRecursive(n, steps)
    } else if (approach === "memoization") {
      return fibonacciMemoization(n, steps)
    } else if (approach === "tabulation") {
      return fibonacciTabulation(n, steps)
    } else if (approach === "spaceOptimized") {
      return fibonacciSpaceOptimized(n, steps)
    }
    return steps
  }

  const fibonacciRecursive = (n, steps, memo = {}) => {
    if (n <= 1) {
      steps.push({
        approach: "recursive",
        computing: n,
        value: n,
        description: `Base case: F(${n}) = ${n}`,
      })
      return n
    }
    steps.push({
      approach: "recursive",
      computing: n,
      description: `Computing F(${n}) = F(${n - 1}) + F(${n - 2})`,
    })
    const left = fibonacciRecursive(n - 1, steps, memo)
    const right = fibonacciRecursive(n - 2, steps, memo)
    const result = left + right
    steps.push({
      approach: "recursive",
      computing: n,
      value: result,
      description: `F(${n}) = ${left} + ${right} = ${result}`,
    })
    return result
  }

  const fibonacciMemoization = (n, steps) => {
    const memo = {}
    const helper = (num) => {
      if (num <= 1) {
        steps.push({
          approach: "memoization",
          memo: { ...memo },
          computing: num,
          value: num,
          description: `Base case: F(${num}) = ${num}`,
        })
        return num
      }
      if (memo[num] !== undefined) {
        steps.push({
          approach: "memoization",
          memo: { ...memo },
          computing: num,
          value: memo[num],
          description: `Found F(${num}) = ${memo[num]} in memo`,
        })
        return memo[num]
      }
      steps.push({
        approach: "memoization",
        memo: { ...memo },
        computing: num,
        description: `Computing F(${num}) = F(${num - 1}) + F(${num - 2})`,
      })
      memo[num] = helper(num - 1) + helper(num - 2)
      steps.push({
        approach: "memoization",
        memo: { ...memo },
        computing: num,
        value: memo[num],
        description: `Stored F(${num}) = ${memo[num]} in memo`,
      })
      return memo[num]
    }
    const result = helper(n)
    steps.push({
      approach: "memoization",
      memo: { ...memo },
      completed: true,
      result: result,
      description: `Memoization completed! F(${n}) = ${result}`,
    })
    return steps
  }

  const fibonacciTabulation = (n, steps) => {
    const dp = new Array(n + 1).fill(0)
    if (n >= 0) dp[0] = 0
    if (n >= 1) dp[1] = 1
    steps.push({
      approach: "tabulation",
      dp: [...dp],
      computing: 0,
      n: n,
      description: `Initializing: F(0) = 0${n >= 1 ? ", F(1) = 1" : ""}`,
    })
    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2]
      steps.push({
        approach: "tabulation",
        dp: [...dp],
        computing: i,
        formula: `F(${i}) = F(${i - 1}) + F(${i - 2}) = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`,
        n: n,
        description: `Computing F(${i}) using previously calculated values`,
      })
    }
    steps.push({
      approach: "tabulation",
      dp: [...dp],
      completed: true,
      n: n,
      result: dp[n],
      description: `Tabulation completed! F(${n}) = ${dp[n]}`,
    })
    return steps
  }

  const fibonacciSpaceOptimized = (n, steps) => {
    if (n <= 1) {
      steps.push({
        approach: "spaceOptimized",
        prev2: 0,
        prev1: n,
        current: n,
        computing: n,
        description: `Base case: F(${n}) = ${n}`,
      })
      return steps
    }
    let prev2 = 0,
      prev1 = 1
    steps.push({
      approach: "spaceOptimized",
      prev2: prev2,
      prev1: prev1,
      computing: 1,
      description: `Initialize: prev2 = 0, prev1 = 1`,
    })
    for (let i = 2; i <= n; i++) {
      const current = prev1 + prev2
      steps.push({
        approach: "spaceOptimized",
        prev2: prev2,
        prev1: prev1,
        current: current,
        computing: i,
        description: `F(${i}) = ${prev1} + ${prev2} = ${current}`,
      })
      prev2 = prev1
      prev1 = current
      steps.push({
        approach: "spaceOptimized",
        prev2: prev2,
        prev1: prev1,
        computing: i,
        description: `Update: prev2 = ${prev2}, prev1 = ${prev1}`,
      })
    }
    steps.push({
      approach: "spaceOptimized",
      prev2: prev2,
      prev1: prev1,
      completed: true,
      result: prev1,
      description: `Space optimized completed! F(${n}) = ${prev1}`,
    })
    return steps
  }

  // NEW: Longest Common Subsequence DP
  const longestCommonSubsequence = (str1 = "ABCDGH", str2 = "AEDFHR") => {
    const steps = []
    const m = str1.length
    const n = str2.length
    const dp = Array(m + 1)
      .fill()
      .map(() => Array(n + 1).fill(0))

    steps.push({
      algorithm: "lcs",
      dp: dp.map((row) => [...row]),
      str1: str1,
      str2: str2,
      computing: [-1, -1],
      description: `Initializing LCS table for strings "${str1}" and "${str2}"`,
    })

    for (let i = 0; i <= m; i++) {
      for (let j = 0; j <= n; j++) {
        if (i === 0 || j === 0) {
          dp[i][j] = 0
          steps.push({
            algorithm: "lcs",
            dp: dp.map((row) => [...row]),
            str1: str1,
            str2: str2,
            computing: [i, j],
            description: `Base case: dp[${i}][${j}] = 0 (empty string)`,
          })
        } else if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1
          steps.push({
            algorithm: "lcs",
            dp: dp.map((row) => [...row]),
            str1: str1,
            str2: str2,
            computing: [i, j],
            match: true,
            description: `Match found: '${str1[i - 1]}' = '${str2[j - 1]}', dp[${i}][${j}] = dp[${i - 1}][${j - 1}] + 1 = ${dp[i][j]}`,
          })
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
          steps.push({
            algorithm: "lcs",
            dp: dp.map((row) => [...row]),
            str1: str1,
            str2: str2,
            computing: [i, j],
            match: false,
            description: `No match: '${str1[i - 1]}' ≠ '${str2[j - 1]}', dp[${i}][${j}] = max(${dp[i - 1][j]}, ${dp[i][j - 1]}) = ${dp[i][j]}`,
          })
        }
      }
    }

    // Backtrack to find the actual LCS
    let lcs = ""
    let i = m,
      j = n
    const backtrackSteps = []
    while (i > 0 && j > 0) {
      if (str1[i - 1] === str2[j - 1]) {
        lcs = str1[i - 1] + lcs
        backtrackSteps.push([i, j])
        i--
        j--
      } else if (dp[i - 1][j] > dp[i][j - 1]) {
        i--
      } else {
        j--
      }
    }

    steps.push({
      algorithm: "lcs",
      dp: dp.map((row) => [...row]),
      str1: str1,
      str2: str2,
      completed: true,
      result: dp[m][n],
      lcs: lcs,
      backtrackSteps: backtrackSteps,
      description: `LCS completed! Length: ${dp[m][n]}, Sequence: "${lcs}"`,
    })

    return steps
  }

  // NEW: 0/1 Knapsack DP
  const knapsackDP = (capacity = 10, weights = [1, 3, 4, 5], values = [1, 4, 5, 7]) => {
    const steps = []
    const n = weights.length
    const dp = Array(n + 1)
      .fill()
      .map(() => Array(capacity + 1).fill(0))

    steps.push({
      algorithm: "knapsack",
      dp: dp.map((row) => [...row]),
      weights: weights,
      values: values,
      capacity: capacity,
      items: weights.map((w, i) => ({ weight: w, value: values[i], index: i })),
      computing: [-1, -1],
      description: `Initializing Knapsack table for capacity ${capacity} with ${n} items`,
    })

    for (let i = 0; i <= n; i++) {
      for (let w = 0; w <= capacity; w++) {
        if (i === 0 || w === 0) {
          dp[i][w] = 0
          steps.push({
            algorithm: "knapsack",
            dp: dp.map((row) => [...row]),
            weights: weights,
            values: values,
            capacity: capacity,
            items: weights.map((weight, idx) => ({ weight: weight, value: values[idx], index: idx })),
            computing: [i, w],
            description: `Base case: dp[${i}][${w}] = 0 (no items or no capacity)`,
          })
        } else if (weights[i - 1] <= w) {
          const include = values[i - 1] + dp[i - 1][w - weights[i - 1]]
          const exclude = dp[i - 1][w]
          dp[i][w] = Math.max(include, exclude)
          steps.push({
            algorithm: "knapsack",
            dp: dp.map((row) => [...row]),
            weights: weights,
            values: values,
            capacity: capacity,
            items: weights.map((weight, idx) => ({ weight: weight, value: values[idx], index: idx })),
            computing: [i, w],
            currentItem: i - 1,
            include: include,
            exclude: exclude,
            description: `Item ${i - 1} (w=${weights[i - 1]}, v=${values[i - 1]}): Include=${include}, Exclude=${exclude}, Choose max=${dp[i][w]}`,
          })
        } else {
          dp[i][w] = dp[i - 1][w]
          steps.push({
            algorithm: "knapsack",
            dp: dp.map((row) => [...row]),
            weights: weights,
            values: values,
            capacity: capacity,
            items: weights.map((weight, idx) => ({ weight: weight, value: values[idx], index: idx })),
            computing: [i, w],
            currentItem: i - 1,
            description: `Item ${i - 1} too heavy (${weights[i - 1]} > ${w}), dp[${i}][${w}] = dp[${i - 1}][${w}] = ${dp[i][w]}`,
          })
        }
      }
    }

    steps.push({
      algorithm: "knapsack",
      dp: dp.map((row) => [...row]),
      weights: weights,
      values: values,
      capacity: capacity,
      items: weights.map((weight, idx) => ({ weight: weight, value: values[idx], index: idx })),
      completed: true,
      result: dp[n][capacity],
      description: `Knapsack completed! Maximum value: ${dp[n][capacity]}`,
    })

    return steps
  }

  // NEW: Coin Change DP
  const coinChangeDP = (amount = 11, coins = [1, 2, 5]) => {
    const steps = []
    const dp = Array(amount + 1).fill(Number.POSITIVE_INFINITY)
    dp[0] = 0

    steps.push({
      algorithm: "coinChange",
      dp: [...dp],
      coins: coins,
      amount: amount,
      computing: 0,
      description: `Initializing: dp[0] = 0, others = ∞. Target amount: ${amount}`,
    })

    for (let i = 1; i <= amount; i++) {
      steps.push({
        algorithm: "coinChange",
        dp: [...dp],
        coins: coins,
        amount: amount,
        computing: i,
        description: `Computing minimum coins for amount ${i}`,
      })

      for (const coin of coins) {
        if (coin <= i) {
          const newValue = dp[i - coin] + 1
          if (newValue < dp[i]) {
            dp[i] = newValue
            steps.push({
              algorithm: "coinChange",
              dp: [...dp],
              coins: coins,
              amount: amount,
              computing: i,
              currentCoin: coin,
              description: `Using coin ${coin}: dp[${i}] = min(${dp[i] === newValue ? "∞" : dp[i]}, dp[${i - coin}] + 1) = ${dp[i]}`,
            })
          } else {
            steps.push({
              algorithm: "coinChange",
              dp: [...dp],
              coins: coins,
              amount: amount,
              computing: i,
              currentCoin: coin,
              description: `Coin ${coin} doesn't improve: dp[${i - coin}] + 1 = ${newValue} ≥ ${dp[i]}`,
            })
          }
        }
      }
    }

    steps.push({
      algorithm: "coinChange",
      dp: [...dp],
      coins: coins,
      amount: amount,
      completed: true,
      result: dp[amount] === Number.POSITIVE_INFINITY ? -1 : dp[amount],
      description: `Coin change completed! Minimum coins needed: ${dp[amount] === Number.POSITIVE_INFINITY ? "impossible" : dp[amount]}`,
    })

    return steps
  }

  // Enhanced Backtracking with more algorithms
  const generatePermutations = (arr) => {
    const steps = []
    const result = []
    const backtrack = (current, remaining) => {
      steps.push({
        algorithm: "permutations",
        current: [...current],
        remaining: [...remaining],
        result: [...result],
        description: `Current permutation: [${current.join(", ")}], Remaining: [${remaining.join(", ")}]`,
      })
      if (remaining.length === 0) {
        result.push([...current])
        steps.push({
          algorithm: "permutations",
          current: [...current],
          remaining: [...remaining],
          result: [...result],
          found: true,
          description: `Found complete permutation: [${current.join(", ")}]`,
        })
        return
      }
      for (let i = 0; i < remaining.length; i++) {
        const next = remaining[i]
        const newRemaining = remaining.filter((_, index) => index !== i)
        current.push(next)
        backtrack(current, newRemaining)
        current.pop()
        steps.push({
          algorithm: "permutations",
          current: [...current],
          remaining: [...remaining],
          result: [...result],
          backtracking: true,
          description: `Backtracking: removed ${next} from current permutation`,
        })
      }
    }
    backtrack([], arr)
    steps.push({
      algorithm: "permutations",
      result: [...result],
      completed: true,
      description: `All permutations generated! Total: ${result.length}`,
    })
    return steps
  }

  // NEW: Sudoku Solver Implementation
  const sudokuSolver = (board) => {
    const steps = []
    const tempBoard = board.map((row) => [...row])

    const isValid = (board, row, col, num) => {
      // Check row
      for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) return false
      }
      // Check column
      for (let x = 0; x < 9; x++) {
        if (board[x][col] === num) return false
      }
      // Check 3x3 box
      const startRow = row - (row % 3)
      const startCol = col - (col % 3)
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i + startRow][j + startCol] === num) return false
        }
      }
      return true
    }

    const solve = (board) => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === 0) {
            steps.push({
              algorithm: "sudoku",
              board: board.map((r) => [...r]),
              currentCell: [row, col],
              description: `Found empty cell at (${row}, ${col})`,
            })

            for (let num = 1; num <= 9; num++) {
              steps.push({
                algorithm: "sudoku",
                board: board.map((r) => [...r]),
                currentCell: [row, col],
                trying: num,
                description: `Trying number ${num} at position (${row}, ${col})`,
              })

              if (isValid(board, row, col, num)) {
                board[row][col] = num
                steps.push({
                  algorithm: "sudoku",
                  board: board.map((r) => [...r]),
                  currentCell: [row, col],
                  placed: num,
                  description: `Placed ${num} at (${row}, ${col}) - valid placement`,
                })

                if (solve(board)) {
                  return true
                }

                board[row][col] = 0
                steps.push({
                  algorithm: "sudoku",
                  board: board.map((r) => [...r]),
                  currentCell: [row, col],
                  backtracking: num,
                  description: `Backtracking: removing ${num} from (${row}, ${col})`,
                })
              } else {
                steps.push({
                  algorithm: "sudoku",
                  board: board.map((r) => [...r]),
                  currentCell: [row, col],
                  invalid: num,
                  description: `${num}  is invalid at (${row}, ${col}) - conflicts found`,
                })
              }
            }
            return false
          }
        }
      }
      return true
    }

    const solved = solve(tempBoard)
    steps.push({
      algorithm: "sudoku",
      board: tempBoard.map((r) => [...r]),
      completed: true,
      solved: solved,
      description: solved ? "Sudoku solved successfully!" : "No solution exists for this Sudoku",
    })

    return steps
  }

  // NEW: Maze Solving Implementation
  const mazeSolver = (mazeData) => {
    const steps = []
    const { maze, start, end } = mazeData
    const rows = maze.length
    const cols = maze[0].length
    const visited = Array(rows)
      .fill()
      .map(() => Array(cols).fill(false))
    const path = []

    const isValid = (row, col) => {
      return row >= 0 && row < rows && col >= 0 && col < cols && maze[row][col] !== 1 && !visited[row][col]
    }

    const solve = (row, col) => {
      steps.push({
        algorithm: "maze",
        maze: maze.map((r) => [...r]),
        visited: visited.map((r) => [...r]),
        currentPos: [row, col],
        path: [...path],
        description: `Exploring position (${row}, ${col})`,
      })

      if (row === end[0] && col === end[1]) {
        path.push([row, col])
        steps.push({
          algorithm: "maze",
          maze: maze.map((r) => [...r]),
          visited: visited.map((r) => [...r]),
          currentPos: [row, col],
          path: [...path],
          found: true,
          description: `Reached destination at (${row}, ${col})!`,
        })
        return true
      }

      visited[row][col] = true
      path.push([row, col])

      steps.push({
        algorithm: "maze",
        maze: maze.map((r) => [...r]),
        visited: visited.map((r) => [...r]),
        currentPos: [row, col],
        path: [...path],
        description: `Marked (${row}, ${col}) as visited and added to path`,
      })

      // Try all 4 directions: up, right, down, left
      const directions = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
      ]
      const dirNames = ["up", "right", "down", "left"]

      for (let i = 0; i < directions.length; i++) {
        const [dr, dc] = directions[i]
        const newRow = row + dr
        const newCol = col + dc

        steps.push({
          algorithm: "maze",
          maze: maze.map((r) => [...r]),
          visited: visited.map((r) => [...r]),
          currentPos: [row, col],
          path: [...path],
          exploring: [newRow, newCol],
          direction: dirNames[i],
          description: `Checking ${dirNames[i]} direction: (${newRow}, ${newCol})`,
        })

        if (isValid(newRow, newCol)) {
          if (solve(newRow, newCol)) {
            return true
          }
        } else {
          steps.push({
            algorithm: "maze",
            maze: maze.map((r) => [...r]),
            visited: visited.map((r) => [...r]),
            currentPos: [row, col],
            path: [...path],
            blocked: [newRow, newCol],
            description: `Cannot go ${dirNames[i]}: (${newRow}, ${newCol}) is blocked or out of bounds`,
          })
        }
      }

      // Backtrack
      path.pop()
      steps.push({
        algorithm: "maze",
        maze: maze.map((r) => [...r]),
        visited: visited.map((r) => [...r]),
        currentPos: [row, col],
        path: [...path],
        backtracking: true,
        description: `Backtracking from (${row}, ${col}) - no valid path found`,
      })

      return false
    }

    const solved = solve(start[0], start[1])
    steps.push({
      algorithm: "maze",
      maze: maze.map((r) => [...r]),
      visited: visited.map((r) => [...r]),
      path: [...path],
      completed: true,
      solved: solved,
      description: solved ? "Maze solved! Path found." : "No solution exists for this maze",
    })

    return steps
  }

  // Graph operations
  const addGraphVertex = (graph, value) => {
    const steps = []
    const newGraph = JSON.parse(JSON.stringify(graph))
    const newId = newGraph.nodes.length
    const newNode = {
      id: newId,
      value: value || String.fromCharCode(65 + newId),
      x: 100 + (newId % 4) * 100,
      y: 100 + Math.floor(newId / 4) * 100,
    }
    steps.push({
      graph: newGraph,
      adding: "vertex",
      newVertex: newNode,
      description: `Adding new vertex ${newNode.value} at position (${newNode.x}, ${newNode.y})`,
    })
    newGraph.nodes.push(newNode)
    steps.push({
      graph: newGraph,
      added: "vertex",
      newVertex: newNode,
      description: `Vertex ${newNode.value} added successfully`,
    })
    return steps
  }

  // FIXED: Graph Edge Addition with proper node name display
  const addGraphEdge = (graph, fromName, toName, weight, isDirected = true) => {
    const steps = []
    const newGraph = JSON.parse(JSON.stringify(graph))

    // Find nodes by name instead of index
    const fromNode = newGraph.nodes.find((node) => node.value === fromName)
    const toNode = newGraph.nodes.find((node) => node.value === toName)

    if (!fromNode || !toNode) {
      steps.push({
        graph: newGraph,
        error: "Invalid vertex names",
        description: `Error: Could not find vertices "${fromName}" or "${toName}"`,
      })
      return steps
    }

    const from = fromNode.id
    const to = toNode.id
    const newEdge = { from: from, to: to, weight: weight }

    steps.push({
      graph: newGraph,
      adding: "edge",
      newEdge: newEdge,
      description: `Adding ${isDirected ? "directed" : "undirected"} edge from ${fromName} to ${toName} with weight ${weight}`,
    })

    newGraph.edges.push(newEdge)

    if (!isDirected) {
      const reverseEdge = { from: to, to: from, weight: weight }
      newGraph.edges.push(reverseEdge)
      steps.push({
        graph: newGraph,
        adding: "edge",
        newEdge: reverseEdge,
        description: `Adding reverse edge for undirected graph`,
      })
    }

    steps.push({
      graph: newGraph,
      added: "edge",
      description: `Edge added successfully`,
    })

    return steps
  }

  // Generate algorithm steps
  const generateSteps = () => {
    try {
      switch (selectedAlgorithm) {
        case "bubble":
          return bubbleSort(array)
        case "selection":
          return selectionSort(array)
        case "insertion":
          if (selectedCategory === "arrays") {
            const pos = insertPosition ? Number.parseInt(insertPosition) : Math.floor(array.length / 2)
            return arrayInsertion(array, Number.parseInt(inputValue) || 0, pos)
          } else if (selectedCategory === "linkedList") {
            const pos = insertPosition ? Number.parseInt(insertPosition) : 0
            return linkedListInsertion(linkedListData, Number.parseInt(inputValue) || 0, pos)
          }
          return insertionSort(array)
        case "merge":
          return mergeSort(array)
        case "quick":
          return quickSort(array)
        case "heap":
          return heapSort(array)
        case "linear":
          return linearSearch(array, searchTarget)
        case "binary":
          return binarySearch(array, searchTarget)
        case "deletion":
          if (selectedCategory === "arrays") {
            const pos = insertPosition ? Number.parseInt(insertPosition) : Math.floor(array.length / 2)
            return arrayDeletion(array, pos)
          } else if (selectedCategory === "linkedList") {
            const pos = insertPosition ? Number.parseInt(insertPosition) : 1
            return linkedListDeletion(linkedListData, pos)
          } else if (selectedCategory === "trees") {
            return treeNodeDeletion(treeData, Number.parseInt(inputValue) || 50)
          }
          return []
        case "traversal":
          if (selectedCategory === "arrays") {
            return arrayTraversal(array)
          } else if (selectedCategory === "linkedList") {
            return linkedListTraversal(linkedListData)
          }
          return []
        case "push":
          return stackPushAlgo(stackData, Number.parseInt(inputValue) || 0)
        case "pop":
          return stackPopAlgo(stackData)
        case "peek":
          if (selectedCategory === "stack") {
            return stackPeek(stackData)
          } else if (selectedCategory === "queue") {
            return queuePeek(queueData)
          }
          return []
        case "enqueue":
          return queueEnqueueAlgo(queueData, Number.parseInt(inputValue) || 0)
        case "dequeue":
          return queueDequeueAlgo(queueData)
        case "binaryTree":
          return binaryTreeTraversal(treeData, traversalType)
        case "bst":
          return binaryTreeTraversal(treeData, traversalType)
        case "dfs":
          if (selectedCategory === "graphs") {
            return graphDFS(graphData, 0)
          } else if (selectedCategory === "searching") {
            return graphDFS(graphData, 0)
          }
          return []
        case "bfs":
          if (selectedCategory === "graphs") {
            return graphBFS(graphData, 0)
          } else if (selectedCategory === "searching") {
            return graphBFS(graphData, 0)
          }
          return []
        case "addVertex":
          return addGraphVertex(graphData, inputValue)
        case "addEdge":
          const fromName = edgeFrom || "A"
          const toName = edgeTo || "B"
          const weight = Number.parseInt(edgeWeight) || 1
          return addGraphEdge(graphData, fromName, toName, weight, graphType === "directed")
        case "fibonacci":
          return fibonacciDP(Number.parseInt(inputValue) || 10, dpApproach)
        case "lcs":
          return longestCommonSubsequence()
        case "knapsack":
          return knapsackDP()
        case "coinChange":
          return coinChangeDP()
        case "nQueens":
          return nQueens(Number.parseInt(inputValue) || 4)
        case "sudoku":
          return sudokuSolver(sudokuBoard)
        case "maze":
          return mazeSolver(mazeData)
        case "permutations":
          const arr = inputValue ? inputValue.split(",").map((x) => x.trim()) : ["A", "B", "C"]
          return generatePermutations(arr)
        default:
          return []
      }
    } catch (error) {
      console.error("Error generating steps:", error)
      return []
    }
  }

  // Keep existing algorithm implementations but fix them
  const selectionSort = (arr) => {
    const steps = []
    const n = arr.length
    const tempArr = [...arr]
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i
      steps.push({
        array: [...tempArr],
        comparing: [i],
        minIndex: minIdx,
        sorted: Array.from({ length: n }, (_, k) => k < i),
        description: `Finding minimum element in unsorted portion starting from index ${i}`,
      })
      for (let j = i + 1; j < n; j++) {
        steps.push({
          array: [...tempArr],
          comparing: [minIdx, j],
          minIndex: minIdx,
          sorted: Array.from({ length: n }, (_, k) => k < i),
          description: `Comparing ${tempArr[j]} with current minimum ${tempArr[minIdx]}`,
        })
        if (tempArr[j] < tempArr[minIdx]) {
          minIdx = j
        }
      }
      if (minIdx !== i) {
        ;[tempArr[i], tempArr[minIdx]] = [tempArr[minIdx], tempArr[i]]
        steps.push({
          array: [...tempArr],
          comparing: [i, minIdx],
          swapping: true,
          sorted: Array.from({ length: n }, (_, k) => k <= i),
          description: `Swapped ${tempArr[minIdx]} with ${tempArr[i]} - minimum placed at position ${i}`,
        })
      }
    }
    steps.push({
      array: [...tempArr],
      comparing: [],
      sorted: Array.from({ length: n }, () => true),
      description: "Selection sort completed!",
      finalArray: [...tempArr],
    })
    return steps
  }

  const insertionSort = (arr) => {
    const steps = []
    const n = arr.length
    const tempArr = [...arr]
    for (let i = 1; i < n; i++) {
      const key = tempArr[i]
      let j = i - 1
      steps.push({
        array: [...tempArr],
        comparing: [i],
        key: key,
        keyIndex: i,
        sorted: Array.from({ length: n }, (_, k) => k < i),
        description: `Inserting ${key} into sorted portion`,
      })
      while (j >= 0 && tempArr[j] > key) {
        steps.push({
          array: [...tempArr],
          comparing: [j, j + 1],
          key: key,
          keyIndex: i,
          shifting: true,
          sorted: Array.from({ length: n }, (_, k) => k < i),
          description: `${tempArr[j]} > ${key}, shifting ${tempArr[j]} to the right`,
        })
        tempArr[j + 1] = tempArr[j]
        j--
        steps.push({
          array: [...tempArr],
          comparing: [j + 1, j + 2],
          key: key,
          keyIndex: i,
          shifted: true,
          sorted: Array.from({ length: n }, (_, k) => k < i),
          description: `Shifted ${tempArr[j + 2]} to position ${j + 2}`,
        })
      }
      tempArr[j + 1] = key
      steps.push({
        array: [...tempArr],
        comparing: [j + 1],
        key: key,
        inserted: true,
        sorted: Array.from({ length: n }, (_, k) => k <= i),
        description: `Inserted ${key} at position ${j + 1}`,
      })
    }
    steps.push({
      array: [...tempArr],
      comparing: [],
      sorted: Array.from({ length: n }, () => true),
      description: "Insertion sort completed!",
      finalArray: [...tempArr],
    })
    return steps
  }

  // Keep other existing implementations but add finalArray to maintain sorted state
  const mergeSort = (arr) => {
    const steps = []
    const n = arr.length
    const tempArr = [...arr]
    const merge = (left, mid, right) => {
      const leftArr = tempArr.slice(left, mid + 1)
      const rightArr = tempArr.slice(mid + 1, right + 1)
      let i = 0,
        j = 0,
        k = left
      steps.push({
        array: [...tempArr],
        dividing: true,
        leftSection: Array.from({ length: n }, (_, idx) => idx >= left && idx <= mid),
        rightSection: Array.from({ length: n }, (_, idx) => idx >= mid + 1 && idx <= right),
        description: `Merging subarrays [${left}..${mid}] and [${mid + 1}..${right}]`,
      })
      while (i < leftArr.length && j < rightArr.length) {
        steps.push({
          array: [...tempArr],
          comparing: [left + i, mid + 1 + j],
          merging: true,
          leftSection: Array.from({ length: n }, (_, idx) => idx >= left && idx <= mid),
          rightSection: Array.from({ length: n }, (_, idx) => idx >= mid + 1 && idx <= right),
          description: `Comparing ${leftArr[i]} and ${rightArr[j]}`,
        })
        if (leftArr[i] <= rightArr[j]) {
          tempArr[k] = leftArr[i]
          i++
        } else {
          tempArr[k] = rightArr[j]
          j++
        }
        steps.push({
          array: [...tempArr],
          comparing: [k],
          merged: true,
          leftSection: Array.from({ length: n }, (_, idx) => idx >= left && idx <= mid),
          rightSection: Array.from({ length: n }, (_, idx) => idx >= mid + 1 && idx <= right),
          description: `Placed ${tempArr[k]} at position ${k}`,
        })
        k++
      }
      while (i < leftArr.length) {
        tempArr[k] = leftArr[i]
        steps.push({
          array: [...tempArr],
          comparing: [k],
          merged: true,
          description: `Copying remaining element ${leftArr[i]} from left subarray`,
        })
        i++
        k++
      }
      while (j < rightArr.length) {
        tempArr[k] = rightArr[j]
        steps.push({
          array: [...tempArr],
          comparing: [k],
          merged: true,
          description: `Copying remaining element ${rightArr[j]} from right subarray`,
        })
        j++
        k++
      }
    }
    const mergeSortHelper = (left, right) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2)
        mergeSortHelper(left, mid)
        mergeSortHelper(mid + 1, right)
        merge(left, mid, right)
      }
    }
    mergeSortHelper(0, n - 1)
    steps.push({
      array: [...tempArr],
      comparing: [],
      sorted: Array.from({ length: n }, () => true),
      description: "Merge sort completed!",
      finalArray: [...tempArr],
    })
    return steps
  }

  const heapSort = (arr) => {
    const steps = []
    const n = arr.length
    const tempArr = [...arr]
    const heapify = (n, i) => {
      let largest = i
      const left = 2 * i + 1
      const right = 2 * i + 2
      steps.push({
        array: [...tempArr],
        heapifying: [i, left, right].filter((idx) => idx < n),
        largest: largest,
        description: `Heapifying subtree rooted at index ${i}`,
      })
      if (left < n && tempArr[left] > tempArr[largest]) {
        largest = left
      }
      if (right < n && tempArr[right] > tempArr[largest]) {
        largest = right
      }
      if (largest !== i) {
        ;[tempArr[i], tempArr[largest]] = [tempArr[largest], tempArr[i]]
        steps.push({
          array: [...tempArr],
          swapping: [i, largest],
          largest: largest,
          description: `Swapped ${tempArr[largest]} with ${tempArr[i]} to maintain heap property`,
        })
        heapify(n, largest)
      }
    }
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(n, i)
    }
    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      ;[tempArr[0], tempArr[i]] = [tempArr[i], tempArr[0]]
      steps.push({
        array: [...tempArr],
        swapping: [0, i],
        sorted: Array.from({ length: n }, (_, k) => k >= i),
        description: `Moved largest element ${tempArr[i]} to sorted position ${i}`,
      })
      heapify(i, 0)
    }
    steps.push({
      array: [...tempArr],
      sorted: Array.from({ length: n }, () => true),
      description: "Heap sort completed!",
      finalArray: [...tempArr],
    })
    return steps
  }

  // Keep other existing implementations
  const linearSearch = (arr, target) => {
    const steps = []
    for (let i = 0; i < arr.length; i++) {
      steps.push({
        array: [...arr],
        checking: i,
        found: arr[i] === target ? i : -1,
        target: target,
        description: `Checking element at index ${i}: ${arr[i]} ${arr[i] === target ? "= target found!" : "≠ target"}`,
      })
      if (arr[i] === target) {
        break
      }
    }
    return steps
  }

  const binarySearch = (arr, target) => {
    const steps = []
    const sortedArr = [...arr].sort((a, b) => a - b)
    let left = 0
    let right = sortedArr.length - 1
    steps.push({
      array: [...sortedArr],
      left: left,
      right: right,
      target: target,
      description: `Searching for ${target} in sorted array. Initial range: [${left}, ${right}]`,
    })
    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      steps.push({
        array: [...sortedArr],
        left: left,
        right: right,
        mid: mid,
        target: target,
        found: sortedArr[mid] === target ? mid : -1,
        description: `Mid = ${mid}, value = ${sortedArr[mid]}. ${
          sortedArr[mid] === target
            ? "Target found!"
            : sortedArr[mid] < target
              ? "Target is larger, search right half"
              : "Target is smaller, search left half"
        }`,
      })
      if (sortedArr[mid] === target) {
        break
      } else if (sortedArr[mid] < target) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
    return steps
  }

  // Keep other helper functions
  const arrayInsertion = (arr, value, position) => {
    const steps = []
    const tempArr = [...arr]
    steps.push({
      array: [...tempArr],
      inserting: true,
      position: position,
      value: value,
      description: `Inserting ${value} at position ${position}`,
    })
    tempArr.splice(position, 0, value)
    steps.push({
      array: [...tempArr],
      inserted: true,
      position: position,
      description: `${value} inserted successfully at position ${position}`,
    })
    return steps
  }

  const arrayDeletion = (arr, position) => {
    const steps = []
    const tempArr = [...arr]
    if (position >= tempArr.length) {
      steps.push({
        array: [...tempArr],
        error: "Index out of bounds",
        description: `Error: Position ${position} is out of bounds`,
      })
      return steps
    }
    const deletedValue = tempArr[position]
    steps.push({
      array: [...tempArr],
      deleting: true,
      position: position,
      description: `Deleting element ${deletedValue} at position ${position}`,
    })
    tempArr.splice(position, 1)
    steps.push({
      array: [...tempArr],
      deleted: true,
      description: `${deletedValue} deleted successfully from position ${position}`,
    })
    return steps
  }

  const arrayTraversal = (arr) => {
    const steps = []
    for (let i = 0; i < arr.length; i++) {
      steps.push({
        array: [...arr],
        traversing: i,
        description: `Visiting element ${arr[i]} at index ${i}`,
      })
    }
    steps.push({
      array: [...arr],
      completed: true,
      description: "Array traversal completed!",
    })
    return steps
  }

  const linkedListDeletion = (list, position) => {
    const steps = []
    const tempList = [...list]
    if (position >= tempList.length) {
      steps.push({
        linkedList: [...tempList],
        error: "Position out of bounds",
        description: `Error: Position ${position} is out of bounds`,
      })
      return steps
    }
    const deletedNode = tempList[position]
    steps.push({
      linkedList: [...tempList],
      deleting: deletedNode.id,
      description: `Deleting node with value ${deletedNode.value} at position ${position}`,
    })
    if (position === 0 && tempList.length > 1) {
      tempList.splice(position, 1)
    } else if (position > 0) {
      tempList[position - 1].next = deletedNode.next
      tempList.splice(position, 1)
    } else {
      tempList.splice(position, 1)
    }
    steps.push({
      linkedList: [...tempList],
      deleted: true,
      description: `Node with value ${deletedNode.value} deleted successfully`,
    })
    return steps
  }

  const stackPeek = (stack) => {
    const steps = []
    if (stack.length === 0) {
      steps.push({
        stack: [...stack],
        error: "Stack is empty",
        description: "Error: Cannot peek at empty stack",
      })
      return steps
    }
    const topValue = stack[stack.length - 1]
    steps.push({
      stack: [...stack],
      peeking: true,
      top: stack.length - 1,
      topValue: topValue,
      description: `Top element is ${topValue} (stack size: ${stack.length})`,
    })
    return steps
  }

  const graphBFS = (graph, startNode = 0) => {
    const steps = []
    const visited = new Set()
    const queue = [startNode]
    const traversalOrder = []
    steps.push({
      graph: graph,
      queue: [...queue],
      visited: Array.from(visited),
      current: null,
      traversalOrder: [...traversalOrder],
      description: `Starting BFS from node ${graph.nodes[startNode]?.value || startNode}`,
    })
    while (queue.length > 0) {
      const current = queue.shift()
      if (!visited.has(current)) {
        visited.add(current)
        traversalOrder.push(current)
        steps.push({
          graph: graph,
          queue: [...queue],
          visited: Array.from(visited),
          current: current,
          traversalOrder: [...traversalOrder],
          description: `Visiting node ${graph.nodes[current]?.value || current}`,
        })
        const neighbors = graph.edges
          .filter((edge) => edge.from === current)
          .map((edge) => edge.to)
          .filter((neighbor) => !visited.has(neighbor))
        neighbors.forEach((neighbor) => {
          if (!queue.includes(neighbor)) {
            queue.push(neighbor)
          }
        })
        if (neighbors.length > 0) {
          steps.push({
            graph: graph,
            queue: [...queue],
            visited: Array.from(visited),
            current: current,
            traversalOrder: [...traversalOrder],
            description: `Added neighbors ${neighbors.map((n) => graph.nodes[n]?.value || n).join(", ")} to queue`,
          })
        }
      }
    }
    steps.push({
      graph: graph,
      queue: [],
      visited: Array.from(visited),
      traversalOrder: [...traversalOrder],
      completed: true,
      description: `BFS completed! Traversal order: ${traversalOrder.map((n) => graph.nodes[n]?.value || n).join(" → ")}`,
    })
    return steps
  }

  const nQueens = (n) => {
    const steps = []
    const board = Array(n)
      .fill()
      .map(() => Array(n).fill(0))
    const solutions = []
    const isSafe = (row, col) => {
      for (let i = 0; i < row; i++) {
        if (board[i][col] === 1) return false
      }
      for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) return false
      }
      for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
        if (board[i][j] === 1) return false
      }
      return true
    }
    const solve = (row) => {
      if (row === n) {
        solutions.push(board.map((row) => [...row]))
        steps.push({
          board: board.map((row) => [...row]),
          solution: true,
          solutionCount: solutions.length,
          description: `Solution ${solutions.length} found! All ${n} queens placed safely.`,
        })
        return
      }
      for (let col = 0; col < n; col++) {
        steps.push({
          board: board.map((row) => [...row]),
          trying: [row, col],
          row: row,
          description: `Trying to place queen at position (${row}, ${col})`,
        })
        if (isSafe(row, col)) {
          board[row][col] = 1
          steps.push({
            board: board.map((row) => [...row]),
            placed: [row, col],
            row: row,
            description: `Queen placed at (${row}, ${col}) - position is safe`,
          })
          solve(row + 1)
          board[row][col] = 0
          steps.push({
            board: board.map((row) => [...row]),
            backtracking: [row, col],
            row: row,
            description: `Backtracking: removing queen from (${row}, ${col})`,
          })
        } else {
          steps.push({
            board: board.map((row) => [...row]),
            unsafe: [row, col],
            row: row,
            description: `Position (${row}, ${col}) is unsafe - queen would be attacked`,
          })
        }
      }
    }
    solve(0)
    return steps
  }

  // Control functions - FIXED: Play button issue
  const togglePlay = () => {
    if (isPlaying) {
      clearTimeout(timeoutRef.current)
      setIsPlaying(false)
    } else {
      // If no steps exist, generate them first
      if (steps.length === 0) {
        const newSteps = generateSteps()
        setSteps(newSteps)
        if (newSteps.length > 0) {
          setCurrentStep(0)
          setIsPlaying(true)
        }
      } else {
        // If we're at the end, restart from beginning
        if (currentStep >= steps.length - 1) {
          setCurrentStep(0)
        }
        setIsPlaying(true)
      }
    }
  }

  const reset = () => {
    clearTimeout(timeoutRef.current)
    setIsPlaying(false)
    setCurrentStep(-1)
    setSteps([])
  }

  const stepForward = () => {
    if (steps.length === 0) {
      const newSteps = generateSteps()
      setSteps(newSteps)
      if (newSteps.length > 0) {
        setCurrentStep(0)
      }
    } else if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  // Data manipulation functions
  const addElement = () => {
    const value = Number.parseInt(inputValue) || Math.floor(Math.random() * 100)
    switch (selectedCategory) {
      case "sorting":
      case "searching":
      case "arrays":
        setArray((prev) => [...prev, value])
        break
      case "stack":
        setStackData((prev) => [...prev, value])
        break
      case "queue":
        setQueueData((prev) => [...prev, value])
        break
      case "linkedList":
        setLinkedListData((prev) => {
          const newId = Math.max(...prev.map((node) => node.id), -1) + 1
          const newList = [...prev]
          if (newList.length > 0) {
            newList[newList.length - 1].next = newId
          }
          const newNode = { id: newId, value: value, next: null }

          // Handle different list types
          if (linkedListType === "doubly") {
            newNode.prev = newList.length > 0 ? newList[newList.length - 1].id : null
          }

          newList.push(newNode)

          // Handle circular linking
          if (linkedListType === "circular" && newList.length > 1) {
            newList[newList.length - 1].next = newList[0].id
          }

          return newList
        })
        break
      case "graphs":
        setGraphData((prev) => ({
          ...prev,
          nodes: [
            ...prev.nodes,
            {
              id: prev.nodes.length,
              value: String.fromCharCode(65 + prev.nodes.length),
              x: 100 + (prev.nodes.length % 4) * 100,
              y: 100 + Math.floor(prev.nodes.length / 4) * 100,
            },
          ],
        }))
        break
    }
    setInputValue("")
    reset()
  }

  const removeElement = () => {
    switch (selectedCategory) {
      case "sorting":
      case "searching":
      case "arrays":
        if (array.length > 1) {
          setArray((prev) => prev.slice(0, -1))
        }
        break
      case "stack":
        if (stackData.length > 0) {
          setStackData((prev) => prev.slice(0, -1))
        }
        break
      case "queue":
        if (queueData.length > 0) {
          setQueueData((prev) => prev.slice(1))
        }
        break
      case "linkedList":
        if (linkedListData.length > 0) {
          setLinkedListData((prev) => {
            const newList = prev.slice(0, -1)
            if (newList.length > 0) {
              if (linkedListType === "circular") {
                newList[newList.length - 1].next = newList[0].id
              } else {
                newList[newList.length - 1].next = null
              }
            }
            return newList
          })
        }
        break
      case "graphs":
        if (graphData.nodes.length > 1) {
          setGraphData((prev) => ({
            nodes: prev.nodes.slice(0, -1),
            edges: prev.edges.filter((edge) => edge.from < prev.nodes.length - 1 && edge.to < prev.nodes.length - 1),
          }))
        }
        break
    }
    reset()
  }

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 1)
    setArray(newArray)
    reset()
  }

  // Effect hooks
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isPlaying && steps.length > 0 && currentStep >= 0 && currentStep < steps.length - 1) {
      timeoutRef.current = setTimeout(
        () => {
          setCurrentStep((prev) => prev + 1)
        },
        1100 - speed * 10,
      )
    } else if (isPlaying && currentStep >= steps.length - 1) {
      setIsPlaying(false)
      // Update data structures with final state
      if (steps.length > 0 && steps[steps.length - 1].finalArray) {
        setArray(steps[steps.length - 1].finalArray)
      }
      if (steps.length > 0 && steps[steps.length - 1].stack) {
        setStackData(steps[steps.length - 1].stack)
      }
      if (steps.length > 0 && steps[steps.length - 1].queue) {
        setQueueData(steps[steps.length - 1].queue)
      }
      if (steps.length > 0 && steps[steps.length - 1].linkedList) {
        setLinkedListData(steps[steps.length - 1].linkedList)
      }
      if (steps.length > 0 && steps[steps.length - 1].graph) {
        setGraphData(steps[steps.length - 1].graph)
      }
    }
  }, [isPlaying, currentStep, steps.length, speed])

  useEffect(() => {
    reset()
  }, [selectedCategory, selectedAlgorithm, traversalType, dpApproach, graphType, linkedListType])

  // Update linked list data when type changes
  useEffect(() => {
    setLinkedListData((prev) => createLinkedListByType(prev, linkedListType))
    reset()
  }, [linkedListType])

  // Get current visualization data
  const getCurrentVisualization = () => {
    if (currentStep >= 0 && currentStep < steps.length) {
      return steps[currentStep]
    }
    return null
  }

  const currentViz = getCurrentVisualization()

  // Get current algorithm info
  const getCurrentAlgorithmInfo = () => {
    return algorithms[selectedCategory]?.items[selectedAlgorithm] || {}
  }

  const algorithmInfo = getCurrentAlgorithmInfo()

  // Color legend for different categories
  const getColorLegend = () => {
    const legends = {
      sorting: [
        { color: "var(--warning-color)", label: "Comparing" },
        { color: "var(--danger-color)", label: "Swapping" },
        { color: "var(--accent-color)", label: "Sorted" },
        { color: "var(--secondary-color)", label: "Pivot" },
      ],
      searching: [
        { color: "var(--warning-color)", label: "Checking" },
        { color: "var(--primary-color)", label: "Found/Mid" },
        { color: "var(--accent-color)", label: "Target Found" },
      ],
      arrays: [
        { color: "var(--accent-color)", label: "Inserting" },
        { color: "var(--danger-color)", label: "Deleting" },
        { color: "var(--primary-color)", label: "Traversing" },
      ],
      stack: [
        { color: "var(--accent-color)", label: "Pushing" },
        { color: "var(--danger-color)", label: "Popping" },
        { color: "var(--primary-color)", label: "Peeking/Top" },
      ],
      queue: [
        { color: "var(--accent-color)", label: "Enqueuing" },
        { color: "var(--danger-color)", label: "Dequeuing" },
        { color: "var(--primary-color)", label: "Front/Peeking" },
        { color: "var(--secondary-color)", label: "Rear" },
      ],
      linkedList: [
        { color: "var(--accent-color)", label: "Inserting" },
        { color: "var(--danger-color)", label: "Deleting" },
        { color: "var(--primary-color)", label: "Traversing" },
      ],
      trees: [
        { color: "var(--primary-color)", label: "Visiting" },
        { color: "var(--danger-color)", label: "Deleting" },
        { color: "var(--warning-color)", label: "Searching" },
      ],
      graphs: [
        { color: "var(--primary-color)", label: "Current Node" },
        { color: "var(--accent-color)", label: "Visited" },
        { color: "var(--warning-color)", label: "In Queue/Stack" },
      ],
      dynamicProgramming: [
        { color: "var(--primary-color)", label: "Computing" },
        { color: "var(--accent-color)", label: "Completed" },
        { color: "var(--warning-color)", label: "Current Coin/Item" },
      ],
      backtracking: [
        { color: "var(--warning-color)", label: "Trying" },
        { color: "var(--primary-color)", label: "Placed/Current" },
        { color: "var(--danger-color)", label: "Backtracking/Invalid" },
        { color: "var(--accent-color)", label: "Solution/Path" },
      ],
    }
    return legends[selectedCategory] || []
  }

  // Render different visualizations
  const renderVisualization = () => {
    switch (selectedCategory) {
      case "sorting":
      case "searching":
      case "arrays":
        return renderArrayVisualization()
      case "stack":
        return renderStackVisualization()
      case "queue":
        return renderQueueVisualization()
      case "linkedList":
        return renderLinkedListVisualization()
      case "trees":
        return renderTreeVisualization()
      case "graphs":
        return renderGraphVisualization()
      case "dynamicProgramming":
        return renderDPVisualization()
      case "backtracking":
        return renderBacktrackingVisualization()
      default:
        return renderArrayVisualization()
    }
  }

  const renderArrayVisualization = () => (
    <div className="array-container">
      {(currentViz?.array || array).map((value, index) => {
        let className = "array-element"
        if (currentViz) {
          if (currentViz.comparing?.includes(index)) className += " comparing"
          if (currentViz.swapping && currentViz.comparing?.includes(index)) className += " swapping"
          if (currentViz.sorted?.[index]) className += " sorted"
          if (currentViz.minIndex === index) className += " comparing"
          if (currentViz.keyIndex === index) className += " comparing"
          if (currentViz.shifting && currentViz.comparing?.includes(index)) className += " swapping"
          if (currentViz.inserted && currentViz.comparing?.includes(index)) className += " found"
          if (currentViz.leftSection?.[index]) className += " left"
          if (currentViz.rightSection?.[index]) className += " right"
          if (currentViz.merged && currentViz.comparing?.includes(index)) className += " found"
          if (currentViz.pivot === index) className += " pivot"
          if (currentViz.heapifying?.includes(index)) className += " comparing"
          if (currentViz.checking === index) className += " checking"
          if (currentViz.found === index) className += " found"
          if (currentViz.left === index) className += " left"
          if (currentViz.right === index) className += " right"
          if (currentViz.mid === index) className += " mid"
          if (currentViz.position === index) {
            className += currentViz.inserting ? " inserting" : currentViz.deleting ? " deleting" : ""
          }
          if (currentViz.traversing === index) className += " traversing"
        }
        return (
          <div key={index} className={className}>
            {value}
          </div>
        )
      })}
    </div>
  )

  const renderStackVisualization = () => (
    <div className="stack-container">
      <div className="stack-title">Stack (LIFO - Last In, First Out)</div>
      <div className="stack-wrapper">
        <div className="stack-elements">
          {(currentViz?.stack || stackData).map((value, index) => (
            <div
              key={index}
              className={`stack-element ${
                currentViz?.pushing && index === (currentViz?.stack || stackData).length - 1
                  ? "pushing"
                  : currentViz?.popping && index === (currentViz?.stack || stackData).length - 1
                    ? "popping"
                    : currentViz?.peeking && index === 0
                      ? "peeking"
                      : index === (currentViz?.stack || stackData).length - 1
                        ? "top"
                        : ""
              }`}
            >
              {value}
              {index === (currentViz?.stack || stackData).length - 1 && <div className="stack-pointer">← TOP</div>}
            </div>
          ))}
          {(currentViz?.stack || stackData).length === 0 && <div className="empty-stack">Empty Stack</div>}
        </div>
      </div>
      {currentViz?.error && <div className="error-message">{currentViz.error}</div>}
      {currentViz?.poppedValue && <div className="operation-result">Popped: {currentViz.poppedValue}</div>}
      {currentViz?.topValue && <div className="operation-result">Top: {currentViz.topValue}</div>}
    </div>
  )

  const renderQueueVisualization = () => (
    <div className="queue-container">
      <div className="queue-title">Queue (FIFO - First In, First Out)</div>
      <div className="queue-wrapper">
        <div className="queue-labels">
          <span className="queue-label front-label">FRONT</span>
          <span className="queue-label rear-label">REAR</span>
        </div>
        <div className="queue-elements">
          {(currentViz?.queue || queueData).map((value, index) => (
            <div
              key={index}
              className={`queue-element ${
                currentViz?.enqueuing && index === (currentViz?.queue || queueData).length - 1
                  ? "enqueuing"
                  : currentViz?.dequeuing && index === 0
                    ? "dequeuing"
                    : currentViz?.peeking && index === 0
                      ? "peeking"
                      : index === 0
                        ? "front"
                        : index === (currentViz?.queue || queueData).length - 1
                          ? "rear"
                          : ""
              }`}
            >
              {value}
            </div>
          ))}
          {(currentViz?.queue || queueData).length === 0 && <div className="empty-queue">Empty Queue</div>}
        </div>
      </div>
      {currentViz?.error && <div className="error-message">{currentViz.error}</div>}
      {currentViz?.dequeuedValue && <div className="operation-result">Dequeued: {currentViz.dequeuedValue}</div>}
      {currentViz?.frontValue && <div className="operation-result">Front: {currentViz.frontValue}</div>}
    </div>
  )

  const renderLinkedListVisualization = () => (
    <div className="linkedlist-container">
      <div className="linkedlist-title">
        {linkedListType === "singly" ? "Singly" : linkedListType === "doubly" ? "Doubly" : "Circular"} Linked List
      </div>
      <div className="linkedlist-wrapper">
        <div className="linkedlist-elements">
          {(currentViz?.linkedList || linkedListData).map((node, index) => (
            <div key={node.id} className="linkedlist-node-wrapper">
              <div
                className={`linkedlist-node ${
                  currentViz?.inserting && currentViz?.newNodeId === node.id
                    ? "inserting"
                    : currentViz?.deleting === node.id
                      ? "deleting"
                      : currentViz?.traversing === node.id
                        ? "traversing"
                        : ""
                }`}
              >
                <div className="node-data">
                  {linkedListType === "doubly" && (
                    <div className="node-prev">{node.prev !== null ? `${node.prev}←` : "NULL←"}</div>
                  )}
                  <div className="node-value">{node.value}</div>
                  <div className="node-next">
                    {node.next !== null
                      ? `→${node.next}`
                      : linkedListType === "circular" && index === (currentViz?.linkedList || linkedListData).length - 1
                        ? `→${(currentViz?.linkedList || linkedListData)[0]?.id}`
                        : "NULL"}
                  </div>
                </div>
              </div>
              {node.next !== null && linkedListType !== "circular" && <div className="node-arrow">→</div>}
              {linkedListType === "circular" && index === (currentViz?.linkedList || linkedListData).length - 1 && (
                <div className="circular-arrow">↺</div>
              )}
            </div>
          ))}
          {(currentViz?.linkedList || linkedListData).length === 0 && <div className="empty-list">Empty List</div>}
        </div>
      </div>
    </div>
  )

  const renderTreeVisualization = () => {
    const renderTreeNode = (node, x = 200, y = 50, level = 0) => {
      if (!node) return null
      const nodeSpacing = 100 / (level + 1)
      return (
        <g key={`${node.value}-${x}-${y}`}>
          {/* Edges to children */}
          {node.left && (
            <line x1={x} y1={y + 30} x2={x - nodeSpacing} y2={y + 80} stroke="var(--border-color)" strokeWidth="2" />
          )}
          {node.right && (
            <line x1={x} y1={y + 30} x2={x + nodeSpacing} y2={y + 80} stroke="var(--border-color)" strokeWidth="2" />
          )}
          {/* Node circle */}
          <circle
            cx={x}
            cy={y}
            r="25"
            fill={
              currentViz?.visiting === node.value
                ? "var(--primary-color)"
                : currentViz?.deleting === node.value
                  ? "var(--danger-color)"
                  : currentViz?.searching === node.value
                    ? "var(--warning-color)"
                    : "var(--bg-tertiary)"
            }
            stroke="var(--border-color)"
            strokeWidth="2"
          />
          {/* Node value */}
          <text x={x} y={y + 5} textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="bold">
            {node.value}
          </text>
          {/* Recursively render children */}
          {node.left && renderTreeNode(node.left, x - nodeSpacing, y + 80, level + 1)}
          {node.right && renderTreeNode(node.right, x + nodeSpacing, y + 80, level + 1)}
        </g>
      )
    }
    return (
      <div className="tree-container">
        <div className="tree-title">Binary Tree</div>
        <div className="tree-visualization">
          <svg width="400" height="300" viewBox="0 0 400 300">
            {renderTreeNode(currentViz?.tree || treeData)}
          </svg>
        </div>
        {currentViz?.traversal && (
          <div className="traversal-result">
            <strong>Traversal ({currentViz.type}):</strong> [{currentViz.traversal.join(", ")}]
          </div>
        )}
      </div>
    )
  }

  const renderGraphVisualization = () => (
    <div className="graph-container">
      <div className="graph-title">Graph ({graphType})</div>
      <div className="graph-visualization">
        <svg width="500" height="400" viewBox="0 0 500 400" style={{ border: "1px solid var(--border-color)" }}>
          {/* Render edges */}
          {(currentViz?.graph || graphData).edges.map((edge, index) => {
            const fromNode = (currentViz?.graph || graphData).nodes[edge.from]
            const toNode = (currentViz?.graph || graphData).nodes[edge.to]
            if (!fromNode || !toNode) return null

            // Calculate arrow position for directed graphs
            const dx = toNode.x - fromNode.x
            const dy = toNode.y - fromNode.y
            const length = Math.sqrt(dx * dx + dy * dy)
            const unitX = dx / length
            const unitY = dy / length
            const arrowX = toNode.x - unitX * 25 // 25 is node radius
            const arrowY = toNode.y - unitY * 25

            return (
              <g key={index}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={
                    currentViz?.current === edge.from || currentViz?.current === edge.to
                      ? "var(--primary-color)"
                      : "var(--border-color)"
                  }
                  strokeWidth="2"
                />
                {/* Arrow for directed graphs */}
                {graphType === "directed" && (
                  <polygon
                    points={`${arrowX},${arrowY} ${arrowX - 8 * unitX + 4 * unitY},${arrowY - 8 * unitY - 4 * unitX} ${arrowX - 8 * unitX - 4 * unitY},${arrowY - 8 * unitY + 4 * unitX}`}
                    fill={
                      currentViz?.current === edge.from || currentViz?.current === edge.to
                        ? "var(--primary-color)"
                        : "var(--border-color)"
                    }
                  />
                )}
                <text
                  x={(fromNode.x + toNode.x) / 2}
                  y={(fromNode.y + toNode.y) / 2 - 10}
                  textAnchor="middle"
                  fill="var(--text-secondary)"
                  fontSize="12"
                >
                  {edge.weight}
                </text>
              </g>
            )
          })}
          {/* Render nodes */}
          {(currentViz?.graph || graphData).nodes.map((node, index) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="20"
                fill={
                  currentViz?.visited?.includes(node.id)
                    ? "var(--accent-color)"
                    : currentViz?.current === node.id
                      ? "var(--primary-color)"
                      : "var(--bg-tertiary)"
                }
                stroke="var(--border-color)"
                strokeWidth="2"
              />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                fill="var(--text-primary)"
                fontSize="14"
                fontWeight="bold"
              >
                {node.value}
              </text>
            </g>
          ))}
        </svg>
      </div>
      {currentViz?.traversalOrder && (
        <div className="traversal-result">
          <strong>Traversal Order:</strong>{" "}
          {currentViz.traversalOrder.map((id) => (currentViz?.graph || graphData).nodes[id]?.value).join(" → ")}
        </div>
      )}
    </div>
  )

  const renderDPVisualization = () => {
    if (selectedAlgorithm === "fibonacci") {
      if (currentViz?.approach === "tabulation" && currentViz?.dp) {
        return (
          <div className="dp-container">
            <div className="dp-title">Fibonacci - Tabulation Approach</div>
            <div className="dp-table">
              {currentViz.dp.map((value, index) => (
                <div key={index} className={`dp-cell ${currentViz.computing === index ? "computing" : ""}`}>
                  <div className="dp-index">F({index})</div>
                  <div className="dp-value">{value}</div>
                </div>
              ))}
            </div>
            {currentViz.formula && <div className="dp-formula">{currentViz.formula}</div>}
          </div>
        )
      } else if (currentViz?.approach === "memoization" && currentViz?.memo) {
        return (
          <div className="dp-container">
            <div className="dp-title">Fibonacci - Memoization Approach</div>
            <div className="memo-table">
              {Object.entries(currentViz.memo).map(([key, value]) => (
                <div
                  key={key}
                  className={`dp-cell ${currentViz.computing === Number.parseInt(key) ? "computing" : ""}`}
                >
                  <div className="dp-index">F({key})</div>
                  <div className="dp-value">{value}</div>
                </div>
              ))}
            </div>
            <div className="current-computation">Computing: F({currentViz.computing})</div>
          </div>
        )
      } else if (currentViz?.approach === "spaceOptimized") {
        return (
          <div className="dp-container">
            <div className="dp-title">Fibonacci - Space Optimized Approach</div>
            <div className="space-optimized-display">
              <div className="variable-display">
                <div className="variable">
                  <span>prev2:</span> <span className="value">{currentViz.prev2}</span>
                </div>
                <div className="variable">
                  <span>prev1:</span> <span className="value">{currentViz.prev1}</span>
                </div>
                {currentViz.current !== undefined && (
                  <div className="variable current">
                    <span>current:</span> <span className="value">{currentViz.current}</span>
                  </div>
                )}
              </div>
              <div className="computation-step">Computing: F({currentViz.computing})</div>
            </div>
          </div>
        )
      }
    } else if (selectedAlgorithm === "lcs" && currentViz?.algorithm === "lcs") {
      return (
        <div className="dp-container">
          <div className="dp-title">Longest Common Subsequence</div>
          <div className="lcs-strings">
            <div className="string-display">
              <strong>String 1:</strong> {currentViz.str1}
            </div>
            <div className="string-display">
              <strong>String 2:</strong> {currentViz.str2}
            </div>
          </div>
          <div className="lcs-table">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  {currentViz.str2.split("").map((char, i) => (
                    <th key={i}>{char}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentViz.dp.map((row, i) => (
                  <tr key={i}>
                    <th>{i === 0 ? "" : currentViz.str1[i - 1]}</th>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`lcs-cell ${
                          currentViz.computing[0] === i && currentViz.computing[1] === j
                            ? "computing"
                            : currentViz.backtrackSteps?.some(([r, c]) => r === i && c === j)
                              ? "backtrack"
                              : ""
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {currentViz.lcs && (
            <div className="lcs-result">
              <strong>LCS:</strong> "{currentViz.lcs}" (Length: {currentViz.result})
            </div>
          )}
        </div>
      )
    } else if (selectedAlgorithm === "knapsack" && currentViz?.algorithm === "knapsack") {
      return (
        <div className="dp-container">
          <div className="dp-title">0/1 Knapsack Problem</div>
          <div className="knapsack-info">
            <div className="capacity-display">
              <strong>Capacity:</strong> {currentViz.capacity}
            </div>
            <div className="items-display">
              <strong>Items:</strong>
              <div className="items-list">
                {currentViz.items.map((item, i) => (
                  <div key={i} className={`item ${currentViz.currentItem === i ? "current-item" : ""}`}>
                    Item {i}: W={item.weight}, V={item.value}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="knapsack-table">
            <table>
              <thead>
                <tr>
                  <th>Item/Weight</th>
                  {Array.from({ length: currentViz.capacity + 1 }, (_, i) => (
                    <th key={i}>{i}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentViz.dp.map((row, i) => (
                  <tr key={i}>
                    <th>{i === 0 ? "0" : `Item ${i - 1}`}</th>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`knapsack-cell ${
                          currentViz.computing[0] === i && currentViz.computing[1] === j ? "computing" : ""
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {currentViz.include !== undefined && currentViz.exclude !== undefined && (
            <div className="knapsack-decision">
              <div>Include: {currentViz.include}</div>
              <div>Exclude: {currentViz.exclude}</div>
              <div>
                <strong>Decision: {currentViz.include > currentViz.exclude ? "Include" : "Exclude"}</strong>
              </div>
            </div>
          )}
        </div>
      )
    } else if (selectedAlgorithm === "coinChange" && currentViz?.algorithm === "coinChange") {
      return (
        <div className="dp-container">
          <div className="dp-title">Coin Change Problem</div>
          <div className="coin-info">
            <div className="amount-display">
              <strong>Target Amount:</strong> {currentViz.amount}
            </div>
            <div className="coins-display">
              <strong>Available Coins:</strong> [{currentViz.coins.join(", ")}]
            </div>
          </div>
          <div className="coin-table">
            {currentViz.dp.map((value, index) => (
              <div
                key={index}
                className={`coin-cell ${
                  currentViz.computing === index
                    ? "computing"
                    : currentViz.currentCoin && index >= currentViz.currentCoin
                      ? "affected"
                      : ""
                }`}
              >
                <div className="coin-amount">Amount {index}</div>
                <div className="coin-value">{value === Number.POSITIVE_INFINITY ? "∞" : value}</div>
              </div>
            ))}
          </div>
          {currentViz.currentCoin && (
            <div className="coin-operation">
              <strong>Using coin:</strong> {currentViz.currentCoin}
            </div>
          )}
        </div>
      )
    }
    return (
      <div className="dp-container">
        <div className="dp-title">Dynamic Programming</div>
        <div className="placeholder">Select an algorithm and approach to visualize</div>
      </div>
    )
  }

  const renderBacktrackingVisualization = () => {
    if (selectedAlgorithm === "nQueens" && currentViz?.board) {
      const n = currentViz.board.length
      return (
        <div className="nqueens-container">
          <div className="nqueens-title">N-Queens Problem (N = {n})</div>
          <div className="nqueens-board" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
            {currentViz.board.map((row, i) =>
              row.map((cell, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`nqueens-cell ${
                    cell === 1
                      ? "queen"
                      : currentViz.trying && currentViz.trying[0] === i && currentViz.trying[1] === j
                        ? "trying"
                        : currentViz.placed && currentViz.placed[0] === i && currentViz.placed[1] === j
                          ? "placed"
                          : currentViz.backtracking &&
                              currentViz.backtracking[0] === i &&
                              currentViz.backtracking[1] === j
                            ? "backtracking"
                            : currentViz.unsafe && currentViz.unsafe[0] === i && currentViz.unsafe[1] === j
                              ? "unsafe"
                              : (i + j) % 2 === 0
                                ? "light"
                                : "dark"
                  }`}
                >
                  {cell === 1 ? "♛" : ""}
                </div>
              )),
            )}
          </div>
          {currentViz.solution && <div className="solution-found">Solution #{currentViz.solutionCount} Found!</div>}
        </div>
      )
    } else if (selectedAlgorithm === "sudoku" && currentViz?.algorithm === "sudoku") {
      return (
        <div className="sudoku-container">
          <div className="sudoku-title">Sudoku Solver</div>
          <div className="sudoku-board">
            {currentViz.board.map((row, i) =>
              row.map((cell, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`sudoku-cell ${
                    currentViz.currentCell && currentViz.currentCell[0] === i && currentViz.currentCell[1] === j
                      ? currentViz.trying
                        ? "trying"
                        : currentViz.placed
                          ? "placed"
                          : currentViz.backtracking
                            ? "backtracking"
                            : currentViz.invalid
                              ? "invalid"
                              : "current"
                      : cell === 0
                        ? "empty"
                        : "filled"
                  } ${(Math.floor(i / 3) + Math.floor(j / 3)) % 2 === 0 ? "light-section" : "dark-section"}`}
                >
                  {cell === 0 ? "" : cell}
                </div>
              )),
            )}
          </div>
          {currentViz.trying && (
            <div className="sudoku-info">
              <strong>Trying:</strong> {currentViz.trying} at ({currentViz.currentCell[0]}, {currentViz.currentCell[1]})
            </div>
          )}
          {currentViz.solved && <div className="solution-found">Sudoku Solved!</div>}
        </div>
      )
    } else if (selectedAlgorithm === "maze" && currentViz?.algorithm === "maze") {
      return (
        <div className="maze-container">
          <div className="maze-title">Maze Solver</div>
          <div className="maze-board">
            {currentViz.maze.map((row, i) =>
              row.map((cell, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`maze-cell ${
                    cell === 1
                      ? "wall"
                      : cell === 2
                        ? "end"
                        : i === 0 && j === 0
                          ? "start"
                          : currentViz.currentPos && currentViz.currentPos[0] === i && currentViz.currentPos[1] === j
                            ? "current"
                            : currentViz.path?.some(([r, c]) => r === i && c === j)
                              ? "path"
                              : currentViz.visited?.[i]?.[j]
                                ? "visited"
                                : currentViz.exploring && currentViz.exploring[0] === i && currentViz.exploring[1] === j
                                  ? "exploring"
                                  : currentViz.blocked && currentViz.blocked[0] === i && currentViz.blocked[1] === j
                                    ? "blocked"
                                    : "empty"
                  }`}
                >
                  {i === 0 && j === 0 ? "S" : cell === 2 ? "E" : ""}
                </div>
              )),
            )}
          </div>
          {currentViz.direction && (
            <div className="maze-info">
              <strong>Exploring:</strong> {currentViz.direction} direction
            </div>
          )}
          {currentViz.solved && <div className="solution-found">Path Found!</div>}
        </div>
      )
    } else if (selectedAlgorithm === "permutations" && currentViz?.algorithm === "permutations") {
      return (
        <div className="permutations-container">
          <div className="permutations-title">Generate Permutations</div>
          <div className="permutation-state">
            <div className="current-permutation">
              <strong>Current:</strong> [{currentViz.current?.join(", ") || ""}]
            </div>
            <div className="remaining-elements">
              <strong>Remaining:</strong> [{currentViz.remaining?.join(", ") || ""}]
            </div>
          </div>
          <div className="permutations-result">
            <strong>Generated Permutations:</strong>
            <div className="permutations-list">
              {currentViz.result?.map((perm, index) => (
                <div key={index} className="permutation-item">
                  [{perm.join(", ")}]
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="backtracking-container">
        <div className="backtracking-title">Backtracking Algorithms</div>
        <div className="placeholder">Select a backtracking algorithm to visualize</div>
      </div>
    )
  }

  return (
    <div className={`app ${theme}`}>
      <style jsx>{`
        :root {
          --primary-color: #6366f1;
          --secondary-color: #8b5cf6;
          --accent-color: #10b981;
          --danger-color: #ef4444;
          --warning-color: #f59e0b;
          --bg-primary: #0f172a;
          --bg-secondary: #1e293b;
          --bg-tertiary: #334155;
          --text-primary: #f8fafc;
          --text-secondary: #cbd5e1;
          --border-color: #475569;
        }
        .light {
          --bg-primary: #ffffff;
          --bg-secondary: #f8fafc;
          --bg-tertiary: #e2e8f0;
          --text-primary: #1e293b;
          --text-secondary: #64748b;
          --border-color: #cbd5e1;
        }
        .app {
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          transition: all 0.3s ease;
        }
        .header {
          background: var(--bg-secondary);
          padding: 1rem 2rem;
          border-bottom: 2px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .title {
          font-size: 1.5rem;
          font-weight: bold;
          background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .header-controls {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        .help-button, .theme-toggle {
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9rem;
        }
        .help-button:hover, .theme-toggle:hover {
          background: var(--primary-color);
          color: white;
        }
        .main-content {
          display: flex;
          min-height: calc(100vh - 80px);
        }
        .sidebar {
          width: 320px;
          background: var(--bg-secondary);
          padding: 1.5rem;
          border-right: 2px solid var(--border-color);
          overflow-y: auto;
          max-height: calc(100vh - 80px);
        }
        .category {
          margin-bottom: 1.5rem;
        }
        .category-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .category-description {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
          font-style: italic;
        }
        .algorithm-item {
          display: flex;
          flex-direction: column;
          padding: 0.75rem;
          margin: 0.25rem 0;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .algorithm-item:hover {
          background: var(--primary-color);
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .algorithm-item.active {
          background: var(--primary-color);
          color: white;
          box-shadow: 0 2px 4px rgba(99, 102, 241, 0.3);
        }
        .algorithm-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }
        .algorithm-description {
          font-size: 0.75rem;
          opacity: 0.8;
          line-height: 1.3;
        }
        .complexity {
          font-size: 0.8rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-family: monospace;
        }
        .content {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
        }
        .controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          align-items: center;
          background: var(--bg-secondary);
          padding: 1.5rem;
          border-radius: 1rem;
          border: 1px solid var(--border-color);
        }
        .control-group {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .btn-primary {
          background: var(--primary-color);
          color: white;
        }
        .btn-primary:hover:not(:disabled) {
          background: #4f46e5;
          transform: translateY(-1px);
        }
        .btn-secondary {
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }
        .btn-secondary:hover:not(:disabled) {
          background: var(--border-color);
          transform: translateY(-1px);
        }
        .btn-success {
          background: var(--accent-color);
          color: white;
        }
        .btn-success:hover:not(:disabled) {
          background: #059669;
          transform: translateY(-1px);
        }
        .btn-danger {
          background: var(--danger-color);
          color: white;
        }
        .btn-danger:hover:not(:disabled) {
          background: #dc2626;
          transform: translateY(-1px);
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .input-group label {
          font-size: 0.9rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .input, .select {
          padding: 0.5rem;
          border: 1px solid var(--border-color);
          border-radius: 0.375rem;
          background: var(--bg-tertiary);
          color: var(--text-primary);
          font-size: 0.9rem;
        }
        .input:focus, .select:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        .speed-control {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .speed-slider {
          width: 100px;
        }
        .visualization {
          background: var(--bg-secondary);
          border-radius: 1rem;
          padding: 2rem;
          border: 1px solid var(--border-color);
          min-height: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .step-info {
          background: var(--bg-tertiary);
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          border-left: 4px solid var(--primary-color);
          width: 100%;
        }
        .step-counter {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }
        .step-description {
          font-size: 1rem;
          color: var(--text-primary);
          font-weight: 500;
        }
        .info-box {
          background: var(--bg-tertiary);
          padding: 1rem;
          border-radius: 0.5rem;
          margin-top: 1rem;
          border: 1px solid var(--border-color);
          width: 100%;
        }
        .info-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        .info-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .complexity-info {
          display: flex;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }
        .complexity-item {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .color-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 2px;
        }
        /* Array Visualization */
        .array-container {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          justify-content: center;
          align-items: flex-end;
          margin: 2rem 0;
        }
        .array-element {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-tertiary);
          border: 2px solid var(--border-color);
          border-radius: 0.5rem;
          font-weight: bold;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          position: relative;
        }
        .array-element.comparing {
          background: var(--warning-color);
          color: white;
          transform: translateY(-5px);
          box-shadow: 0 4px 8px rgba(245, 158, 11, 0.3);
        }
        .array-element.swapping {
          background: var(--danger-color);
          color: white;
          animation: shake 0.5s ease-in-out;
        }
        .array-element.sorted {
          background: var(--accent-color);
          color: white;
          box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
        }
        .array-element.found {
          background: var(--primary-color);
          color: white;
          animation: pulse 1s infinite;
        }
        .array-element.left {
          border-color: var(--primary-color);
          border-width: 3px;
        }
        .array-element.right {
          border-color: var(--secondary-color);
          border-width: 3px;
        }
        .array-element.pivot {
          background: var(--secondary-color);
          color: white;
          position: relative;
        }
        .array-element.pivot::after {
          content: 'PIVOT';
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.7rem;
          background: var(--secondary-color);
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          white-space: nowrap;
        }
        .array-element.checking {
          background: var(--warning-color);
          color: white;
          animation: pulse 1s infinite;
        }
        .array-element.mid {
          background: var(--primary-color);
          color: white;
          position: relative;
        }
        .array-element.mid::after {
          content: 'MID';
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.7rem;
          background: var(--primary-color);
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
        }
        .array-element.inserting {
          background: var(--accent-color);
          color: white;
          animation: slideIn 0.5s ease;
        }
        .array-element.deleting {
          background: var(--danger-color);
          color: white;
          animation: slideOut 0.5s ease;
        }
        .array-element.traversing {
          background: var(--primary-color);
          color: white;
          animation: highlight 1s ease;
        }
        /* Stack Visualization */
        .stack-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin: 2rem 0;
        }
        .stack-title {
          font-size: 1.2rem;
          font-weight: bold;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        .stack-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .stack-elements {
          display: flex;
          flex-direction: column-reverse;
          gap: 0.25rem;
          min-height: 200px;
          justify-content: flex-start;
          align-items: center;
          padding: 1rem;
          border: 2px dashed var(--border-color);
          border-radius: 0.5rem;
          background: var(--bg-tertiary);
          position: relative;
        }
        .stack-element {
          width: 80px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-secondary);
          border: 2px solid var(--border-color);
          border-radius: 0.375rem;
          font-weight: bold;
          transition: all 0.3s ease;
          position: relative;
        }
        .stack-element.pushing {
          background: var(--accent-color);
          color: white;
          animation: slideDown 0.5s ease;
        }
        .stack-element.popping {
          background: var(--danger-color);
          color: white;
          animation: slideUp 0.5s ease;
        }
        .stack-element.peeking {
          background: var(--primary-color);
          color: white;
          animation: pulse 1s infinite;
        }
        .stack-element.top {
          border-color: var(--primary-color);
          border-width: 3px;
        }
        .stack-pointer {
          position: absolute;
          right: -60px;
          font-size: 0.8rem;
          color: var(--primary-color);
          font-weight: bold;
        }
        .empty-stack {
          color: var(--text-secondary);
          font-style: italic;
          padding: 2rem;
        }
        .error-message {
          color: var(--danger-color);
          font-weight: bold;
          padding: 0.5rem;
          background: rgba(239, 68, 68, 0.1);
          border-radius: 0.375rem;
          border: 1px solid var(--danger-color);
        }
        .operation-result {
          color: var(--accent-color);
          font-weight: bold;
          padding: 0.5rem;
          background: rgba(16, 185, 129, 0.1);
          border-radius: 0.375rem;
          border: 1px solid var(--accent-color);
        }
        /* Queue Visualization */
        .queue-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin: 2rem 0;
        }
        .queue-title {
          font-size: 1.2rem;
          font-weight: bold;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        .queue-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .queue-labels {
          display: flex;
          justify-content: space-between;
          width: 100%;
          max-width: 400px;
        }
        .queue-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: bold;
        }
        .queue-elements {
          display: flex;
          gap: 0.25rem;
          min-width: 300px;
          min-height: 60px;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          border: 2px dashed var(--border-color);
          border-radius: 0.5rem;
          background: var(--bg-tertiary);
        }
        .queue-element {
          width: 60px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-secondary);
          border: 2px solid var(--border-color);
          border-radius: 0.375rem;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        .queue-element.enqueuing {
          background: var(--accent-color);
          color: white;
          animation: slideRight 0.5s ease;
        }
        .queue-element.dequeuing {
          background: var(--danger-color);
          color: white;
          animation: slideLeft 0.5s ease;
        }
        .queue-element.peeking {
          background: var(--primary-color);
          color: white;
          animation: pulse 1s infinite;
        }
        .queue-element.front {
          border-color: var(--primary-color);
          border-width: 3px;
        }
        .queue-element.rear {
          border-color: var(--secondary-color);
          border-width: 3px;
        }
        .empty-queue {
          color: var(--text-secondary);
          font-style: italic;
          padding: 1rem;
        }
        /* Linked List Visualization */
        .linkedlist-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin: 2rem 0;
        }
        .linkedlist-title {
          font-size: 1.2rem;
          font-weight: bold;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        .linkedlist-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .linkedlist-elements {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
          min-height: 80px;
          padding: 1rem;
          border: 2px dashed var(--border-color);
          border-radius: 0.5rem;
          background: var(--bg-tertiary);
        }
        .linkedlist-node-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .linkedlist-node {
          display: flex;
          flex-direction: column;
          background: var(--bg-secondary);
          border: 2px solid var(--border-color);
          border-radius: 0.5rem;
          padding: 0.5rem;
          transition: all 0.3s ease;
        }
        .linkedlist-node.inserting {
          background: var(--accent-color);
          color: white;
          animation: fadeIn 0.5s ease;
        }
        .linkedlist-node.deleting {
          background: var(--danger-color);
          color: white;
          animation: fadeOut 0.5s ease;
        }
        .linkedlist-node.traversing {
          background: var(--primary-color);
          color: white;
          animation: pulse 1s infinite;
        }
        .node-data {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }
        .node-value {
          font-weight: bold;
          font-size: 1rem;
        }
        .node-next, .node-prev {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-family: monospace;
        }
        .node-arrow {
          font-size: 1.5rem;
          color: var(--primary-color);
          font-weight: bold;
        }
        .circular-arrow {
          font-size: 1.5rem;
          color: var(--secondary-color);
          font-weight: bold;
        }
        .empty-list {
          color: var(--text-secondary);
          font-style: italic;
          padding: 2rem;
        }
        /* Tree Visualization */
        .tree-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin: 2rem 0;
        }
        .tree-title {
          font-size: 1.2rem;
          font-weight: bold;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        .tree-visualization {
          background: var(--bg-tertiary);
          border-radius: 0.5rem;
          padding: 1rem;
          border: 1px solid var(--border-color);
        }
        .traversal-result {
          background: var(--bg-tertiary);
          padding: 1rem;
          border-radius: 0.5rem;
          border: 1px solid var(--border-color);
          font-family: monospace;
          font-size: 0.9rem;
        }
        /* Graph Visualization */
        .graph-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin: 2rem 0;
        }
        .graph-title {
          font-size: 1.2rem;
          font-weight: bold;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        .graph-visualization {
          background: var(--bg-tertiary);
          border-radius: 0.5rem;
          padding: 1rem;
        }
        /* DP Visualization */
        .dp-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin: 2rem 0;
          width: 100%;
        }
        .dp-title {
          font-size: 1.2rem;
          font-weight: bold;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        .dp-table, .memo-table {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          justify-content: center;
          margin: 1rem 0;
        }
        .dp-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.75rem;
          background: var(--bg-tertiary);
          border: 2px solid var(--border-color);
          border-radius: 0.5rem;
          min-width: 60px;
          transition: all 0.3s ease;
        }
        .dp-cell.computing {
          background: var(--primary-color);
          color: white;
          animation: pulse 1s infinite;
        }
        .dp-index {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 0.25rem;
        }
        .dp-value {
          font-weight: bold;
          font-size: 1rem;
        }
        .dp-formula {
          background: var(--bg-tertiary);
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-family: monospace;
          font-size: 0.9rem;
          margin-top: 1rem;
        }
        .current-computation {
          background: var(--primary-color);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-weight: bold;
          margin-top: 1rem;
        }
        .space-optimized-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          background: var(--bg-tertiary);
          padding: 2rem;
          border-radius: 0.5rem;
          border: 1px solid var(--border-color);
        }
        .variable-display {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        .variable {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: var(--bg-secondary);
          border-radius: 0.5rem;
          border: 1px solid var(--border-color);
          min-width: 80px;
        }
        .variable.current {
          background: var(--primary-color);
          color: white;
        }
        .variable .value {
          font-size: 1.5rem;
          font-weight: bold;
        }
        .computation-step {
          font-weight: bold;
          color: var(--primary-color);
        }
        /* LCS Visualization */
        .lcs-strings {
          display: flex;
          gap: 2rem;
          margin-bottom: 1rem;
        }
        .string-display {
          background: var(--bg-tertiary);
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-family: monospace;
        }
        .lcs-table table {
          border-collapse: collapse;
          background: var(--bg-tertiary);
          border-radius: 0.5rem;
          overflow: hidden;
        }
        .lcs-table th, .lcs-table td {
          padding: 0.5rem;
          border: 1px solid var(--border-color);
          text-align: center;
          min-width: 40px;
        }
        .lcs-table th {
          background: var(--bg-secondary);
          font-weight: bold;
        }
        .lcs-cell.computing {
          background: var(--primary-color);
          color: white;
          animation: pulse 1s infinite;
        }
        .lcs-cell.backtrack {
          background: var(--accent-color);
          color: white;
        }
        .lcs-result {
          background: var(--accent-color);
          color: white;
          padding: 1rem;
          border-radius: 0.5rem;
          font-weight: bold;
          margin-top: 1rem;
        }
        /* Knapsack Visualization */
        .knapsack-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1rem;
          width: 100%;
        }
        .capacity-display {
          background: var(--bg-tertiary);
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          text-align: center;
        }
        .items-display {
          background: var(--bg-tertiary);
          padding: 1rem;
          border-radius: 0.5rem;
        }
        .items-list {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-top: 0.5rem;
        }
        .item {
          padding: 0.5rem;
          background: var(--bg-secondary);
          border-radius: 0.375rem;
          font-size: 0.9rem;
          border: 1px solid var(--border-color);
        }
        .item.current-item {
          background: var(--primary-color);
          color: white;
        }
        .knapsack-table table {
          border-collapse: collapse;
          background: var(--bg-tertiary);
          border-radius: 0.5rem;
          overflow: hidden;
        }
        .knapsack-table th, .knapsack-table td {
          padding: 0.5rem;
          border: 1px solid var(--border-color);
          text-align: center;
          min-width: 40px;
        }
        .knapsack-table th {
          background: var(--bg-secondary);
          font-weight: bold;
        }
        .knapsack-cell.computing {
          background: var(--primary-color);
          color: white;
          animation: pulse 1s infinite;
        }
        .knapsack-decision {
          display: flex;
          gap: 1rem;
          background: var(--bg-tertiary);
          padding: 1rem;
          border-radius: 0.5rem;
          margin-top: 1rem;
        }
        /* Coin Change Visualization */
        .coin-info {
          display: flex;
          gap: 2rem;
          margin-bottom: 1rem;
        }
        .amount-display, .coins-display {
          background: var(--bg-tertiary);
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
        }
        .coin-table {
          display: flex;
          gap: 0.25rem;
          flex-wrap: wrap;
          justify-content: center;
          margin: 1rem 0;
        }
        .coin-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.5rem;
          background: var(--bg-tertiary);
          border: 2px solid var(--border-color);
          border-radius: 0.375rem;
          min-width: 50px;
          transition: all 0.3s ease;
        }
        .coin-cell.computing {
          background: var(--primary-color);
          color: white;
          animation: pulse 1s infinite;
        }
        .coin-cell.affected {
          border-color: var(--warning-color);
        }
        .coin-amount {
          font-size: 0.7rem;
          color: var(--text-secondary);
          margin-bottom: 0.25rem;
        }
        .coin-value {
          font-weight: bold;
          font-size: 0.9rem;
        }
        .coin-operation {
          background: var(--warning-color);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          margin-top: 1rem;
          text-align: center;
        }
        /* N-Queens Visualization */
        .nqueens-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin: 2rem 0;
        }
        .nqueens-title {
          font-size: 1.2rem;
          font-weight: bold;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        .nqueens-board {
          display: grid;
          gap: 1px;
          background: var(--border-color);
          border: 2px solid var(--border-color);
          border-radius: 0.5rem;
          overflow: hidden;
        }
        .nqueens-cell {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          transition: all 0.3s ease;
        }
        .nqueens-cell.light {
          background: #f0f0f0;
        }
        .nqueens-cell.dark {
          background: #d0d0d0;
        }
        .light .nqueens-cell.light {
          background: #f8f8f8;
        }
        .light .nqueens-cell.dark {
          background: #e8e8e8;
        }
        .nqueens-cell.queen {
          background: var(--accent-color);
          color: white;
        }
        .nqueens-cell.trying {
          background: var(--warning-color);
          color: white;
          animation: pulse 1s infinite;
        }
        .nqueens-cell.placed {
          background: var(--primary-color);
          color: white;
          animation: fadeIn 0.5s ease;
        }
        .nqueens-cell.backtracking {
          background: var(--danger-color);
          color: white;
          animation: fadeOut 0.5s ease;
        }
        .nqueens-cell.unsafe {
          background: var(--danger-color);
          color: white;
          animation: shake 0.5s ease;
        }
        .solution-found {
          background: var(--accent-color);
          color: white;
          padding: 1rem;
          border-radius: 0.5rem;
          font-weight: bold;
          animation: celebration 1s ease;
        }
        /* Sudoku Visualization */
        .sudoku-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin: 2rem 0;
        }
        .sudoku-title {
          font-size: 1.2rem;
          font-weight: bold;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        .sudoku-board {
          display: grid;
          grid-template-columns: repeat(9, 1fr);
          gap: 1px;
          background: var(--border-color);
          border: 3px solid var(--border-color);
          border-radius: 0.5rem;
          overflow: hidden;
        }
        .sudoku-cell {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        .sudoku-cell.light-section {
          background: #f0f0f0;
        }
        .sudoku-cell.dark-section {
          background: #e0e0e0;
        }
        .light .sudoku-cell.light-section {
          background: #f8f8f8;
        }
        .light .sudoku-cell.dark-section {
          background: #f0f0f0;
        }
        .sudoku-cell.empty {
          color: var(--text-secondary);
        }
        .sudoku-cell.filled {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }
        .sudoku-cell.current {
          background: var(--primary-color);
          color: white;
        }
        .sudoku-cell.trying {
          background: var(--warning-color);
          color: white;
          animation: pulse 1s infinite;
        }
        .sudoku-cell.placed {
          background: var(--accent-color);
          color: white;
          animation: fadeIn 0.5s ease;
        }
        .sudoku-cell.backtracking {
          background: var(--danger-color);
          color: white;
          animation: fadeOut 0.5s ease;
        }
        .sudoku-cell.invalid {
          background: var(--danger-color);
          color: white;
          animation: shake 0.5s ease;
        }
        .sudoku-info {
          background: var(--bg-tertiary);
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-family: monospace;
        }
        /* Maze Visualization */
        .maze-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin: 2rem 0;
        }
        .maze-title {
          font-size: 1.2rem;
          font-weight: bold;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        .maze-board {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          gap: 1px;
          background: var(--border-color);
          border: 2px solid var(--border-color);
          border-radius: 0.5rem;
          overflow: hidden;
        }
        .maze-cell {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        .maze-cell.empty {
          background: white;
        }
        .maze-cell.wall {
          background: #333;
        }
        .maze-cell.start {
          background: var(--accent-color);
          color: white;
        }
        .maze-cell.end {
          background: var(--danger-color);
          color: white;
        }
        .maze-cell.current {
          background: var(--primary-color);
          color: white;
          animation: pulse 1s infinite;
        }
        .maze-cell.path {
          background: var(--secondary-color);
          color: white;
        }
        .maze-cell.visited {
          background: #fbbf24;
        }
        .maze-cell.exploring {
          background: var(--warning-color);
          color: white;
          animation: pulse 0.5s infinite;
        }
        .maze-cell.blocked {
          background: var(--danger-color);
          animation: shake 0.3s ease;
        }
        .maze-info {
          background: var(--bg-tertiary);
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-family: monospace;
        }
        /* Permutations Visualization */
        .permutations-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin: 2rem 0;
          width: 100%;
        }
        .permutations-title {
          font-size: 1.2rem;
          font-weight: bold;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        .permutation-state {
          display: flex;
          gap: 2rem;
          background: var(--bg-tertiary);
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
        }
        .current-permutation, .remaining-elements {
          font-family: monospace;
        }
        .permutations-result {
          width: 100%;
          max-width: 600px;
        }
        .permutations-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.5rem;
          max-height: 200px;
          overflow-y: auto;
          background: var(--bg-tertiary);
          padding: 1rem;
          border-radius: 0.5rem;
        }
        .permutation-item {
          background: var(--bg-secondary);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-family: monospace;
          font-size: 0.9rem;
          border: 1px solid var(--border-color);
        }
        /* Animations */
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(-20px); opacity: 0; }
        }
        @keyframes slideDown {
          from { transform: translateY(-30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(-30px); opacity: 0; }
        }
        @keyframes slideRight {
          from { transform: translateX(-30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideLeft {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-30px); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.8); }
        }
        @keyframes highlight {
          0% { background: var(--primary-color); }
          50% { background: var(--secondary-color); }
          100% { background: var(--primary-color); }
        }
        @keyframes celebration {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        /* Responsive Design */
        @media (max-width: 768px) {
          .main-content {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
            max-height: none;
          }
          .controls {
            flex-direction: column;
            align-items: stretch;
          }
          .control-group {
            justify-content: center;
          }
          .array-element {
            width: 45px;
            height: 45px;
            font-size: 0.9rem;
          }
          .nqueens-cell, .sudoku-cell {
            width: 30px;
            height: 30px;
            font-size: 0.8rem;
          }
          .maze-cell {
            width: 25px;
            height: 25px;
            font-size: 0.7rem;
          }
        }
        /* Help Modal */
        .help-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
        }
        .help-content {
          background: var(--bg-secondary);
          border-radius: 1rem;
          padding: 2rem;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
          border: 1px solid var(--border-color);
        }
        .help-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }
        .help-section {
          margin-bottom: 1.5rem;
        }
        .help-section h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--primary-color);
        }
        .help-section p {
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 0.5rem;
        }
        .help-section ul {
          color: var(--text-secondary);
          padding-left: 1.5rem;
        }
        .help-section li {
          margin-bottom: 0.25rem;
        }
        .close-help {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 500;
          margin-top: 1rem;
        }
        .close-help:hover {
          background: #4f46e5;
        }
        /* Approach Selector */
        .approach-selector {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .approach-selector label {
          font-weight: 500;
          color: var(--text-primary);
        }
        .placeholder {
          color: var(--text-secondary);
          font-style: italic;
          text-align: center;
          padding: 2rem;
        }
      `}</style>

      <div className="header">
        <div className="title">🧠 DSA Visualizer</div>
        <div className="header-controls">
          <button className="help-button" onClick={() => setShowHelp(true)}>
            Help
          </button>
          <button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="sidebar">
          {Object.entries(algorithms).map(([categoryKey, category]) => (
            <div key={categoryKey} className="category">
              <div className="category-title">{category.name}</div>
              <div className="category-description">{category.description}</div>
              {Object.entries(category.items).map(([algorithmKey, algorithm]) => (
                <div
                  key={algorithmKey}
                  className={`algorithm-item ${
                    selectedCategory === categoryKey && selectedAlgorithm === algorithmKey ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedCategory(categoryKey)
                    setSelectedAlgorithm(algorithmKey)
                  }}
                >
                  <div className="algorithm-header">
                    <span>{algorithm.name}</span>
                    <span className="complexity">{algorithm.complexity}</span>
                  </div>
                  <div className="algorithm-description">{algorithm.description}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="content">
          <div className="controls">
            {/* Move DP approach selector to top */}
            {selectedCategory === "dynamicProgramming" && selectedAlgorithm === "fibonacci" && (
              <div className="control-group">
                <div className="input-group">
                  <label>Approach:</label>
                  <select value={dpApproach} onChange={(e) => setDpApproach(e.target.value)} className="select">
                    <option value="recursive">Recursive</option>
                    <option value="memoization">Memoization</option>
                    <option value="tabulation">Tabulation</option>
                    <option value="spaceOptimized">Space Optimized</option>
                  </select>
                </div>
              </div>
            )}

            <div className="control-group">
              <button className="btn btn-primary" onClick={togglePlay}>
                {isPlaying ? "⏸️ Pause" : "▶️ Play"}
              </button>
              <button className="btn btn-secondary" onClick={stepBackward} disabled={currentStep <= 0}>
                ⏮️ Step Back
              </button>
              <button className="btn btn-secondary" onClick={stepForward}>
                ⏭️ Step Forward
              </button>
              <button className="btn btn-secondary" onClick={reset}>
                🔄 Reset
              </button>
            </div>

            <div className="control-group">
              <div className="speed-control">
                <label>Speed:</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={speed}
                  onChange={(e) => setSpeed(Number.parseInt(e.target.value))}
                  className="speed-slider"
                />
                <span>{speed}%</span>
              </div>
            </div>

            {/* Dynamic controls based on category and algorithm */}
            {(selectedCategory === "sorting" ||
              selectedCategory === "searching" ||
              selectedCategory === "arrays" ||
              selectedCategory === "dynamicProgramming" ||
              selectedCategory === "backtracking") && (
              <div className="control-group">
                <div className="input-group">
                  <label>Value:</label>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter value"
                    className="input"
                  />
                </div>
              </div>
            )}

            {selectedCategory === "searching" && (
              <div className="control-group">
                <div className="input-group">
                  <label>Search Target:</label>
                  <input
                    type="number"
                    value={searchTarget}
                    onChange={(e) => setSearchTarget(Number.parseInt(e.target.value))}
                    className="input"
                  />
                </div>
              </div>
            )}

            {(selectedAlgorithm === "insertion" || selectedAlgorithm === "deletion") && (
              <div className="control-group">
                <div className="input-group">
                  <label>Position:</label>
                  <input
                    type="number"
                    value={insertPosition}
                    onChange={(e) => setInsertPosition(e.target.value)}
                    placeholder="Position"
                    className="input"
                  />
                </div>
              </div>
            )}

            {selectedCategory === "linkedList" && (
              <div className="control-group">
                <div className="input-group">
                  <label>List Type:</label>
                  <select value={linkedListType} onChange={(e) => setLinkedListType(e.target.value)} className="select">
                    <option value="singly">Singly Linked</option>
                    <option value="doubly">Doubly Linked</option>
                    <option value="circular">Circular Linked</option>
                  </select>
                </div>
              </div>
            )}

            {selectedCategory === "trees" && (selectedAlgorithm === "binaryTree" || selectedAlgorithm === "bst") && (
              <div className="control-group">
                <div className="input-group">
                  <label>Traversal Type:</label>
                  <select value={traversalType} onChange={(e) => setTraversalType(e.target.value)} className="select">
                    <option value="inorder">Inorder</option>
                    <option value="preorder">Preorder</option>
                    <option value="postorder">Postorder</option>
                  </select>
                </div>
              </div>
            )}

            {selectedCategory === "graphs" && (
              <div className="control-group">
                <div className="input-group">
                  <label>Graph Type:</label>
                  <select value={graphType} onChange={(e) => setGraphType(e.target.value)} className="select">
                    <option value="directed">Directed</option>
                    <option value="undirected">Undirected</option>
                  </select>
                </div>
              </div>
            )}

            {selectedAlgorithm === "addEdge" && (
              <>
                <div className="control-group">
                  <div className="input-group">
                    <label>From Node:</label>
                    <input
                      type="text"
                      value={edgeFrom}
                      onChange={(e) => setEdgeFrom(e.target.value)}
                      placeholder="A"
                      className="input"
                    />
                  </div>
                </div>
                <div className="control-group">
                  <div className="input-group">
                    <label>To Node:</label>
                    <input
                      type="text"
                      value={edgeTo}
                      onChange={(e) => setEdgeTo(e.target.value)}
                      placeholder="B"
                      className="input"
                    />
                  </div>
                </div>
                <div className="control-group">
                  <div className="input-group">
                    <label>Weight:</label>
                    <input
                      type="number"
                      value={edgeWeight}
                      onChange={(e) => setEdgeWeight(e.target.value)}
                      placeholder="1"
                      className="input"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="control-group">
              <button className="btn btn-success" onClick={addElement}>
                ➕ Add Element
              </button>
              <button className="btn btn-danger" onClick={removeElement}>
                ➖ Remove Element
              </button>
              {(selectedCategory === "sorting" ||
                selectedCategory === "searching" ||
                selectedCategory === "arrays") && (
                <button className="btn btn-secondary" onClick={generateRandomArray}>
                  🎲 Random Array
                </button>
              )}
              {selectedAlgorithm === "sudoku" && (
                <button className="btn btn-secondary" onClick={generateRandomSudoku}>
                  🎲 Random Sudoku
                </button>
              )}
              {selectedAlgorithm === "maze" && (
                <button className="btn btn-secondary" onClick={generateRandomMaze}>
                  🎲 Random Maze
                </button>
              )}
            </div>
          </div>

          <div className="visualization">
            {currentViz && (
              <div className="step-info">
                <div className="step-counter">
                  Step {currentStep + 1} of {steps.length}
                </div>
                <div className="step-description">{currentViz.description}</div>
              </div>
            )}
            {renderVisualization()}

            {/* Info box with complexity and color legend */}
            <div className="info-box">
              <div className="info-title">Algorithm Information</div>
              <div className="info-content">
                <div className="complexity-info">
                  <div className="complexity-item">
                    <strong>Time:</strong> {algorithmInfo.timeComplexity || algorithmInfo.complexity}
                  </div>
                  <div className="complexity-item">
                    <strong>Space:</strong> {algorithmInfo.spaceComplexity || "O(1)"}
                  </div>
                </div>
                <div className="color-legend">
                  <strong>Color Legend:</strong>
                  {getColorLegend().map((item, index) => (
                    <div key={index} className="legend-item">
                      <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
                {currentViz && (
                  <div className="step-info-detail">
                    <strong>Current Step:</strong> {currentViz.description}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showHelp && (
        <div className="help-modal" onClick={() => setShowHelp(false)}>
          <div className="help-content" onClick={(e) => e.stopPropagation()}>
            <div className="help-title">DSA Visualizer Help</div>
            <div className="help-section">
              <h3>Getting Started</h3>
              <p>
                Select a category from the sidebar, then choose an algorithm to visualize. Use the control buttons to
                play, pause, step through, or reset the visualization.
              </p>
            </div>
            <div className="help-section">
              <h3>Controls</h3>
              <ul>
                <li>
                  <strong>Play/Pause:</strong> Start or stop the automatic animation
                </li>
                <li>
                  <strong>Step Forward/Back:</strong> Manually step through the algorithm
                </li>
                <li>
                  <strong>Reset:</strong> Return to the initial state
                </li>
                <li>
                  <strong>Speed:</strong> Adjust animation speed (1-100%)
                </li>
              </ul>
            </div>
            <div className="help-section">
              <h3>Data Manipulation</h3>
              <ul>
                <li>
                  <strong>Add Element:</strong> Add new elements to the data structure
                </li>
                <li>
                  <strong>Remove Element:</strong> Remove elements from the data structure
                </li>
                <li>
                  <strong>Random Array:</strong> Generate a new random array for sorting/searching
                </li>
                <li>
                  <strong>Random Sudoku/Maze:</strong> Generate random puzzles for backtracking algorithms
                </li>
              </ul>
            </div>
            <div className="help-section">
              <h3>Features</h3>
              <ul>
                <li>
                  <strong>Linked List Types:</strong> Choose between singly, doubly, and circular linked lists
                </li>
                <li>
                  <strong>Tree Traversals:</strong> Select inorder, preorder, or postorder traversal
                </li>
                <li>
                  <strong>Graph Types:</strong> Visualize directed or undirected graphs with arrows
                </li>
                <li>
                  <strong>DP Approaches:</strong> Compare recursive, memoization, tabulation, and space-optimized
                  approaches
                </li>
              </ul>
            </div>
            <div className="help-section">
              <h3>Algorithm Categories</h3>
              <ul>
                <li>
                  <strong>Sorting:</strong> Bubble, Selection, Insertion, Merge, Quick, Heap Sort
                </li>
                <li>
                  <strong>Searching:</strong> Linear and Binary Search, DFS, BFS
                </li>
                <li>
                  <strong>Data Structures:</strong> Arrays, Stacks, Queues, Linked Lists, Trees, Graphs
                </li>
                <li>
                  <strong>Dynamic Programming:</strong> Fibonacci, LCS, Knapsack, Coin Change
                </li>
                <li>
                  <strong>Backtracking:</strong> N-Queens, Sudoku Solver, Maze Solving, Permutations
                </li>
              </ul>
            </div>
            <button className="close-help" onClick={() => setShowHelp(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
