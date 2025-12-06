'use server' // ← これが魔法の呪文（サーバー側で動く関数だよ、という宣言）

import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addLog(formData: FormData) {
  // 1. フォームから値を取り出す
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const tagsString = formData.get('tags') as string;

  // タグは "React, Next.js" みたいに来るので、配列に変換する
  // カンマで区切って、余計な空白を消す処理
  const tags = tagsString.split(',').map((tag) => tag.trim()).filter((tag) => tag !== '');

  // 2. Supabaseに保存！
  const { error } = await supabase
    .from('learn_logs')
    .insert({ title, content, tags });

  if (error) {
    console.error('Error adding log:', error);
    return;
  }

  // 3. 画面を更新する（これ重要！）
  // 「データが変わったから、トップページを再生成してね」とNext.jsに伝える
  revalidatePath('/');

  // 完了したらトップページに戻る（リロード効果）
  redirect('/');
}