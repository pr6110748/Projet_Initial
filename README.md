# ProjetInitial
 Manage booking of a presidential suite


# PROJECT SETTINGS

        ## DATABASE

            ### Install MYSQL and create database
                - Download and Intall mysql on your pc for windows  https://dev.mysql.com/downloads/installer/ 
                    or for macOs https://dev.mysql.com/doc/mysql-macos-excerpt/5.7/en/macos-installation.html
                - Create a Root user on mysql WORKBENCH:
                    ```CREATE USER 'root'@'localhost' IDENTIFIED BY 'Homework2023!';```
                - Grant all privileges to ROOT user:
                    ```GRANT ALL PRIVILEGES ON * . * TO 'root'@'localhost';
                        FLUSH PRIVILEGES;```
                -execute the **sqlSqueries.sql** in mysql WORKBENCH for set up the database

            ### setting MYSQL database on VS CODE
                -open a terminal and install mysql with all those necessaries packages: 
                    ``` npm install 
                        npm install mysql
                    ```
        

# RUNNING with front-end
    The base URL is http://localhost:4000/
    The command line for execute the code is: 
                ```node server.js```
    if the Booking is correct, you must have a successfull page with your identification number on the link
    if the Booking is not correct, you must have an error page


# RUNNING with postman
    On the VS code terminal, run the cmd:
        ```node server.js```
    Open postman and execute the code!
    

    https://quickstarts.postman.com/guide/api-builder-node-and-mysql/index.html?index=..%2F..index#6
