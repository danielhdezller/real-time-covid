# real-time-covid
The aims of this small project is to provide a few endpoints to transform raw data in to information.

## Steps to start the application.
1. Clone the project.
2. Set the environments variables.
```bash
Copy and paste the file config.json.example
with out the .example at the end.
 ```
3. From the terminal move to the directory .docker/environments/dev and run the command:
```bash
 # to start the application service and database.
 $ docker-compose up 
 ```
4. Look the Swagger:

- [Real-Time-Covid Swagger](http://localhost:3000/real-time-covid-swagger) Open it after the server start.

 ## Developed with:
- [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
- [CovidApi](https://documenter.getpostman.com/view/10808728/SzS8rjbc) the source covid data.

 ## Developed by:
- Author - [Daniel Hernández Llerena](https://github.com/danielhdezller)
