## My Task Board

---

## 🛠️ Installation

### Backend

1. Go to the `backend` folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file with the following variables:

```bash
MONGO_URI=your_mongodb_connection_string
PORT=5001
```

4. Start the backend server:

```bash
node index.js
```

The backend runs on: http://localhost:5001.


### Frontend

1. Go to the `frontend` folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file with the following variable:

```bash
REACT_APP_API_URL=http://localhost:5001/api
```
Note: Update REACT_APP_API_URL to your live backend URL when deploying (e.g., https://my-task-board-app.onrender.com/api).

4. Start the frontend:

```bash
npm start
```

The frontend runs on: http://localhost:3000.

## Viewing a Board

To view a specific board, navigate to:

```bash
http://localhost:3000/board/<boardId>
```

- Replace <boardId> with the ID of the board you want to view.
- You can find board IDs from your database or API responses.


## Features

- Create, update and delete boards
- Add, edit and remove tasks
- Assign icons and statuses to tasks
- Real-time updates on frontend via API calls
- Clean, responsive UI


## API Endpoints

### Boards
- `POST /api/boards` - Create a new board
- `GET /api/boards/:id` - Get board by ID
- `PUT /api/boards/:id` - Update board
- `DELETE /api/boards/:id` - Delete board

### Tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task