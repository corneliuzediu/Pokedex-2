# [Pokedex by Corneliu Zediu](http://liuze02.pythonanywhere.com/)
  
  ## _Why Pokedex ?_
This is my Final Project as part of CS50X Course, based on [PokeAPI](https://pokeapi.co/)
  
  ## _What is pokedex ?_

I have decided to use this Theme because it integrates multiple aspects of fun learning. From childhood nostalgia, to challenges of manipulating a high volume of data and 
not the least the joy of sharing the project with friends that love the Pokemons.  

Pokedex is a web aplication that provides a variety of informations about the original 151 Pokemon and furthermore to a total of 1010 Pokemons. 
  
For each Pokemon have been created a card where beside the image of the Pokemon, the user is informed with the name and the coresponding element / elements type. 
The user can access further information by clicking on any of the card. By doing that, the user access the "General info" or to the "Main ststs" of the selected Pokemon.

  ## _How does it work?_
After loading all the resources from the homepage, the event listener calls the fetching function in order get the initial 151 Pokemon Cards

Shortly:
  -  Loop over 151 times in order to save the promises into an array. 
  - When all the promises have been fulfilled, then I map over the data in order to create each Pokemon Card and display it.

The user can load more Pokemons by scrolling down or by selecting “Get all Pokemons”

  ## _Pokemon Card Content_

Now that the Pokemons are loaded, the user has a preview of each loaded Pokemon Card, with information that includes Name, Element type, Image of the Pokemon and the ID.  Each Pokemon Card has a background color corresponding to the Pokemon main element type. 

After selecting any of the Pokemon, the following content will be presented:

| General Info                               | Main stats |
|:---                                       |:---     |
| Species | Health |
| Height| Attack |
| Weight | Defense |
| Abilities | Special-Attack |
|  | Special-Defense |
|  | Speed |


  ## _Search_
  
  The user have the possibility of searching any particular Pokemon out of the initial 151 Pokemnon or from the full list, by switching between "Get all Pokemons" or "Get the initial Pokemons". The search will take any text input and will display any Pokemon that have the coresponding input into the name. 

  ### Example:
  If the user introduce "char" into the search field, depedending on the desired search mode, the outcome will be as followed:
  #### The initial 151 Pokemon list:
  |Pokemon #                        | Name | Elements|
|:---                                       |:---      |:---     |
| # 4 | **Char**mander | fire|
| # 5 | **Char**meleon | fire|
| # 6 | **Char**izard | fire, flying|

  #### All Pokemon list:
  |Pokemon #                        | Name | Elements|
|:---                                       |:---      |:---     |
| # 4 | **Char**mander | fire|
| # 5 | **Char**meleon | fire|
| # 6 | **Char**izard | fire, flying|
| # 390 | Chim**char** | fire|
| # 737 | **Char**jabug | bug, electric|
| # 935 | **Char**cadet | fire|


  ## _Availability_ 
  The website had been addepted to be available on most of the devices, with the smalles size of 280px x 650px.  


