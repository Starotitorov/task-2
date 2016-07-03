(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;

    /**
     * Создает HTML элемент заданного типа с заданным CSS классом
     *
     * @param {string} type тип создаваемого HTML элемента
     * @param {string} className CSS класс
     * @returns {HTMLElement} HTML элемент
     */
    function element(type, className, id='') {
        var elem = document.createElement(type);
        elem.className = className;
        if (id)
            elem.id = id;
        return elem;
    }

    /**
     * Функция анимирует поиск пути.
     *
     * @param {number[]} путь в виде набора id клеток, которые являются его частью
     * @param {number} интервал между кадрами
     */
    function animate_path(way, interval) {
        var previousElem = document.getElementById('cell'.concat(way[0])),
            n = 1,
            elem;
        var timer = setInterval(function() {
            if (n >= way.length) {
                clearInterval(timer);
                return;
            }
            elem = document.getElementById('cell'.concat(way[n]));
            previousElem.className = 'maze__cell maze__cell_path';
            elem.className = 'maze__cell maze__cell_current';
            previousElem = elem;
            ++n;
        }, interval);
    }

    /**
     * Создает визуализацию лабиринта по его схеме с возможностью наложения маршрута
     *
     * @param {number[][]} maze схема лабиринта
     * @param {[number, number][]} [path] маршрут
     * @returns {HTMLElement} HTML элемент
     */
    function render(maze, path) {
        // debugger;
        var way = [];
        var id;
        if (path && path.length) {
            var point, 
                i;

            for (i = 0; i < path.length; i++) {
                point = path[i];
                maze[point[1]][point[0]] = PATH;
                id = point[1] * maze[0].length + point[0] + 1;
                way.push(id);
            }
            point = path[0];
            maze[point[1]][point[0]] = CURRENT;
        }

        var containerElem = element('div', 'maze'),
            numberOfCells = 0,
            rowElem,
            type,
            row, 
            cell,
            x, 
            y;

        for (y = 0; y < maze.length; y++) {
            row = maze[y];
            rowElem = element('div', 'maze__row');

            for (x = 0; x < row.length; x++) {
                cell = row[x];

                switch (cell) {
                    case WALL:
                        type = 'wall';
                        break;

                    /** case PATH:
                        type = 'path';
                        break;
                     */

                    case CURRENT:
                        type = 'current';
                        break;

                    default:
                        type = undefined;
                }
                rowElem.appendChild(
                    element('div', 'maze__cell' + (type ? ' maze__cell_' + type : ''),
                            'cell'.concat(++numberOfCells))
                );
            }

            containerElem.appendChild(rowElem);
        }

        return [way, containerElem];
    }

    root.maze.render = render;
    root.maze.animate_path = animate_path;
})(this);
