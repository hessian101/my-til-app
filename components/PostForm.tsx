'use client' // フォームはユーザーが操作するのでクライアントコンポーネント

import { addLog } from '@/app/actions';
import { useRef } from 'react';

export default function PostForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      action={async (formData) => {
        await addLog(formData);
        formRef.current?.reset(); // 送信したらフォームを空にする
      }}
      ref={formRef}
      className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-100"
    >
      <h3 className="text-lg font-bold mb-4 text-gray-700">新しい学びを記録する</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
          <input
            name="title"
            type="text"
            required
            placeholder="例: Server Actionsを学んだ"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
          <textarea
            name="content"
            required
            rows={3}
            placeholder="詳細をここに書く..."
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">タグ (カンマ区切り)</label>
          <input
            name="tags"
            type="text"
            placeholder="Next.js, Supabase, 備忘録"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors font-semibold"
        >
          投稿する
        </button>
      </div>
    </form>
  );
}