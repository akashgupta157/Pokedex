# Pokémon Info App

This Pokémon Info App is a React-based web application that allows users to explore and view detailed information about various Pokémon. The app leverages the [PokéAPI](https://pokeapi.co/) to fetch data and displays it in a clean and interactive way. It includes features such as Pokémon search, type-based filtering, generation filtering, and an animated base stats display.

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

## Table of Contents

- [Features](#features)
- [Live Demo](#live-demo)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Components](#components)
- [API](#api)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Live Demo

[Live Demo Link (if hosted)](https://your-live-demo-link.com)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/pokemon-info-app.git
cd pokemon-info-app
```

### 2. Install Dependencies

Before running the application, make sure you have [Node.js](https://nodejs.org/) installed. Then, install the required dependencies using:

```bash
npm install
```

### 3. Running the App

To start the development server, run:

```bash
npm start
```

This will start the application on `http://localhost:3000`.

### 4. Build for Production

To build the project for production:

```bash
npm run build
```

## Technologies Used

- **React**: Frontend library for building the UI.
- **React Router**: For handling routing and navigation.
- **Axios**: For making API requests to the PokéAPI.
- **Tailwind CSS**: For styling the application.
- **React LazyLoadImage**: For lazy-loading images to optimize performance.
- **PokéAPI**: A public API to retrieve data about Pokémon.

## Project Structure

```bash
├── public
│   └── index.html
├── src
│   ├── assets
│   ├── components
│   │   ├── EvolutionChainDisplay.js
│   │   ├── TypeEffectivenessSection.js
│   │   └── VarietyCard.js
│   ├── misc
│   │   ├── misce.js
│   │   └── PokeContext.js
│   ├── pages
│   │   ├── Detail.js    # Detailed Pokémon View Page
│   ├── App.js           # Main App component
│   └── index.js         # Entry point
├── README.md
└── package.json
```

### Key Components

- **App.js**: The main component that handles routing and manages global state.
- **Detail.js**: Displays the detailed view of a Pokémon.
- **EvolutionChainDisplay.js**: Component to visualize Pokémon evolutions.
- **TypeEffectivenessSection.js**: Displays type effectiveness such as weaknesses and resistances.
- **VarietyCard.js**: Renders different forms/varieties of a Pokémon.

### Miscellaneous Files

- **misce.js**: Utility functions such as type effectiveness calculations.
- **PokeContext.js**: Context API for managing shared state like type colors across the app.

## API

This project uses the **PokéAPI** to fetch all data related to Pokémon. It interacts with the following endpoints:

- `/pokemon/{name or id}`: To fetch detailed information about a specific Pokémon.
- `/pokemon-species/{id}`: To get species-specific information like evolution chains, generation, etc.
- `/type/{type}`: To filter Pokémon by their type.
- `/generation/{id}`: To filter Pokémon by generation.

### Example API Usage

```javascript
// Fetching a Pokémon by name
const { data: pokemonData } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
```

## Screenshots

### Home Page
[Insert screenshot here]

### Pokémon Detail Page
[Insert screenshot here]

### Base Stats Animation
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