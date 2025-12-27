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

3. Start the frontend:

```bash
npm start
```

The frontend runs on: http://localhost:3000.


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