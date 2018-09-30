let c = 0;

function increment() {
    console.log(process.pid + ":" + c);
    c += 1;
    setTimeout(increment, 500);
}

increment();

process.on('SIGTERM', function () {
    console.log("try to exit:" + process.pid);
    process.exit(0);
});