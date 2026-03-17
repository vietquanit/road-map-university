# Product Requirements

## Goal

Create an interactive roadmap visualization website inspired by roadmap.sh.

Users should be able to explore developer learning paths visually.

## Core Features

### 1. Roadmap Graph

Display learning topics as nodes connected by edges.

Each node represents a skill or concept.

Example:

HTML → CSS → JavaScript → Framework

### 2. Zoom and Pan

Users must be able to:

* Zoom in/out
* Drag the canvas
* Navigate large roadmaps

### 3. Node Interaction

Clicking a node should:

* Open a detail panel
* Show description
* Show learning resources

### 4. Sidebar Navigation

Sidebar should include:

* List of roadmap sections
* Quick navigation
* Highlight active section

### 5. Dark Mode

The interface must support:

* Light mode
* Dark mode

Use Tailwind dark mode.

### 6. Responsive Design

The site must work on:

* Desktop
* Tablet
* Mobile

### 7. Roadmap Selection

Users should be able to choose different roadmaps:

* Frontend
* Backend
* DevOps
* Full Stack

### 8. Performance

The application must:

* Render graphs smoothly
* Handle large node counts
* Avoid unnecessary re-renders

## Non Functional Requirements

### Maintainability

Code must be:

* Modular
* Typed with TypeScript
* Easy to extend

### Accessibility

Follow basic accessibility practices:

* Keyboard navigation
* Proper contrast
* Semantic HTML

### SEO

Basic SEO:

* Proper meta tags
* Page titles
