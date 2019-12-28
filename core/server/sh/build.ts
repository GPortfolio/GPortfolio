import childProcess from 'child_process';

const { spawn } = childProcess;

export default () => new Promise((resolve) => {
  const cmd = spawn('npm', ['run', 'build'], {
    detached: true,
  });

  let output = '';

  cmd.stdout.on('data', (data) => {
    output += data.toString();
  });

  cmd.on('close', (code) => {
    resolve({ output, code });
  });
});
