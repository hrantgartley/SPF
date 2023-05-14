from flask import Flask, jsonify
app = Flask(__name__)

# Define your graph data structure
graph = {
    'A': {'B': 5, 'C': 2},
    'B': {'D': 4, 'E': 2},
    'C': {'B': 8, 'E': 7},
    'D': {'E': 6, 'F': 3},
    'E': {'F': 1, 'G': 2, 'H': 3},
    'F': {'I': 5},
    'G': {'I': 3, 'J': 4},
    'H': {'J': 6, 'K': 2},
    'I': {'L': 4, 'M': 5},
    'J': {'M': 6, 'N': 3},
    'K': {'N': 4, 'O': 5},
    'L': {'P': 2, 'Q': 3},
    'M': {'Q': 4, 'R': 6},
    'N': {'R': 5, 'S': 2},
    'O': {'S': 3, 'T': 4},
    'P': {'U': 5},
    'Q': {'U': 6, 'V': 3},
    'R': {'V': 2, 'W': 4},
    'S': {'W': 5},
    'T': {'W': 6},
    'U': {},
    'V': {},
    'W': {}
}

# Implement the shortest path algorithm


def shortestPath(start, end):
    costs = {}
    parents = {}
    visited = []

    # Initialize the costs and parents
    for node in graph:
        if node == start:
            costs[node] = 0
        else:
            costs[node] = float('inf')
        parents[node] = None

    # Find the lowest cost node
    node = findLowestCostNode(costs, visited)

    # Loop until there are no more nodes to process
    while node:
        if node == end:
            # We've reached the end node, so return the path
            path = [end]
            while parents[node]:
                path.append(parents[node])
                node = parents[node]
            path.reverse()
            return path

        cost = costs[node]
        neighbors = graph[node]

        # Loop through each neighbor
        for n in neighbors:
            newCost = cost + neighbors[n]
            # If it's cheaper to get to this neighbor by going through this node...
            if costs.get(n, float('inf')) > newCost:
                # ... update the cost for this node
                costs[n] = newCost
                # This node becomes the new parent for this neighbor
                parents[n] = node

        # Add the node to the visited array
        visited.append(node)

        # Find the next lowest cost node
        node = findLowestCostNode(costs, visited)

    # There is no path from start to end
    return None


def findLowestCostNode(costs, visited):
    lowestCost = float('inf')
    lowestCostNode = None

    # Loop through each node
    for node in costs:
        cost = costs[node]
        # If it's the lowest cost so far and hasn't been visited yet...
        if cost < lowestCost and node not in visited:
            # ... set it as the new lowest-cost node.
            lowestCost = cost
            lowestCostNode = node
    return lowestCostNode


@app.route('/shortest-path/<start>/<end>')
def find_shortest_path(start, end):
    # Call the shortestPath function to find the shortest path
    path = shortestPath(start, end)
    # Return the path as a JSON response
    return jsonify({'path': path})


if __name__ == '__main__':
    app.run(port=3000)
