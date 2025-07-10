# 🎬 CineZone

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
| **SCSS / Tailwind (optional)** | Styling components |

---

## 📁 Project Structure

src/
└── app/
    ├── core/ # Core services, interceptors, guards
    ├── shared/ # Shared UI components, pipes, etc.
    ├── features/
    │   ├── auth/ # Login & registration
    │   ├── movies/ # TMDB movie browsing & details
    │   ├── watchlist/ # User-created watchlists
    │   ├── comments/ # Commenting system
    │   ├── profile/ # User profile info
    │   └── pages/ # Static pages (About, Contact)
    ├── app-routing.module.ts # Top-level routing
    └── app.module.ts

src/
└── app/
    ├── core/                          # Core services, interceptors, guards
    │   ├── guards/
    │   ├── interceptors/
    │   └── core.module.ts
    ├── shared/                        # Reusable UI components, pipes, directives
    │   ├── components/
    │   ├── pipes/
    │   └── shared.module.ts
    ├── features/
    │   ├── auth/                      # Login/Register logic
    │   │   ├── login/
    │   │   ├── register/
    │   │   ├── services/
    │   │   │   └── auth.service.ts
    │   │   └── auth.module.ts
    │   ├── movies/                    # TMDB integration
    │   │   ├── catalog/               # Public movie list
    │   │   ├── details/               # TMDB movie details
    │   │   ├── create/                # (User-created entries)
    │   │   ├── edit/
    │   │   ├── services/
    │   │   │   └── movie.service.ts
    │   │   └── movies.module.ts
    │   ├── watchlist/                 # User-created watchlists
    │   │   ├── list/                  # Shows all watchlists for user
    │   │   │   └── watchlist-list.component.ts
    │   │   ├── details/               # View a single watchlist (with movie cards)
    │   │   │   └── watchlist-details.component.ts
    │   │   ├── create/                # Create a new watchlist
    │   │   │   └── watchlist-create.component.ts
    │   │   ├── edit/                  # Rename or manage movies in watchlist
    │   │   │   └── watchlist-edit.component.ts
    │   │   ├── services/
    │   │   │   └── watchlist.service.ts
    │   │   ├── watchlist-routing.module.ts
    │   │   └── watchlist.module.ts
    │   ├── comments/                  # CRUD comments on movies or watchlists
    │   │   ├── list/
    │   │   ├── services/
    │   │   │   └── comment.service.ts
    │   │   └── comments.module.ts
    │   ├── profile/                   # User profile
    │   │   ├── details/
    │   │   ├── services/
    │   │   │   └── profile.service.ts
    │   │   └── profile.module.ts
    │   ├── pages/                     # Static pages (about, contact)
    │   │   ├── about/
    │   │   ├── contact/
    │   │   └── pages.module.ts
    ├── app-routing.module.ts          # Lazy-loads each feature module
    ├── app.component.ts
    └── app.module.ts


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

1. **Install dependencies**

   npm install

2. Configure environment files

Add your TMDB API key and Back4App credentials to:

- src/environments/environment.ts

3. Run the development server in terminal:

ng serve

4. Visit http://localhost:4200/ in your browser.

🌐 APIs & Services
🔹 TMDB
- Endpoint: https://api.themoviedb.org/

- Use to fetch trending, search, and movie details

🔹 Back4App (Parse REST API)
- Store users, watchlists, likes, and comments

- Used via HttpClient with session tokens


👥 Authors
Milena Georgieva – Project Lead & Developer

📄 License
This project is for educational use only.

