
import { supabase } from "@/integrations/supabase/client";

export interface Comment {
  id: string;
  user_id: string;
  blog_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const getComments = async (blogId: string): Promise<Comment[]> => {
  const { data, error } = await (supabase as any)
    .from('comments')
    .select('*, profiles(username)')
    .eq('blog_id', blogId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
};

export const createComment = async (blogId: string, content: string): Promise<Comment> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await (supabase as any)
    .from('comments')
    .insert([{
      blog_id: blogId,
      user_id: user.id,
      content
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateComment = async (id: string, content: string): Promise<Comment> => {
  const { data, error } = await (supabase as any)
    .from('comments')
    .update({ content })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteComment = async (id: string): Promise<void> => {
  const { error } = await (supabase as any)
    .from('comments')
    .delete()
    .eq('id', id);

  if (error) throw error;
};
