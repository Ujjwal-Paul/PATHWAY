# PATHWAY - Pathfinding Visualizer

PATHWAY is a web-based pathfinding visualizer that allows users to interactively explore and visualize various pathfinding algorithms on a grid. This tool is designed to help users understand the mechanics of different algorithms and observe their performance in finding the shortest path from a starting point to an endpoint.

## Features

- **User-Friendly Interface:** Easily add start and end points, create walls, and choose algorithms with intuitive buttons.
- **Algorithm Descriptions:** Gain insights into each algorithm with brief descriptions displayed upon selection.
- **Speed Control:** Adjust the visualization speed to observe the algorithm's progress at your preferred pace.
- **Visualization Details:** After visualization, view the number of cells visited and the length of the generated path.

## Algorithms

**Breadth-First Search (BFS):** Unweighted algorithm. Guarantees the shortest path. Explores nodes level by level.

**Depth-First Search (DFS):** Unweighted algorithm. May not guarantee the shortest path. Explores as far as possible along each branch before backtracking.

**A* Search:** Weighted algorithm. Uses a heuristic to estimate the cost from the start to the goal. Combines the cost to reach the current node and the heuristic cost.

**Best-First Search:** Weighted algorithm. Chooses the path that seems most promising based on heuristic evaluation. Doesn't guarantee the shortest path.

**Bidirectional BFS Search:** Combines two BFS searches, one from the start and one from the end. Reduces the search space and improves efficiency.

## Usage

1. Open the PATHWAY website [here](https://ujjwal-paul.github.io/PATHWAY/).
2. Place start and end points on the grid.
3. Add walls or obstacles if needed.
4. Choose an algorithm from the available options.
5. Adjust the visualization speed.
6. Click the "Visualize" button to start the visualization.
7. After completion, review the details in the description section.
