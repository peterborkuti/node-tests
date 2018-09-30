const treeKill = require('tree-kill');
const { execFile } = require('child_process');

let child = null;

function startProcess() {
    if (child && child.pid) {
        console.log("startProcess: child (" + child.pid + ") not null. Exiting.");
        setTimeout(startProcess, 100);
        return;
    }

    console.log("Start starting process");

    child = execFile('node', ['example.js'], (error, stdout, stderr) => {
        if (error) {
            console.error(error);
        }
        console.log(stdout);
    });

    console.log("child:" + child.pid);

    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

    setTimeout(doIt, 2000);
}

function killProcess() {
    if (child && child.pid) {
        console.log("killProcess: start to kill process:" + child.pid);
        treeKill(child.pid, 'SIGTERM', function(err) {
            console.log("childprocess " + child.pid + " killed");
            child = null;
        });
    }
    else {
        console.log("killProcess: No child, exiting");
    }
};

function doIt() {
    killProcess();
    startProcess();
}

doIt();