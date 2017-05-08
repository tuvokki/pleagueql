import nodemon from 'nodemon';
import path from 'path';

nodemon({
  script: path.join('server', 'index.js'),
  ext: 'js graphql',
  exec: 'babel-node',
}).on('restart', () => console.log('Restarting server due to file change\n'));

// Ensure stopping our parent process will properly kill nodemon's process
// Ala https://www.exratione.com/2013/05/die-child-process-die/

// SIGTERM AND SIGINT will trigger the exit event.
process.once("SIGTERM", function () {
  process.exit(0);
});
process.once("SIGINT", function () {
  process.exit(0);
});
// And the exit event shuts down the child.
process.once("exit", function () {
  nodemon.emit("SIGINT");
});
