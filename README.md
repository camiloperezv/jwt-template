# jwt-template
This is a template project for NodeJs, Express, Mongo and Json Web Token (JWT) Authentication an registration.
Feel free to clone it or forkit. 

This project is based on TDD method for creating models, here you will find the login, signup and update user in user.model into models folder.

This project runs under Docker architecture, you must have docker installed, but if is not your case, you can run it executing the bin/www file with node, but in this case you must have a mongo instance running.

Please modify the session secrets defined in ```env``` folder

If you are using docker and you are using port 3000 or 27017 in other project, please changeit on docker-compose.yml, feel free to use any port, but if you do so, then change the mongo route in the files defined in env folder

## Login - SignUp - Mongo - Express -  JWT - Template


### Requirements 
1. Docker
2. Node 8.5
3. npm or yarn
4. mocha.
```
yarn add global mocha
```
5. nyc
```
yarn add global nyc
```

### To run the project
```
docker-compose up -d
```
