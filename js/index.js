(function (root) {
    var map = root.maze.MAZE_Y;
    var path = root.maze.solution(map, 1, 0);
    var interval = root.animation.INTERVAL;
    var [way, elem] = root.maze.render(map, path);
    document.querySelector('.outer').appendChild(elem);
    root.maze.animate_path(way, interval);
})(this);
