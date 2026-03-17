# Coding Rules for AI Agent

This document defines strict coding rules for implementing the roadmap application.

The AI agent must follow these rules when generating code.

Failure to follow these rules may result in unstable or unmaintainable code.

---

# General Principles

1. Write clean and maintainable code.
2. Use TypeScript for all source files.
3. Follow modular component architecture.
4. Avoid large monolithic files.
5. Keep components focused on a single responsibility.
6. Avoid duplicated logic.
7. Prefer reusable utilities.

---

# Project Structure Rules

The project must follow this structure:

/app
/components
/lib
/data
/types
/styles
/ai-spec

Never place logic inside the `/app` folder except page composition.

Business logic must be inside `/lib`.

---

# File Size Limits

To maintain readability:

Component files: maximum 250 lines
Utility files: maximum 200 lines
Type files: unlimited but organized

If a file becomes too large, split it.

---

# TypeScript Rules

All components must use strict typing.

Example:

type NodeData = {
id: string
label: string
description?: string
}

Never use `any` unless absolutely necessary.

Prefer explicit interfaces.

---

# React Rules

Use functional components only.

Do not use class components.

Example:

export default function RoadmapGraph() {}

---

# State Management

Use:

React Hooks
React Context

Avoid heavy state libraries.

Use `useState`, `useMemo`, `useCallback` where appropriate.

---

# Performance Rules

To prevent performance issues:

Memoize expensive calculations.

Example:

useMemo for graph transformations.

Memoize node components if necessary.

Avoid unnecessary re-renders.

---

# Graph Rendering Rules

Graph rendering must be handled only inside:

RoadmapGraph.tsx

Node components must remain purely presentational.

Graph logic must stay in `/lib`.

---

# Styling Rules

Use TailwindCSS for styling.

Do not write large CSS files.

Prefer utility classes.

Example:

className="rounded-lg border p-4 shadow-sm"

Global styles only for:

body
fonts
scrollbars

---

# Naming Conventions

Components:
PascalCase

Example:

RoadmapGraph
CustomNode

Functions:
camelCase

Example:

generateLayout
transformNodes

Files:
PascalCase for components
camelCase for utilities

---

# Import Order

Imports must follow this order:

1. External libraries
2. Internal libraries
3. Components
4. Types
5. Styles

Example:

import ReactFlow from "reactflow"

import { generateLayout } from "@/lib/layout"

import CustomNode from "@/components/CustomNode"

---

# Error Handling

Never ignore errors.

Validate roadmap JSON before rendering.

Example checks:

* missing nodes
* invalid edges
* circular dependencies

---

# Comments

Add comments only for complex logic.

Do not add obvious comments.

Good:

// Transform roadmap JSON into React Flow nodes

Bad:

// This is a variable

---

# Code Generation Strategy

The AI agent must generate code in the following order:

1. Types
2. Utilities
3. Components
4. Pages
5. Data
6. Styles

This prevents dependency errors.

---

# Testing Expectations

The AI agent must ensure:

* No TypeScript errors
* No console errors
* Graph renders successfully
* Node interaction works
