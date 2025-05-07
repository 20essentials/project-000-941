import type { APIRoute } from 'astro';
import { addUserVotes, cleanUser } from '@/db/client';

export const POST: APIRoute = async ({ request, locals }) => {
  const currentUser = await locals?.currentUser();

  if (!currentUser) {
    return new Response('Unathorized', { status: 401 });
  }

  const data = await request.json();
  const { firstName, lastName } = currentUser;
  const username = `${firstName} ${lastName}`;

  try {
    await cleanUser(username);
    await addUserVotes(username, JSON.parse(data));
  } catch (error) {
    return new Response('Bad Request', { status: 500 });
  }

  return new Response('ok', { status: 200 });
};
