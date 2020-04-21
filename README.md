# *Work task*.
#  *Server part*
### Used:
- Node (on the TypeScript)
- NGINX
- Docker

### To run you need:
Go to the root of the project and execute the command :

``` sh
$ docker-compose up --build -d
```
Afrer that created two Docker containers:
- ***reverse_proxy_nginx***
- ***backendpart***

**reverse_proxy_nginx** - implements the following features:
- http2
- ssl
- cache static files
- proxy to backend API
- storing images

**backendpart** - implements the following features:
- api for Front-end
- requests to mockAPI
- business logic

Also I have been implemented route layer in the form of decorators on the TypeScript.
I wanted to try a new approach for routing, as implemented in the Spring Java (Boot) through decorated.

`@Controller(<string>)` - adds module prefix
`@GET | @POST | @PUT | @DELETE ` - adds REST API method
