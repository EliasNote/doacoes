import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

type UserMetadata = Record<string, string | undefined>;

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error(
        'Supabase URL ou ANON KEY não configurados nas variáveis de ambiente.',
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.supabase = createClient(url, key);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  async signUp(email: string, password: string, userMetadata?: UserMetadata) {
    const sanitizedEmail = email.trim().toLowerCase();
    return this.supabase.auth.signUp({
      email: sanitizedEmail,
      password,
      options: userMetadata ? { data: userMetadata } : undefined,
    });
  }

  async signIn(email: string, password: string) {
    const sanitizedEmail = email.trim().toLowerCase();
    return this.supabase.auth.signInWithPassword({
      email: sanitizedEmail,
      password,
    });
  }

  async getUser(accessToken: string) {
    return this.supabase.auth.getUser(accessToken);
  }

  async signInWithGoogle() {
    const redirectUrl = `${process.env.APP_URL!}/auth/callback`;

    return this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
      },
    });
  }

  async signInWithIdToken(token: string, nonce?: string) {
    return this.supabase.auth.signInWithIdToken({
      provider: 'google',
      token,
      nonce,
    });
  }
}
