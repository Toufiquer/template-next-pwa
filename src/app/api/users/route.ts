import { NextResponse } from 'next/server';
import User from './userModel';
import { connectDB } from '@/lib/mongoose';

async function withDB<T>(handler: () => Promise<T>) {
  try {
    await connectDB();
    return await handler();
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ message: (error as Error).message }, { status: 400 });
  }
}

// GET all users
export async function GET() {
  return withDB(async () => {
    const users = await User.find({});
    return NextResponse.json({ data: users, message: 'Users fetched successfully' });
  });
}

// CREATE user
export async function POST(req: Request) {
  return withDB(async () => {
    const userData = await req.json();
    const newUser = await User.create({ ...userData });
    return NextResponse.json({ data: newUser, message: 'User created successfully' }, { status: 201 });
  });
}

// UPDATE user
export async function PUT(req: Request) {
  return withDB(async () => {
    const { id, ...updateData } = await req.json();
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ data: updatedUser, message: 'User updated successfully' });
  });
}

// DELETE user
export async function DELETE(req: Request) {
  return withDB(async () => {
    const { id } = await req.json();
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User deleted successfully' });
  });
}
