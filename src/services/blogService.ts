
import { supabase } from "@/integrations/supabase/client";

export interface Blog {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string;
  image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const getBlogs = async (includeUnpublished = false): Promise<Blog[]> => {
  let query = (supabase as any)
    .from('blogs')
    .select('*, profiles(username)');

  if (!includeUnpublished) {
    query = query.eq('published', true);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getBlog = async (id: string): Promise<Blog> => {
  const { data, error } = await (supabase as any)
    .from('blogs')
    .select('*, profiles(username)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const createBlog = async (blog: Omit<Blog, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Blog> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await (supabase as any)
    .from('blogs')
    .insert([{ ...blog, user_id: user.id }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateBlog = async (id: string, blog: Partial<Blog>): Promise<Blog> => {
  const { data, error } = await (supabase as any)
    .from('blogs')
    .update(blog)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteBlog = async (id: string): Promise<void> => {
  const { error } = await (supabase as any)
    .from('blogs')
    .delete()
    .eq('id', id);

  if (error) throw error;
};
