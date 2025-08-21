"use server"
import React from 'react';
import { getUserData } from '@/lib/getUserData';
import { redirect } from 'next/navigation';
import ProfilePage from '@/components/profile/ProfilePage';

export default async function Profile() {
    const user = await getUserData();
    if (!user) {
        redirect("/signin");
    }

    return (
      <ProfilePage user={user} />
    );
}