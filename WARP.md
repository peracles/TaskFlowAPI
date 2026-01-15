# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

TaskFlowAPI is a new API project currently in initial development phase. The repository is set up but awaiting implementation.

## Development Setup

### Project Initialization

Since this is a new project, you'll need to initialize it based on the chosen technology stack. Common initialization commands:

**For Node.js/Express API:**
```powershell
npm init -y
npm install express cors dotenv
npm install -D nodemon jest @types/node
```

**For Python/FastAPI:**
```powershell
python -m venv venv
.\\venv\\Scripts\\Activate.ps1
pip install fastapi uvicorn sqlalchemy python-dotenv
pip install -D pytest black flake8
```

**For .NET Core API:**
```powershell
dotnet new webapi -n TaskFlowAPI
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Swashbuckle.AspNetCore
```

## Repository Structure

The project is organized as follows:
- `/App` - Main application directory (current working directory)
- `/Documentacion` - Documentation folder (currently empty)

## Git Workflow

The repository is initialized with git but has no commits yet. When making the first commit:

```powershell
git add .
git commit -m "Initial commit

Co-Authored-By: Warp <agent@warp.dev>"
```

## Development Guidelines

### API Design Principles
- Follow RESTful conventions for endpoint design
- Use appropriate HTTP status codes
- Implement proper error handling and validation
- Include OpenAPI/Swagger documentation

### Code Organization
- Separate concerns: routes, controllers, services, models
- Use environment variables for configuration
- Implement proper logging throughout the application

## Next Steps

1. Choose and set up the technology stack
2. Create the basic project structure
3. Set up development environment configuration
4. Implement core API endpoints
5. Add tests and documentation

## Notes for Future Development

This WARP.md should be updated as the project evolves to include:
- Specific build and test commands once the technology stack is chosen
- Database setup and migration commands
- API endpoint documentation
- Deployment procedures
- Performance considerations