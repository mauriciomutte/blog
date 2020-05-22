---
title: POKEDEX
description: Application using Spring Webflux and MongoDB To have a reactive pokedex.
date: 2020-05-20
template: portfolio
image: ./pokemon1.jpg
---

Created project repository: https://bit.ly/pokedex-reativo

At the end of this tutorial, you will have your own pokedex, and you can update, delete and create your pokémons in your own repository, with reactivity concepts using **Events Streams**, and **Functional Endpoints** in a simple and usual way, a very cool project to have as a portfolio!
**Did you like it? So come on ... (ɔ◔‿◔) ɔ**

#Setting up the project
What you need to have installed before you start:

- JDK 8 or 9
- An IDE for development, I will use [IntelliJ](https://www.jetbrains.com/idea/download/#section=windows)
- The [Heroku CLI](https://id.heroku.com/login)
- Have Maven 3 with its environment variables set
- Postman

> It is very important that you have Maven 3, because Heroku CLI only runs on this version ... If you don't have it [Click here](https://maven.apache.org/download.cgi) and install maven in the correct version to make your application go up correctly;)

You should now access the [Spring Initialzr](https://start.spring.io/), and select the following dependencies:

- Spring Reactive Web
- Spring Data Reactive MongoDB
- Embedded MongoDB Database

In the Group we will use: `com.pokedex`
In Artifact: `reactiveweb`

The package name is automatically generated!

After all variables are generated, your Spring Initializr should look like this:
![spring initializier screen with all the settings the user chose according to the tutorial](https://dev-to-uploads.s3.amazonaws.com/i/ndiw8uy9vvfeceul7fjv.PNG)

There, now just click on `GENERATE CRTL +`, and spring initializr will generate a ZIP file and you should extract that file in a **directory that you can find later**.

# Importing the project

After extracting the file you must open your IDE, in this case I will open IntelliJ and click on **import project**

! [image of intellij idea as soon as we open it](https://dev-to-uploads.s3.amazonaws.com/i/g3tk1n0gcb6vn5d3dh9j.PNG)

Clicking on ** import project ** you will see all your directories, just locate where the project you downloaded from Spring Initialzr will be, and import it by clicking **ok**
! [image of directories on windows](https://dev-to-uploads.s3.amazonaws.com/i/hlfcsqsqcln22dtmgsor.PNG)

A window will appear with two options, you must choose: **Maven**, as our project will be imported through a model that already exists
![choosing maven as a base project](https://dev-to-uploads.s3.amazonaws.com/i/cxkoq6fhda1a8ikc5626.PNG)
Now you can click on ** finish ** and your entire project will be loaded with environment variables! :P

#Configuring pom.xml
For our application to rise correctly, we need to put the dependency of the embbeded mong in the correct order, it must be before the `<dependency> <groupId> org.springframework.boot </groupId> <artifactId> spring-boot-starter-webflux </artifactId> </dependency>`, your pom.xml will look like this:

![pom.xml](https://dev-to-uploads.s3.amazonaws.com/i/fp0i98m5sq2t66n9ui2b.PNG)
just delete the <<scope> test </scope> `and put the embeded mongo's dependency right after.

This will make our application go up in the correct order, if this dependency is later the same it was, our application would not go up on the server, because it would not find, your depedendy should be as follows:
             `<dependency> <groupId> de.flapdoodle.embed </groupId> <artifactId> de.flapdoodle.embed.mongo </artifactId> </dependency>`

#Submitting the application for the first time
Let's see if our application is going up, on the womakerscode youtube channel we have a video where we explain about the Netty server, if you have any questions just take a [passy there](https://www.youtube.com/watch?v = KLsM_LRYzoM & t = 859s).
Going up the application we will see our server in action on port 8080.

I'll put a standard "hello world womakerscode" in the main () class

You will see that on the console our `System.out.println` will show the message, and the port that our application is on will also be signaled.
![application console](https://dev-to-uploads.s3.amazonaws.com/i/1qjrvny5nhr7tsdw9v9d.PNG)

#Creating a Model
To perform the tests on the database, we need our application to have the data to be saved, and also so that the MongoDB methods are found. Our variables will be saved there.

To create the package, right click **com.pokedex.reactiveweb**> New> Package> com.pokedex.reactiveweb. **model**> enter
![package model being generated in intellij](https://dev-to-uploads.s3.amazonaws.com/i/jkdc918yk00v2h8ij2a0.PNG)

Inside it create a new class with the name **Pokemon**, inside that class will be placed the information that pokemons will have, such as Id, Name, Power etc ... Inside this class put:

```java
 @Document
public class Pokemon {
    @Id
    private String id;

    private String nome;
    private String categoria;
    private String habilidades;
    private Double peso;
}
```

Now you only need to generate **getter and setters**, **boolean equals**, **hashcode**, and **toString**, you can do all of this by pressing **ALT + INSERT** > getter / setter > equals () hashcode () > toString () > Override Methods> Constructor

You can do it one after the other, the IntelliJ or IDE you are using will generate all these methods for you!

#Creating a repository
In the repository is where the data persistence, to create it, right click **com.pokedex.reactiveweb**> New> Package> com.pokedex.reactiveweb. **repository**> enter

Within that package an **interface** will be created with the name **PokemonRepository**

> Interface is a kind of abstraction that we use to specify the type of behavior that classes should implement

Inside this interface put the following code:

```java
public interface PokemonRepository extends ReactiveMongoRepository <Pokemon, String> {
}
```

Spring Data already makes our life a lot easier, so the only thing we need to put in this interface is a specification that it will work with the Pokemon String object.

> If you click on the **ReactiveMongoRepository** you will see what is behind the scenes, such as mono and flux methods, findByID, finalAll etc ..

Now we can initialize our database (͠≖ ʖ͠≖) 👌

#Initializing MongoDB
We are using Mongo Embeded, so it is not necessary for you to create an account or etc., everything is local on our machine.

In the Main () class, we will create a call from our database, using the CommandLiner, which is a functional interface that receives variable string arguments. It must be noted with **@ Bean** for spring boot to understand that that must be processed, in short, the result must be the following code:

```java
@Bean
CommandLineRunner init (ReactiveMongoOperations operations, PokemonRepository repository) {
	return args -> {
Flux<Pokemon> pokemonFlux = Flux.just(
new Pokemon(null, "Bulbassauro", "Semente", "OverGrow", 6.09),
new Pokemon(null, "Charizard", "Fogo", "Blaze", 90.05),
new Pokemon(null, "Caterpie", "Minhoca", "Poeira do Escudo", 2.09),
new Pokemon(null, "Blastoise", "Marisco", "Torrente", 6.09))
.flatMap(repository::save);

pokemonFlux
.thenMany(repository.findAll())
.subscribe(System.out::println);
	};
}
```

Here we see something different, we are not bringing the standard methods (findAll, findById etc) because we are working with an embedded database, but if you want to use a Mongo Atlas for example, **ReactiveMongoOperations** generates this series of methods for you.

In this code, .flatMap queries findAll and prints the data, and thenMany does that too, only asynchronously, and subscribe prints on the screen too

Now if we execute it we will see that the database has gone up, and the data entered will be shown on the screen, you will have something like this:
![console showing the saved data](https://dev-to-uploads.s3.amazonaws.com/i/eu4bjclvbbhtbl62e6mm.PNG)

#Creating the Controller
Controller is our controller class, it will contain our methods of creating, updating, deleting and reading our Pokémon.

To create it right click **com.pokedex.reactiveweb**> New> Package> com.pokedex.reactiveweb. **controller**> enter
And repeat this same process to create a class

Now let's create the methods that we are already reaching in the final result (• ◡ •) /

### Fetching all pokemons

Now you must create an instance and inside it you will have the method to bring all Pokémon, it will look like this:

```java
@RestController
@RequestMapping("/pokemons")
public class PokemonController {

    private PokemonRepository repository;
    public PokemonController(PokemonRepository repository) { this.repository = repository; }

    @GetMapping
    public Flux<Pokemon> getAllPokemons() {return repository.findAll();}
}
```

## Sucking Pokémon by id

To search by id, place the method inside the instance, just like the previous one:

```java
@GetMapping("/{id}")
    public Mono<ResponseEntity<Pokemon>> getPokemon(@PathVariable String id) {
        return repository.findById(id)
                .map(pokemon -> ResponseEntity.ok(pokemon))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
```

You that in this method is the **Mono** type pokémon? This means that we only want 1 id to be called, and when that id is not found, we bring an HTTP response.

The defaultIfEmpty is used so when the Id is called on an empty entity, it will return a status _NOTFOUND_

> Remember that the .map () must return a synchronous function and the result will be captured in a Mono editor, because findById returns a Mono

## Creating and saving a new Pokémon

To create a new one and save pokémon just enter the code below

```java
@PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Pokemon> savePokemon(@RequestBody Pokemon pokemon) {
        return repository.save(pokemon);
    }
```

It will return a Mono <Pokemon> because that is what will be returned in the repository.

## Updating a Pokémon

Now let's combine everything you've seen so far to update a Pokémon. To update a pokémon we will receive an id, and an instance of the pokémon with new values ​​to be updated.

Let's start by looking for an id, and if it is found it will be updated in reverse an _NOTFOUND_ status will be received

```java
@PutMapping("{id}")
    public Mono<ResponseEntity<Pokemon>> updatePokemon(@PathVariable(value = "id") String id,
                                                       @RequestBody Pokemon pokemon) {
        return repository.findById(id)
                .flatMap(existingPokemon -> {
                    existingPokemon.setNome(pokemon.getNome());
                    existingPokemon.setCategoria(pokemon.getCategoria());
                    existingPokemon.setHabilidades(pokemon.getHabilidades());
                    existingPokemon.setPeso(pokemon.getPeso());
                    return repository.save(existingPokemon);
                })
                .map(updatePokemon -> ResponseEntity.ok(updatePokemon))
                .defaultIfEmpty(ResponseEntity.notFound().build());

    }
```

> I'm sorry some things still in portuguese, but I'm change :D

The second part of the code is a map operator for this transformation, and so if an empty Mono is returned with defaultEmpty it will return a NOTOFUND status, this block of code could also be done with if / else, but the way we did it was the way \* \*declarative\*\*

## Deleting a Pokémon

The method to delete is similar to the previous ones too, to delete when creating a method that deletes a pokémon by id:

```java
@DeleteMapping("{id}")
    public Mono<ResponseEntity<Void>> deletePokemon(@PathVariable(value = "id") String id) {
        return repository.findById(id)
                .flatMap(existingPokemon ->
                        repository.delete(existingPokemon)
                                .then(Mono.just(ResponseEntity.ok().<Void>build()))
                )
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
```

And another method to delete ALL Pokemon

```java
@DeleteMapping
    public Mono<Void> deleteAllPokemons() {
        return repository.deleteAll();
    }

```

There, now we have our complete CRUD where we create in a reactive and functional way, now we need to create our Event Stream (coolest part /)

## Creating an Event Stream ᕙ (`▿´) ᕗ

To create our event method in the controller, we need to create the class where the event attributes are, for that inside the package **model** create a class **PokemonEvent**, with the following code:

```java
public class PokemonEvent {
    private Long eventId;
    private String eventType;
}

```

In the same way as with the Pokémon class inside the Model package just above, you only need to generate **getter and setters**, **boolean equals**, **hashcode**, and **toString** , you can do all this by pressing `` ALT + INSERT ''> getter / setter> equals () hashcode ()> toString ()> Override Methods> Constructor

yaaay, now let's go back to the class **PokemonController**, and create our event method, which will look like this:

```java
 @GetMapping (value = "/ events", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux <PokemonEvent> getPokemonEvents () {
        return Flux.interval (Duration.ofSeconds (5))
                .map (val ->
                        new PokemonEvent (val, "Product Event")
                );
    }

```

The interval brings as many seconds as my event will be shown, in this case every 5 seconds a new event is generated!

We're almost done, now we just need to test our endpoints (͡ ~ ͜ʖ ͡ °)

#Testing the application
To test our application we will see if everything will go up correctly, for that go to the main () method and start it, and keep an eye on the console to see if there is no error, the answer should come back like this:
![success message on the console](https://dev-to-uploads.s3.amazonaws.com/i/pchxhipfx0r8ysnpcwmg.PNG)

Now let's postman test the endpoints

#### Fetching all Pokémon

The first method we are going to test is the GET, which will bring all the Pokémon that were saved, in the postman will bring the following results:
![result of the GET search of the pokemon](https://dev-to-uploads.s3.amazonaws.com/i/4v0o32uw42i08w3wplgy.PNG)

See that in the search we opted for GET, because we are "catching" all pokémons, to test the others like: "PUT", "POST" ... etc, just change this option, so let's go there

#### Searching for a Pokémon by id

To search by id, just copy and paste an id that was generated in the GET response
![searching for a Pokémon by id](https://dev-to-uploads.s3.amazonaws.com/i/ia05dzrg0j10mmwdd8ba.PNG)

#### Inserting a new Pokémon

In the post itself change the request to **POST** and in **Body** select **raw** > **JSON** because we want to save in json format, and type:

```java
   {
        "name": "IbySaur",
        "category": "seed",
        "skills": "OverGrow",
        "weight": 13.0
    }

```

After that, click on **SEND** and your Pokémon will be saved!
You should return a STATUS 201 which shows that it was created successfully, to be sure, let's go back to **GET**, copy and paste the generated id, that it will show our created Pokémon.

> The id does not need to be entered as it is automatically generated by MongoDB

#### Deleting a Pokémon

Now we will delete the **deleteALL** and **deleted** methods, so in postman we will change the request to **DELETE**

![deleting a Pokémon in the postman](https://dev-to-uploads.s3.amazonaws.com/i/6qwnx8ppazwilsjasuj3.PNG)

See that I put the id of some pokémon that I want to delete

If I remove this id it will delete ALL POKEMONS

#Testing Events Stream
We saw that our CRUD is in the scheme already, that is, it is working pretty well ...
With our application still started, let's test the events stream, for that go to a browser if you prefer and type:

`http: // localhost: 8080 / pokemons / events`

And you will see the magic happen every 5 seconds you will be returning to a Pokémon event

![browser response on pokemon query](https://dev-to-uploads.s3.amazonaws.com/i/42h661k4qpym00rm0kk2.PNG)

If you open this same request in another window, you will see that in the events stream it will allow another request to be called without waiting for the previous one to finish, this is a non-blocking flame, typical of Spring Webflux.

#Deploy on Heroku
Shoooow now you already have a topzera application, let’s upload it to the cloud?

To upload our application, we need to put the heroku plugin in our pom.xml:

```xml
<project>
  ...
  <build>
    ...
    <plugins>
      <plugin>
        <groupId> com.heroku.sdk </groupId>
        <artifactId> heroku-maven-plugin </artifactId>
        <version> 3.0.2 </version>
      </plugin>
    </plugins>
  </build>
</project>

```

Now go to your application folder, using a terminal (I will use gitbash), and type `heroku login`, to access your heroku account

A window like this will appear for you:
![login heroku](https://dev-to-uploads.s3.amazonaws.com/i/ij5bdqyb3r1sd02vg3en.PNG)

Click on Login and you can now close this window that you will have the active login on Heroku!

Now just wait for the terminal to process
![terminal processing login to heroku](https://dev-to-uploads.s3.amazonaws.com/i/h7ezz4egnh36jaubrl2l.PNG)

After we finish loading, we will create an app to host our application, we will do this with the command `heroku create`

And we're almost there, your app has been created, in the terminal it will generate a link and this message:
![message that the app was successfully created](https://dev-to-uploads.s3.amazonaws.com/i/3w71sxu8r6uh0j5nxfmy.PNG)

We are ready for Deploy

If your application is a standalone (and therefore requires a type of process), you can deploy with this command: `mvn clean heroku: deploy`
Just wait a few seconds and check the logs ...

If the message **BUILD SUCESS** appears it means that everything went well, you can breathe with relief!
![build done successfully](https://dev-to-uploads.s3.amazonaws.com/i/fivu3kw2zycex79vbr40.PNG)

CONGRATULATIONS
![Will Smith dancing](https://media.giphy.com/media/b5LTssxCLpvVe/giphy.gif)

To access just type `heroku open`
![heroku dashboard](https://dev-to-uploads.s3.amazonaws.com/i/1irez40cysf3jdr1dmrq.PNG)

#Conclusion
Spring Webflux is a very cool module in SpringBoot, with it, in addition to creating a CRUD, we can create a sequence of events, but that does not mean that we should always use reactive applications, everything depends on your scenario and viability

...

And if you made it this far congratulations you are a **winner**, I believe that there is nothing more rewarding than seeing our application working right? So share it too, and put it on github so that more and more people can learn just like you! ʕ • ́ᴥ • ̀ʔ っ

The code for this application is on my Github ->
https://bit.ly/pokedex-reativo
Give a little star on github if it helped you <3

References:
[Heroku DevCenter](https://devcenter.heroku.com/articles/deploying-java-applications-with-the-heroku-maven-plugin)
[Michelli Brito's YouTube channel](https://www.youtube.com/channel/UC2WbG8UgpPaLcFSNJYwtPow)

See you next time, give us likesss and share, and see the other womakerscode articles who want to follow me on social networks @anabneri
