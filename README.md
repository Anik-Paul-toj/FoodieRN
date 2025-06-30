# Foodie🍲

A beautiful and modern React Native app to discover, browse, and save your favorite recipes! Built for food lovers who want to explore new flavors and manage their favorite dishes easily.

## Features

- **Welcome Screen:** Animated splash and introduction to the app.
- **Home Screen:** Browse a curated list of recipes with images and categories.
- **Recipe Details:** View detailed information, ingredients, and steps for each recipe.
- **Favorites:** Save and manage your favorite recipes for quick access.
- **Responsive Design:** Looks great on all devices.
- **Smooth Navigation:** Powered by React Navigation and context for state management.

## Screens Overview

- **WelcomeScreen:** Animated intro, transitions to Home automatically.
- **HomeScreens:** Main browsing area, shows recipe categories and featured recipes.
- **RecipeDetailsScreen:** Full details for a selected recipe, including image, ingredients, and instructions.
- **FavouritesScreen:** List of recipes you've marked as favorites.

## Getting Started

### Prerequisites
- Node.js & npm
- React Native CLI
- Android Studio or Xcode (for device/simulator)

### Installation
1. Clone the repository:
   ```sh
git clone https://github.com/Anik-Paul-toj/FoodieRN.git
cd FoodieRN
```
2. Install dependencies:
   ```sh
npm install
```
3. For iOS, install pods:
   ```sh
cd ios && pod install && cd ..
```

### Running the App
- **Android:**
  ```sh
  npx react-native run-android
  ```
- **iOS:**
  ```sh
  npx react-native run-ios
  ```

## Project Structure
```
recipeMenu/
  ├── src/
  │   ├── components/         # Reusable UI components
  │   ├── context/            # Context for favorites
  │   ├── navigation/         # Navigation setup
  │   └── Screens/            # App screens
  ├── assets/                 # Images and splash
  ├── App.tsx                 # App entry point
  └── ...
```

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

## Credits
- Built with [React Native](https://reactnative.dev/)
- Inspired by food and recipe apps

---

Enjoy discovering new recipes! 🍽️
