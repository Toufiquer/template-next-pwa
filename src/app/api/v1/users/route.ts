import { NextResponse } from 'next/server';
import { getUsers, createUser, updateUser, deleteUser, getUserById, bulkUpdateUsers, bulkDeleteUsers } from './userController';

export interface IResponse {
  data: unknown;
  message: string;
  status: number;
}
function formatResponse(data: unknown, message: string, status: number) {
  return NextResponse.json({ data, message, status }, { status });
}
// GET all users
export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get('id');
  const result: IResponse = id ? await getUserById(req) : await getUsers(req);
  return formatResponse(result.data, result.message, result.status);
}

// CREATE user
export async function POST(req: Request) {
  const result = await createUser(req);

  return formatResponse(result.data, result.message, result.status);
}

// UPDATE user
export async function PUT(req: Request) {
  const isBulk = new URL(req.url).searchParams.get('bulk') === 'true';
  const result = isBulk ? await bulkUpdateUsers(req) : await updateUser(req);

  return formatResponse(result.data, result.message, result.status);
}

// DELETE user
export async function DELETE(req: Request) {
  const isBulk = new URL(req.url).searchParams.get('bulk') === 'true';
  const result = isBulk ? await bulkDeleteUsers(req) : await deleteUser(req);

  return formatResponse(result.data, result.message, result.status);
}
