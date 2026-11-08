# BlockCrafters – Minecraft Building Studio

## Project Description

BlockCrafters is a responsive multi-page website for a fictional Minecraft building studio. It presents custom Minecraft builds, project examples, available services and a commission request form.

This project continues the original midterm website by keeping the same topic, design direction and five main pages while adding interactive JavaScript and jQuery features.

## Pages

1. `index.html` – Homepage and featured projects.
2. `about.html` – Information about the builder and studio.
3. `services.html` – Service packages, pricing and price estimator.
4. `gallery.html` – Project gallery, search, category filters and favorites.
5. `contact.html` – Commission request form with validation.

## Technologies

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- jQuery 3.7.1
- DOM manipulation
- GitHub Pages

## Endterm Features

### JavaScript Fundamentals
- Two arrays: `projects` and `services`.
- Loops: `for...of`, `forEach` and `filter`.
- Reusable functions for creating cards, displaying data, formatting prices and validating forms.
- Functions with parameters and return values.

### DOM Manipulation
- Project cards are created dynamically from an array.
- Service cards are generated from an array.
- Search and category filters update the gallery.
- Favorite projects can be added and removed.
- Theme switcher changes the page theme.
- The price estimator updates the displayed estimate.
- FAQ answers expand and collapse.

### Events
- `click`
- `input`
- `change`
- `submit`
- `blur`
- `DOMContentLoaded`
- jQuery `mouseenter` and `mouseleave`

### Form Validation
The commission form checks:
- Name length.
- Email format.
- Discord username.
- Selected package.
- Project type.
- Deadline.
- Project description length.
- Confirmation checkbox.

Specific error messages appear beside fields. The form prevents normal submission when invalid and displays a success message when all fields are valid.

**Note:** The form is a frontend demonstration. It does not send information to a server.

### jQuery
- Selectors: class, ID and element selectors.
- Traversal: `closest()`, `find()` and `children()`.
- Events: click, mouseenter and mouseleave.
- Effects: `slideToggle()`, `slideUp()` and `fadeTo()`.

## How to Run

1. Download or clone the project.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` in a browser, or use the Live Server extension.
4. Make sure the `css/images/` folder and `js/script.js` file are present.
5. An internet connection is required for Bootstrap and jQuery CDN libraries.

## Testing the Features

1. Open the Gallery page and search for a project.
2. Select a category from the filter.
3. Save a project to favorites and remove it again.
4. Switch between dark and light themes.
5. Open the Services page and change the price estimator options.
6. Expand and collapse the FAQ questions.
7. Open Contact and submit the empty form to see validation messages.
8. Fill in valid information and submit to see the success message.

## Group Members

Add the names of all members of your project group here.

## Deployment

Publish the project using GitHub Pages and add the published website URL here.