# Pokédex App

This Pokémon Info App is a React-based web application that allows users to explore and view detailed information about various Pokémon. The app leverages the [PokéAPI](https://pokeapi.co/) to fetch data and displays it in a clean and interactive way. It includes features such as Pokémon search, type-based filtering, generation filtering, and an animated base stats display.

## Table of Contents

- [Features](#features)
- [Live Demo](#live-demo)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Search by Pokémon Name or ID**: You can search for a specific Pokémon by name or ID.
- **Fuzzy Search**: Start typing part of a Pokémon's name to get suggestions and autocomplete.
- **Filter by Type & Generation**: Filter Pokémon by their type (e.g., fire, water) or by the generation they belong to.
- **Detailed Pokémon View**: Each Pokémon's detailed view includes:
  - Species
  - Abilities (with hidden abilities labeled)
  - Height, Weight, Generation
  - Type defenses (weaknesses and resistances)
  - Evolutions chain visualization
  - Shiny Pokémon display
  - Varieties/Forms if available
- **Animated Base Stats Display**: Shows the Pokémon's base stats with a smooth filling animation.

## Live Demo

[Live Demo Link](https://pokelistdex.vercel.app)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/akashgupta157/Pokedex.git
cd Pokedex
```

### 2. Install Dependencies

Before running the application, make sure you have [Node.js](https://nodejs.org/) installed. Then, install the required dependencies using:

```bash
npm install
```

### 3. Running the App

To start the development server, run:

```bash
npm run dev
```

This will start the application on `http://localhost:5173`.


## Technologies Used

- **React**: Frontend library for building the UI.
- **React Router**: For handling routing and navigation.
- **Axios**: For making API requests to the PokéAPI.
- **Tailwind CSS**: For styling the application.
- **React LazyLoadImage**: For lazy-loading images to optimize performance.
- **PokéAPI**: A public API to retrieve data about Pokémon.

## Screenshots

### Home Page
[Insert screenshot here]

### Pokémon Detail Page
[Insert screenshot here]

## Contributing

If you would like to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-branch`
3. Make your changes and commit them: `git commit -m 'Added new feature'`
4. Push the branch: `git push origin feature-branch`
5. Open a pull request for your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to adjust the sections or add more details to suit your project needs!