[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=20075083&assignment_repo_type=AssignmentRepo)

#  News Aggregator API

A simple **Node.js + Express + MongoDB** project with **JWT authentication**.  
Users can **sign up, log in, update preferences, and fetch news** from the external GNews API.

---

##  Features
- User Signup & Login (with **bcrypt password hashing**)
- **JWT Authentication** middleware to protect routes
- Get & Update User Preferences
- Fetch News from [GNews API](https://gnews.io)
- MongoDB + Mongoose for data storage
- TAP testing integrated

---

##  Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Auth**: JWT, bcrypt
- **External API**: GNews API
- **Testing**: TAP + Supertest

---

##  Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/YourUsername/your-repo.git
cd your-repo
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root with:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NEWS_API_KEY=your_gnews_api_key
```

4. Run the server
```bash
npm run start
```

5. Run tests
```bash
npm test
```

---

##  API Endpoints

### Auth
- `POST /users/signup` → Register user
- `POST /users/login` → Login user and get token

### Preferences (Protected with JWT)
- `GET /users/preferences` → Get logged-in user's preferences
- `PUT /users/updatePreferences` → Update preferences

### News (Protected with JWT)
- `GET /news?q=apple` → Get latest news (default query = `apple`)

---

##  Usage with Postman
1. Signup a new user  
2. Login → Copy the `token` from response  
3. For protected routes, add header:  
   ```
   Authorization: Bearer <token>
   ```

---

##  Example Test (TAP)
```js
tap.test('GET /users/preferences', async (t) => {
    const response = await server.get('/users/preferences').set('Authorization', `Bearer ${token}`);
    t.equal(response.status, 200);
    t.hasOwnProp(response.body, 'preferences');
    t.end();
});
```

---

## 📝 License
This project is licensed under the MIT License.
