### How to build the ezding project with Next.js

* install node
* open terminal , and cd to the expect folder.
* enter this script  
    
    ```npm install --save next react react-dom```
    
* then you should add script in package.json.

    ``` 
    {
        "scripts": {
            "dev": "next",
            "build": "next build",
            "start": "next start"
          }
    }
    ```

* enter this script to start the project
    
    ```npm start```

* and you will find 404 on your browser , because you didn`t defined your homepage.
* create the folder, that must be named ```pages```.
* create the file in pages folder, that should be named ```index.js``` , or you can modify it in package.json
* ```"main": "index.js"``` whatever you want

    ```
    "name": "movie-frontend-ssr",
    "version": "1.0.0",
    "main": "index.js",
    ```
* in ```index.js``` file , should return something for browser rendering

    #### example
    ```
    export default () => <div>Welcome to next.js!</div>
    ```

* Congratulations! check the localhost:3000/ , and you will see that!!!


<br />
### How to run the project

* pull this project from gitLab
* open terminal , and cd to the expect folder.
* use this script  
    
     ```npm install```
     
* then that will download node_modules about package.json 
* when finished, you can use this script

    ```npm start```
    
* defalut export port is 3000, check localhost:3000/ in browser
* I hope you will have a good experience in Next.js


<br />
### How to deploy the project

* use these scripts to build you project

     ```npm run build```
     ```npm run start```



<br />
### About this project 

* if in dev version , use this script to set up

     ```npm run dev```

* if in production version , use this script ,it will auto run start

     ```npm run build```



<br />
### How to use the forever.js
* install forever.js

    ```npm install forever -g```

* install monitor

    ```npm install forever-monitor```

* enter this script 

    ```forever start server.js```

* if you want stop forever

    ```forever stop XXX```

* or you can alse stop all processes

    ```forever stopall``` 


##### about forever.js script

* https://github.com/foreverjs/forever
* it can also be used to define the startup options for multiple applications, as shown below


    
    