import { getUsers, createUser, updateUser, deleteUser, getUserById, bulkUpdateUsers, bulkDeleteUsers } from './userController';

// GET all users
export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get('id');
  const result = id ? await getUserById(req) : await getUsers(req);
  return result;
}

// CREATE user
export async function POST(req: Request) {
  const result = await createUser(req);
  return result;
}

// UPDATE user
export async function PUT(req: Request) {
  const isBulk = new URL(req.url).searchParams.get('bulk') === 'true';
  const result = isBulk ? await bulkUpdateUsers(req) : await updateUser(req);
  return result;
}

// DELETE user
export async function DELETE(req: Request) {
  const isBulk = new URL(req.url).searchParams.get('bulk') === 'true';
  const result = isBulk ? await bulkDeleteUsers(req) : await deleteUser(req);
  return result;
}
