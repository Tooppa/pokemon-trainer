<div id='top'></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h2 align="center">Pokemon Trainer</h2>
  <p align="center">
    View and collect Pokemons 
    <br />
    <a href="https://super-pokemon-trainer.herokuapp.com/">View Demo</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About

Group project made during Experis Academy Full-Stack Developer course. Courses are hosted by [Noroff](https://www.noroff.no/en/). Project members are listed on the <a href="#collaborators">collaborators</a> section.

Purpose of this assignement was to learn different aspects of Angular and TypeScript. Data is accessed via `Users API`, which is pre-made by Noroff.

`Users API` is pre-made backend service made by Noroff, which is used to handle stored user data. 


<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [JavaScript](https://javascript.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Angular](https://angular.io/)
- [Noroff Assignment API](https://github.com/dewald-els/noroff-assignment-api/blob/master/docs/pokemon-trainer.md)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- Have Angular CLI installed. Please go [here](https://angular.io/cli) to download it. 


### Installation

API hosting portion uses [Heroku](https://heroku.com), but you may use other hosting provider 

1. Generate random base64 string. This is your API key, save it for later. 

2. Clone the repo
   ```sh
   git clone https://github.com/Tooppa/pokemon-trainer.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create `.env` file on your project root directory.

5. Paste the following text to the create file:
   ```
    NG_APP_API_KEY={your-api-key}
   ```
6. Deploy backend api. Follow this [repository](https://github.com/dewald-els/noroff-assignment-api) for guidance
7. Your generated base64 string is your `API_KEY`. Add it as your Config Vars on [Heroku Dashboard](https://dashboard.heroku.com) 
8. Add your generated API key string to `NG_APP_API_KEY` section of your `.env` file
9. Run the app locally with:
```
ng serve
```


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage


Firstly the app asks you to input your trainer name. This name can be used later to 'log-in' to your previous account. 

![screenshot-login]

If you have already logged in previously, You are redirected immidiately to the trainer page.

In the trainer page you can view your pokemon collection which starts empty.

![screenshot-trainer]

From the header you can go to catalogue page where you can see all of the pokemons. 

The catalogue consists of 24 pages which each show 48 pokemons. 

You can go trough the pages by using the plus and minus buttons on top and under the red catalogue. 

Also by clicking on a pokemon you can add it to your collection.

![screenshot-catalogue]

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Collaborators

<div id='collaborators'></div>

Tomas Valkendorff
[![LinkedIn][linkedin-shield]][linkedin-url-tomas] [![GitHub][github-badge]][github-url-tomas]

Mikko Ryynänen
[![LinkedIn][linkedin-shield]][linkedin-url-mikko] [![GitHub][github-badge]][github-url-mikko]

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[github-badge]: https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white
[linkedin-url-tomas]: https://www.linkedin.com/in/tomasvalkendorff/
[linkedin-url-mikko]: https://www.linkedin.com/in/mikko-ryynanen
[github-url-tomas]: https://github.com/Tooppa
[github-url-mikko]: https://github.com/mikkoryynanen
[screenshot-login]: screenshots/login.JPG
[screenshot-trainer]: screenshots/trainer.JPG
[screenshot-catalogue]: screenshots/catalogue.JPG
