# Shako
Certainly! Here's a sample README.md file with database schemas and entities using primary and foreign keys wisely:

---

# Social Media App Database Design

## Tables

### Users Table

| Field       | Type         | Key          |
|-------------|--------------|--------------|
| user_id     | INT          | Primary Key  |
| username    | VARCHAR(50)  | Unique       |
| email       | VARCHAR(100) | Unique       |
| password    | VARCHAR(255) |              |
| created_at  | TIMESTAMP    |              |
| updated_at  | TIMESTAMP    |              |

### Posts Table

| Field       | Type         | Key          |
|-------------|--------------|--------------|
| post_id     | INT          | Primary Key  |
| user_id     | INT          | Foreign Key  |
| content     | TEXT         |              |
| created_at  | TIMESTAMP    |              |
| updated_at  | TIMESTAMP    |              |

### Comments Table

| Field       | Type         | Key          |
|-------------|--------------|--------------|
| comment_id  | INT          | Primary Key  |
| user_id     | INT          | Foreign Key  |
| post_id     | INT          | Foreign Key  |
| content     | TEXT         |              |
| created_at  | TIMESTAMP    |              |
| updated_at  | TIMESTAMP    |              |

### Likes Table

| Field       | Type         | Key          |
|-------------|--------------|--------------|
| like_id     | INT          | Primary Key  |
| user_id     | INT          | Foreign Key  |
| post_id     | INT          | Foreign Key  |
| created_at  | TIMESTAMP    |              |

### Followers Table

| Field       | Type         | Key          |
|-------------|--------------|--------------|
| follower_id | INT          | Primary Key  |
| user_id     | INT          | Foreign Key  |
| follower_user_id | INT     | Foreign Key  |
| created_at  | TIMESTAMP    |              |

## Relationships

- Each user can have multiple posts, comments, likes, and followers.
- Each post can have multiple comments and likes.
- Each comment belongs to one user and one post.
- Each like belongs to one user and one post.
- Each follower relationship involves two users.

---

