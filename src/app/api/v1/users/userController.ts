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

// BULK UPDATE users
export async function bulkUpdateUsers(req: Request) {
  try {
    await connectDB();
    const updates = await req.json(); // Expecting an array of { id, updateData }
    const updatePromises = updates.map(
      ({ id, updateData }: { id: string; updateData: Record<string, unknown> }) =>
        User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }),
    );

    const updatedUsers = await Promise.all(updatePromises);
    return NextResponse.json({ data: updatedUsers, message: 'Users updated successfully' });
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
    const deleteResult = await User.deleteMany({ _id: { $in: ids } });

    return NextResponse.json({
      data: deleteResult,
      message: `${deleteResult.deletedCount} users deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: (error as Error).message }, { status: 400 });
  }
}
