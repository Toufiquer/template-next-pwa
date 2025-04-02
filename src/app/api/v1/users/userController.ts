import { NextResponse } from 'next/server';
import User from './userModel';
import { connectDB } from '@/lib/mongoose';

// GET all users with pagination
export async function getUsers(req: Request) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    const users = await User.find({}).skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();

    return NextResponse.json({
      data: users,
      total: totalUsers,
      page,
      limit,
      message: 'Users fetched successfully',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
  }
}

// CREATE user
export async function createUser(req: Request) {
  try {
    await connectDB();
    const userData = await req.json();
    const newUser = await User.create({ ...userData });
    return NextResponse.json(
      { data: newUser, message: 'User created successfully' },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: (error as Error).message }, { status: 400 });
  }
}

// UPDATE user
export async function updateUser(req: Request) {
  try {
    await connectDB();
    const { id, ...updateData } = await req.json();

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ data: updatedUser, message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: (error as Error).message }, { status: 400 });
  }
}
// BULK UPDATE users
export async function bulkUpdateUsers(req: Request) {
  try {
    await connectDB();
    const updates = await req.json(); // Expecting an array of { id, updateData }
    const results = await Promise.allSettled(
      updates.map(({ id, updateData }: { id: string; updateData: Record<string, unknown> }) =>
        User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }),
      ),
    );

    const successfulUpdates = results
      .filter(result => result.status === 'fulfilled' && result.value)
      .map(result => (result as PromiseFulfilledResult<typeof User>).value);

    const failedUpdates = results
      .filter(result => result.status === 'rejected' || !result.value)
      .map((_, index) => updates[index].id);

    return NextResponse.json({
      updated: successfulUpdates,
      failed: failedUpdates,
      message: 'Bulk update completed',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: (error as Error).message }, { status: 400 });
  }
}

// DELETE user
export async function deleteUser(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: (error as Error).message }, { status: 400 });
  }
}

// BULK DELETE users
export async function bulkDeleteUsers(req: Request) {
  try {
    await connectDB();
    const { ids } = await req.json(); // Expecting an array of user IDs
    // Validate and filter valid IDs
    const deletedIds: string[] = [];
    const invalidIds: string[] = [];
    for (const id of ids) {
      try {
        const isFindUser = await User.findById(id);
        if (isFindUser) {
          const deletedUser = await User.findByIdAndDelete(id);
          deletedUser && deletedIds.push(id);
        } else {
          invalidIds.push(id);
        }
      } catch (error) {
        invalidIds.push(id);
      }
    }

    return NextResponse.json({
      deleted: deletedIds.length,
      deletedIds,
      invalidIds,
      message: 'Bulk delete operation completed',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: (error as Error).message }, { status: 400 });
  }
}

// GET single user by ID
export async function getUserById(req: Request) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ data: user, message: 'User fetched successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
