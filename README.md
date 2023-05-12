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

                - Before, you don't have to connect to Bell's server. uses a private server, otherwise, the commands will indicate errors.
                - Remove the **node_module** directory, **package.json** and **package-lock.json** files;
                - open a terminal and install mysql with all those necessaries packages: 
                    ``` npm install 
                        npm install date-and-time
                        npm install mysql
                    ```
        

# RUNNING with front-end
    The base URL is http://localhost:4000/
        for add a new Booking, use this URL: http://localhost:4000/booking/add/new
                                or click on **ADD NEW BOOKINK** button
    The command line for execute the code is: 
                ```node server.js```
    if the Booking is correct, you must have a successfull page with your identification number on the link
    if the Booking is not correct, you must have an error page


# RUNNING with postman
    On the VS code terminal, run the cmd:
        ```node server.js```
    Open postman and execute the code!


#### if your booking is correct, you will have a link like this: http://localhost:4000/success/16825
    on this link, **16825** is your reservation number.
    
