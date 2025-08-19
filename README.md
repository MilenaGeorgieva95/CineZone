# 🎬 CineZone

### 🔗 Live Site (Hosted on Firebase): [https://cinezone-2894c.web.app](https://cinezone-2894c.web.app)

**CineZone** is a feature-rich Angular 16 application built as a student project. It functions as a community forum and watchlist manager that leverages the **TMDB API** for dynamic movie data and **Back4App** (Parse Server) for user authentication, watchlist storage, likes, and comments.

---

## 📌 Project Overview

CineZone allows users to:
- Explore trending and top-rated movies via TMDB.
- Register and log in using Back4App.
- Create and manage **custom movie watchlists**.
- Like and comment on movies and watchlists.
- Participate in a movie-based community with forum-like features.

Guest users can view content but must log in to interact (create watchlists, comment, like, etc.).

---

## 🛠 Technologies Used

| Tech          | Purpose                            |
|---------------|-------------------------------------|
| **Angular 16**     | Frontend framework with routing and modular design |
| **TMDB API**       | Provides real-time movie metadata |
| **Back4App (Parse)** | Backend for authentication, comments, watchlists |
| **RxJS + HttpClient** | Data fetching and reactive state handling |
| **CSS / Angular Material** | Styling components |

---

## 📁 Project Structure

```

src/
└── app/
    ├── core/                          # Core services, interceptors, guards
    │   ├── guards/
    │   │      └── auth.activate.ts
    │   │      └── guest.activate.ts
    │   │      └── is-owner.activate.ts
    │   ├── interceptors/
    │   └── core.module.ts
    ├── shared/                        # Reusable UI components, pipes, directives
    │   ├── components/
    │   │      └── footer/
    │   │      └── header/
    │   │      └── loader/
    │   │      └── movie-card/
    │   │      └── page-not-found/
    │   ├── pipes/
    │   ├── services/
    │   ├── validators/
    │   └── shared.module.ts
    ├── types/
    ├── layout/
    ├── features/
    │   ├── user/                      # Login/Register logic
    │   │   ├── login/
    │   │   ├── register/
    │   │   ├── services/
    │   │   │   └── user.service.ts
    │   │   └── user.module.ts
    │   │   └── user-routing.module.ts
    │   ├── movies/                    # TMDB integration
    │   │   ├── catalog/               # Public movie list
    │   │   ├── details/               # TMDB movie details
    │   │   ├── services/
    │   │   │   └── tmdb-api.service.ts
    │   │   └── movies.module.ts
    │   ├── watchlist/                 # User-created watchlists
    │   │   ├── catalog/                  # Shows all watchlists for user
    │   │   │   └── catalog.component.ts
    │   │   ├── details/               # View a single watchlist (with movie cards)
    │   │   │   └── details.component.ts
    │   │   ├── create/                # Create a new watchlist
    │   │   │   └── create.component.ts
    │   │   ├── edit/                  # Rename or manage movies in watchlist
    │   │   │   └── edit.component.ts
    │   │   ├── services/
    │   │   │   └── watchlists.service.ts
    │   │   ├── watchlists-routing.module.ts
    │   │   └── watchlists.module.ts
    │   ├── comments/                  # CRUD comments on movies or watchlists
    │   │   ├── list/
    │   │   ├── services/
    │   │   │   └── comment.service.ts
    │   │   └── comments.module.ts
    │   ├── pages/                     # Static pages (about, contact)
    │   │   ├── about/
    │   │   ├── contact/
    │   │   └── pages.module.ts
└── environments/
└── styles/
    ├── app-routing.module.ts          # Lazy-loads each feature module
    ├── app.component.ts
    └── app.module.ts
```

---

## 🔑 Features

### ✅ Guest Access
- Browse movie catalog
- View movie and watchlist details

### 🔐 Authenticated User Access
- Create, update, and delete personal watchlists
- Add/remove TMDB movies to/from watchlists
- Post and delete comments
- Like/dislike records

### 🔁 Dynamic Pages
- `/movies/catalog`
- `/movies/details/:id`
- `/watchlist/:id`
- `/watchlist/edit/:id`
- `/profile/:id`
- ...and more!

---

## 🧠 Key Concepts & Design

- **Feature-based module structure**
- **Route guards** to protect authenticated/guest routes
- **Lazy loading** for performance optimization
- **Service encapsulation**: each feature has its own dedicated service
- **RESTful communication** with Back4App
- **Clean and scalable folder architecture**
- **Type-safe models, types, and interfaces** enforcing data integrity
- **Uses RxJS operators and lifecycle hooks** for reactive and efficient component management

---

### ✅ Form Validation & Error Handling

- Angular Reactive Forms with validation rules
- Custom error messages in templates
- Backend error handling with `catchError()`
- Prevents UI crashes on invalid input

### ✅ UI/UX

- Built with **Angular Material** for consistency and accessibility
- Responsive layout using Flex and External CSS files 
- Iconography from `@angular/material/icon`
- Clear navigation, feedback on user actions, accessible design

## 🚀 Getting Started

### 🔗 The app is deployed on Firebase: [https://cinezone-2894c.web.app](https://cinezone-2894c.web.app)

### If you would like to start it locally TMDB Api and Back4App registrations are required.

1. **Install dependencies**

   Run npm install to add dependencies

2. Configure environment files

Add your TMDB API key and Back4App credentials to:

Once registered run ng generate environments in terminal and in environments/environment.development.ts add your keys and tokens:

  export const environment = {
      //!TMDB-keys
   TMDB_API_KEY: '...',
   TMDB_ACCESS_TOKEN:'...',
   TMDB_BASE_URL: 'https://api.themoviedb.org/3',

      //!Back4App-keys
  BASE_URL: 'https://parseapi.back4app.com',
  APP_ID: '...',
  API_KEY: '...',
  APP_JS_KEY: '...'
 };

3. Run the development server in terminal:
   Run ng serve to start the app

4. Visit http://localhost:4200/ in your browser.

🌐 APIs & Services
🔹 TMDB
- Endpoint: https://api.themoviedb.org/

- Use to fetch trending, search, and movie details

🔹 Back4App (Parse REST API)
- Store users, watchlists, likes, and comments

In the Back4App database are needed the Columns: 
- _Users
- Watchlists {
    ownerId: Pointer to _Users
    movielist: Array
    title: string
    description: string
    }
- Comments

- Used via HttpClient with session tokens

👥 Authors
Milena Georgieva – Project Lead & Developer

📄 License
This project is for educational use only.

### Data Source

This project uses the [TMDb API](https://developer.themoviedb.org/) to fetch movie data.

> This product uses the TMDb API but is not endorsed or certified by TMDb.


