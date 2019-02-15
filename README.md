# Development

### Setup
Be sure to have php and composer installed in the terminal.

then install composer and npm dependencies:
```shell
composer install
npm install
```
- Clone the ok-atomic-frontend repo into the parent folder of this repo.
- Use npm link to include repo

```shell
# ok-atomic-frontend
npm link
# ok-atomic-frontend-viewer
npm link ok-atomic-frontend
```
ps: if you run `npm install` in viewer you need to run `npm link ok-atomic-frontend` again.

### To start server
There are two options to get hot reloading. One is faster, but requires two terminal windows open and does not log errors in the terminal and the other is slower, but logs errors in the terminal.
#### Faster reloading without error logging
You need two terminal windows running, in the first, run
```shell
npm run watch
```

in the next run
```shell
npm run hmr
```

#### Slower reloading with error logging
Only one terminal required for this one, run
```shell
npm run hmr-watch
```

### To scaffold a new pattern
If your server is running, open a third terminal and run
```shell
npm run mkpat
```
This will create all files needed to make a complete pattern with some boilerplate code to get quickly up and running.

### Building docker image
```shell
docker build -t ukeweb/styleguide_devtools:[VERSION] .
docker push ukeweb/styleguide_devtools:[VERSION]
```

## Known issues
* Its a little bit slow to update some areas
* Doesn't catch changes in imported js/sass files. Probably need to add these files to atomicStructure.json so a change can be catched.
* Errors from npm run dev isn't piped into the watch-modules process so you have no way of knowing if the build failed
