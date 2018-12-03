# LogStream

I dunno, I'm just thinking that maybe it'd be nice to make it easier to rely on stream
instead of console.log when you build an independent module.

## Without LogStream
```javascript
// with console.log
class X {
  doSomething(...args){
    console.log(...args)
    // actually doing things.
  }
}
```

## With LogStream
```javascript
class X extends LogStream(Object) { // or any parents
  doSomething(...args){
    this.log({ args, level: 'debug' }) // level is debug if omitted
    // actually doing things...
  }
}

X.logStream().pipe(LogStream.ObjectToString()).pipe(process.stdout)
// or if you`re using winston
X.logStream().pipe(winston.loggers.get('YOUR_SPECIFIC_LOGGER'));
```
hence you can keep the debugging code, without having to comment / uncomment it to shut the noise.


any message sent to log, will be pushed to static Readable Stream in the class that extends LogStream;
