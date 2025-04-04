import { NextResponse } from 'next/server';
import User from './userModel';
import connectDB from '@/lib/mongoose';

// Helper to handle database connection and errors
async function withDB(handler: () => Promise<unknown>) {
  try {
    await connectDB();
    return await handler();
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: (error as Error).message, status: 400 }, { status: 400 });
  }
}

// Helper to format responses
function formatResponse(data: unknown, message: string, status: number) {
  return NextResponse.json({ data, message, status }, { status });
}

// CREATE user
export async function createUser(req: Request) {
  return withDB(async () => {
    const userData = await req.json();
    const newUser = await User.create({ ...userData });
    console.log(newUser, ' => Line No: 26');
    return formatResponse(newUser, 'User created successfully', 201);
  });
}

// GET single user by ID
export async function getUserById(req: Request) {
  return withDB(async () => {
    const id = new URL(req.url).searchParams.get('id');
    if (!id) return formatResponse(null, 'User ID is required', 400);

    const user = await User.findById(id);
    if (!user) return formatResponse(null, 'User not found', 404);

    return formatResponse(user, 'User fetched successfully', 200);
  });
}

// GET all users with pagination
export async function getUsers(req: Request) {
  return withDB(async () => {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    const users = await User.find({}).sort({ updatedAt: -1, createdAt: -1 }).skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();
    console.log('getUsers hit', totalUsers);
    console.log('getUsers hit', users);
    console.log(' return ; ', formatResponse({ users: users || [], total: totalUsers, page, limit }, 'Users fetched successfully', 200));
    return formatResponse({ users: users || [], total: totalUsers, page, limit }, 'Users fetched successfully', 200);
  });
}

// UPDATE single user by ID
export async function updateUser(req: Request) {
  return withDB(async () => {
    const { id, ...updateData } = await req.json();
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updatedUser) return formatResponse(null, 'User not found', 404);
    return formatResponse(updatedUser, 'User updated successfully', 200);
  });
}

// BULK UPDATE users
export async function bulkUpdateUsers(req: Request) {
  return withDB(async () => {
    const updates = await req.json();
    const results = await Promise.allSettled(
      updates.map(({ id, updateData }: { id: string; updateData: Record<string, unknown> }) =>
        User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }),
      ),
    );

    const successfulUpdates = results.filter(r => r.status === 'fulfilled' && r.value).map(r => (r as PromiseFulfilledResult<typeof User>).value);
    const failedUpdates = results.filter(r => r.status === 'rejected' || !r.value).map((_, i) => updates[i].id);

    return formatResponse({ updated: successfulUpdates, failed: failedUpdates }, 'Bulk update completed', 200);
  });
}

// DELETE single user by ID
export async function deleteUser(req: Request) {
  return withDB(async () => {
    const { id } = await req.json();
    const deletedUser = await User.findByIdAndDelete(id);
    console.log('deletedUser', deletedUser);
    if (!deletedUser) return formatResponse(deletedUser, 'User not found', 404);
    return formatResponse(deletedUser, 'User deleted successfully', 200);
  });
}

// BULK DELETE users
export async function bulkDeleteUsers(req: Request) {
  return withDB(async () => {
    const { ids } = await req.json();
    const deletedIds: string[] = [];
    const invalidIds: string[] = [];

    for (const id of ids) {
      try {
        const user = await User.findById(id);
        if (user) {
          const deletedUser = await User.findByIdAndDelete(id);
          if (deletedUser) deletedIds.push(id);
        } else {
          invalidIds.push(id);
        }
      } catch {
        invalidIds.push(id);
      }
    }

    return formatResponse({ deleted: deletedIds.length, deletedIds, invalidIds }, 'Bulk delete operation completed', 200);
  });
}
