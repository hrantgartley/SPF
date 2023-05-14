
const express = require('express')
const app = express()
const cors = require('cors')
const { graph } = require('./graph.js')
const corsOptions = {
    origin: '*',
    methods: 'GET,',
    allowedHeaders: 'Content-Type'

}


app.use(cors(corsOptions))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()

})


function shortestPath(start, end) {

    const costs = {}
    const parents = {}
    const visited = []

    for (let node in graph) {

        if (node === start) {
            costs[node] = 0
        } else {
            costs[node] = Infinity
        }
        parents[node] = null
    }

    let node = findLowestCostNode(costs, visited)

    while (node) {
        if (node === end) {
            let path = [end]
            while (parents[node]) {
                path.push(parents[node])
                node = parents[node]
            }
            path.reverse()
            return path
        }

        let cost = costs[node]

        let neighbors = graph[node]

        for (let n in neighbors) {
            let newCost = cost + neighbors[n]

            if (costs[n] > newCost) {

                costs[n] = newCost
                parents[n] = node
            }
        }

        visited.push(node)

        node = findLowestCostNode(costs, visited)
    }

    return null

}


function findLowestCostNode(costs, visited) {

    let lowestCost = Infinity
    let lowestCostNode = null

    for (let node in costs) {
        let cost = costs[node]

        if (cost < lowestCost && visited.indexOf(node) === -1) {

            lowestCost = cost
            lowestCostNode = node
        }
    }
    return lowestCostNode

}

// rest call to map a path to our front-end
app.get('/shortest-path/:start/:end', (req, res) => {

    const start = req.params.start
    const end = req.params.end
    const path = shortestPath(start, end)

    res.json(
        { path: path }
    )

})


app.listen(5500, () => {
    console.log('Listening on port 3000')

})
