# 🐾 PeTi - Pet Services Platform

PeTi is a web application that connects pet owners with pet sitters, allowing users to browse, create, and manage pet sitting services.

This project was refactored to demonstrate modern frontend architecture, clean code practices, and improved maintainability for real-world applications.

---

## Screenshots
- Home page
![PeTi_HomePage](https://user-images.githubusercontent.com/86933138/135457755-5c24fd75-9e80-43b8-86cc-d342fb2b6fc3.png)
- Pet Sitters list
![PeTi_PetSitters](https://user-images.githubusercontent.com/86933138/135457927-25a252dd-3cfc-4c45-9e9d-af76c67208f8.png)
- Pet Sitter details
![PeTi_PetSitterProfile](https://user-images.githubusercontent.com/86933138/135457906-c6aaac46-77cc-443a-80be-65bda24d82de.png)
- Create/Edit forms
![PeTi_NewServiceRequest](https://user-images.githubusercontent.com/86933138/135460363-2190ad3d-25a0-4d91-be10-92c9e4bdde83.png)
---

## About the Project

This project was originally built as a learning project and later **refactored to follow modern frontend practices**.

The goal of the refactor was to:
- Improve code structure and maintainability
- Reduce duplication
- Modernize the stack
- Prepare the project for portfolio/interview use

---

## Tech Stack

**Frontend**
- React
- Vite (migrated from Create React App)
- React Router v6

**UI**
- React Bootstrap

**Forms & Validation**
- Formik
- Yup

**Language**
- JavaScript (ES6+)

---

## Project Structure

```
src/
    features/
        PetSitters/
            pages/
            hooks/
            api/
            data/
        ServiceRequests/
            pages/
            api/
        Users/
    shared/
        components/
        utils/
        api/
        config/
```

---

## Key Improvements (Refactor)

- Migrated project from **Create React App → Vite**
- Updated routing to **React Router v6**
- Introduced **feature-based architecture**
- Extracted reusable logic into **custom hooks**
- Created **shared form components**
- Centralized API calls
- Removed unused code and legacy patterns

These changes improved code organization, reduced duplication, and made the application easier to scale and maintain.

---

## Running the Project

### 1. Install dependencies
```bash
npm install
```

### 2. Create .env file

```env
VITE_DISPLAY_MODE=true
VITE_PETI_CORE_API_URL=http://localhost:5000
```

### 3. Run the project

```bash
npm run dev
```

App runs on:

http://localhost:5173

## Mock Mode

To simplify development and testing, the app supports a mock mode:

```env
VITE_DISPLAY_MODE=true
```

Uses local JSON data
No backend required

## Backend (optional)

Backend API available here: https://github.com/aloisio-costa/PeTi-API

## Notes
 - Authentication is currently simplified / disabled for demo purposes
 - Google Auth was removed during refactor to reduce complexity

## Future Improvements

 - Reintroduce authentication (JWT / OAuth)
 - Add unit and integration tests
 - Improve UI/UX design
 - Connect fully with backend API

## Author

Aloisio Costa

Fullstack Developer (React / .NET)
