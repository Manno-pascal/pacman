const map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],

    [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],

    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// Classe de noeud pour l'algorithme A*
class Node {
    constructor(x, y, cost, depth, parent) {
        this.x = x;
        this.y = y;
        this.cost = cost;
        this.depth = depth;
        this.parent = parent;
    }
}

// Fonction pour trouver le chemin avec l'algorithme A*
function AStar(grid, start, end) {
    // Liste ouverte de noeuds à explorer
    let openList = [];
    // Liste fermée de noeuds déjà explorés
    let closedList = [];
    // Ajout du noeud de départ à la liste ouverte
    openList.push(new Node(start[0], start[1], 0, 0, null));

    // Boucle principale de l'algorithme
    while (openList.length > 0) {
        // Récupération du noeud avec le coût le plus faible
        let lowestIndex = 0;
        for (let i = 0; i < openList.length; i++) {
            if (openList[i].cost < openList[lowestIndex].cost) {
                lowestIndex = i;
            }
        }
        let currentNode = openList[lowestIndex];

        // Suppression du noeud de la liste ouverte et ajout à la liste fermée
        openList.splice(lowestIndex, 1);
        closedList.push(currentNode);

        // Si le noeud actuel est le noeud d'arrivée, on construit et retourne le chemin
        console.log(currentNode.x, end[0],currentNode.y,end[1]);
        if (currentNode.x === end[0] && currentNode.y === end[1]) {
            
            let paths = [];
            let current = currentNode;
            while (current !== null) {
                // console.log([current.x, current.y]);
                paths.push([current.x, current.y]);
                current = current.parent;
            }
            return paths.reverse();
        }
        
        


        // Récupération de la liste des voisins du noeud actuel
        let neighbors = getNeighbors(grid, currentNode);
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];

            // Si le voisin est déjà dans la liste fermée, on passe au suivant
            if (closedList.find(node => node.x === neighbor.x && node.y === neighbor.y)) {
                continue;
            }

            // Calcul du coût total pour atteindre ce voisin
            let cost = currentNode.cost + getDistance(currentNode, neighbor);

            // Si le voisin n'est pas dans la liste ouverte ou si le coût actuel est meilleur que le coût enregistré précédemment pour ce voisin, on met à jour ses valeurs
            let openNode = openList.find(node => node.x === neighbor.x && node.y === neighbor.y);
            if (!openNode || cost < openNode.cost) {
                openList.splice(openList.indexOf(openNode), 1, new Node(neighbor.x, neighbor.y, cost, currentNode.depth + 1, currentNode));
            }
        }
    }

    // Si on arrive ici, cela signifie qu'il n'y a pas de chemin vers le noeud d'arrivée
    return [];
}

// Fonction pour récupérer la liste des voisins accessibles d'un noeud
function getNeighbors(grid, node) {
    let neighbors = [];
    let x = node.x;
    
    let y = node.y;

    if (grid[x - 1] && grid[x - 1][y] === 1) {
      neighbors.push(new Node(x - 1, y, 0, 0, null));
    }
    if (grid[x + 1] && grid[x + 1][y] === 1) {
      neighbors.push(new Node(x + 1, y, 0, 0, null));
    }
    if (grid[x] && grid[x][y - 1] === 1) {
      neighbors.push(new Node(x, y - 1, 0, 0, null));
    }
    if (grid[x] && grid[x][y + 1] === 1) {
      neighbors.push(new Node(x, y + 1, 0, 0, null));
    }
    return neighbors;
  }

// Fonction pour calculer la distance entre deux noeuds
function getDistance(node1, node2) {
    let dx = Math.abs(node1.x - node2.x);
    let dy = Math.abs(node1.y - node2.y);
    return dx + dy;
}
// console.table(map);

let start = [0, 0];
let end = [1, 0];
let result = AStar(map, start, end);
console.table(result);


