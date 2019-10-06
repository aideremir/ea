# evildistributor.com frontend

## Local dev

### Set up shared components

frontend-components repo code must be on the same dir level as ED project code. I.e.

```
projects/
    frontend-components/
        shared/
    evildistributor.com/
        ...
        package.json
```

### Set up project

Make sure that `/etc/hosts` contains
```
127.0.0.1 dev.evildistributor.com
```

Set up code

```
# npm i
# npm run install-flowplayer
# npm run link-ea-components # run after every npm i
# cp config/app.config.dev.js config/app.config.js
# npm run dev
```

Open http://dev.evildistributor.com:3000

### Codestyle

- ES6
- Modules
- Disable JSLint, JSHint
- Enable ESLint (.eslintrc.json)
