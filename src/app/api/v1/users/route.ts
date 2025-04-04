import { NextResponse } from 'next/server';
import { get_1_template_, createUser, updateUser, deleteUser, getUserById, bulkUpdate_1_template_, bulkDelete_1_template_ } from './userController';

export interface IResponse {
  data: unknown;
  message: string;
  status: number;
}
const formatResponse = (data: unknown, message: string, status: number) => NextResponse.json({ data, message, status }, { status });
// GET all _1_template_
export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get('id');
  const result: IResponse = id ? await getUserById(req) : await get_1_template_(req);
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
  const result = isBulk ? await bulkUpdate_1_template_(req) : await updateUser(req);

  return formatResponse(result.data, result.message, result.status);
}

// DELETE user
export async function DELETE(req: Request) {
  const isBulk = new URL(req.url).searchParams.get('bulk') === 'true';
  const result = isBulk ? await bulkDelete_1_template_(req) : await deleteUser(req);

  return formatResponse(result.data, result.message, result.status);
}
