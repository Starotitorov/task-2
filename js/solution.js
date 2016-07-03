(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;

    /**
     * Функция сравнивает два массива.
     *
     * @param {number[]} a первый массив
     * @param {number[]} b второй массив
     * @returns {boolean} результат сравнения
     */
    function compareArrays(a, b) {
        if (a.length != b.length)
            return false;
        for (var i = 0; i < a.length; ++i)
            if (a[i] != b[i])
                return false;
        return true;
    }

    /**
     * Функция находит путь к выходу и возвращает найденный маршрут. Используется алгоритм
     * поиска в ширину.
     *
     * @param {number[][]} maze карта лабиринта представленная двумерной матрицей чисел
     * @param {number} x координата точки старта по оси X
     * @param {number} y координата точки старта по оси Y
     * @returns {[number, number][]} маршрут к выходу представленный списоком пар координат
     */
    function solution(maze, x, y) {
        // debugger;
        if (maze[y][x] == WALL)
            return [[x, y]];
        var startPoint = [x, y];
        var queue = new Queue();
        queue.enqueue(startPoint);
        var m = maze.length,
            n = maze[0].length;
        var parents = new Array(m);
        for (var i = 0; i < m; ++i)
            parents[i] = new Array(n).fill(null);
        parents[y][x] = [-1, -1];
        var x, y, v;
        var exitPoint = null;
        while (!queue.isEmpty()) {
            v = queue.dequeue();
            x = v[0];
            y = v[1];
            if (y == m - 1 && maze[y][x] != WALL) {
                exitPoint = [x, y];
                break;
            }
            for (var i = -1; i < 2; ++i)
                for (var j = -1; j < 2; ++j) {
                    if (i == 0 && j == 0 || i != 0 && j != 0)
                        continue;
                    var coordX = x + i,
                        coordY = y + j;
                    if (coordX < 0 || coordX >= n || coordY < 0 || coordY >= m)
                        continue;
                    if (!parents[coordY][coordX] && maze[coordY][coordX] != WALL) {
                        queue.enqueue([coordX, coordY]);
                        parents[coordY][coordX] = v;
                    }
                }
        }
        if (!exitPoint) {
            return [startPoint];
        }
        var path = [exitPoint];
        for (var p = exitPoint; !compareArrays(p, [-1, -1]); p = parents[p[1]][p[0]])
            path.push(p);
        path = path.reverse();
        return path;
    }

    root.maze.solution = solution;
})(this);
