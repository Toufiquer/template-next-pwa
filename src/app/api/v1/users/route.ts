import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  bulkUpdateUsers,
  bulkDeleteUsers,
} from './userController';

// GET all users
export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (id) {
    return getUserById(req);
  }
  return getUsers(req);
}

// CREATE user
export async function POST(req: Request) {
  return createUser(req);
}

// UPDATE user
export async function PUT(req: Request) {
  const url = new URL(req.url);
  const isBulkDelete = url.searchParams.get('bulk') === 'true';
  if (isBulkDelete) {
    return bulkUpdateUsers(req);
  }
  return updateUser(req);
}

// DELETE user
export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const isBulkDelete = url.searchParams.get('bulk') === 'true';

  if (isBulkDelete) {
    return bulkDeleteUsers(req);
  }
  return deleteUser(req); // Single delete fallback
}
