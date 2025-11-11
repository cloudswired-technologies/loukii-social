# Contributing to Loukii Social

Thank you for your interest in contributing to Loukii Social! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### Suggesting Features

1. Check existing feature requests
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following our coding standards
4. Test your changes thoroughly
5. Commit with clear, descriptive messages:
   ```bash
   git commit -m "Add feature: description of feature"
   ```
6. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. Open a Pull Request with:
   - Clear title and description
   - Reference to related issues
   - Screenshots for UI changes

## Coding Standards

### TypeScript
- Use TypeScript for all new files
- Define proper interfaces and types
- Avoid `any` type when possible
- Use meaningful variable and function names

### React Components
- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use proper prop typing

### Styling
- Use Tailwind CSS utility classes
- Follow existing color scheme (#16A34A green)
- Maintain responsive design (mobile-first)
- Support dark mode

### File Organization
```
components/
  ├── component-name.tsx    # Component file
  └── ...
```

### Naming Conventions
- Components: PascalCase (e.g., `LoopCard.tsx`)
- Functions: camelCase (e.g., `formatNumber`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_ITEMS`)
- CSS classes: kebab-case (Tailwind utilities)

## Testing

- Test on multiple browsers (Chrome, Firefox, Safari)
- Test responsive design (mobile, tablet, desktop)
- Test dark mode
- Verify accessibility

## Commit Messages

Follow conventional commits format:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding tests
- `chore:` Maintenance tasks

Example:
```
feat: add comment sorting functionality
fix: resolve mobile navigation overflow issue
docs: update README with new features
```

## Questions?

Feel free to open an issue for any questions or clarifications needed.

Thank you for contributing! 🙏
