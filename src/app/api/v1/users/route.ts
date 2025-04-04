import { getUsers, createUser, updateUser, deleteUser, getUserById, bulkUpdateUsers, bulkDeleteUsers } from './userController';

// GET all users
export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get('id');
  return id ? getUserById(req) : getUsers(req);
}

// CREATE user
export async function POST(req: Request) {
  return createUser(req);
}

// UPDATE user
export async function PUT(req: Request) {
  return new URL(req.url).searchParams.get('bulk') === 'true' ? bulkUpdateUsers(req) : updateUser(req);
}

// DELETE user
export async function DELETE(req: Request) {
  return new URL(req.url).searchParams.get('bulk') === 'true' ? bulkDeleteUsers(req) : deleteUser(req);
}
