import { supabase } from '@/lib/supabaseClient';
import PostForm from '@/components/PostForm';

// この関数が「非同期（async）」になっているのがポイント！
// サーバー側でデータを取ってくるので、ブラウザが重くなりません。
export default async function Home() {
  // 1. Supabaseからデータを取ってくる
  // select('*') は「全部のカラムちょうだい」という意味
  const { data: posts, error } = await supabase
    .from('learn_logs')
    .select('*')
    .order('created_at', { ascending: false }); // 新しい順に並べる

  // エラーがあったらコンソールに出す（開発用）
  if (error) {
    console.error('Error fetching data:', error);
  }

  // データがない場合は空配列にする
  const logs = posts || [];

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        栗屋大夢の学習ログ (TIL)
      </h1>

      <div className="max-w-2xl mx-auto space-y-4">
        <PostForm />
        {logs.map((log) => (
          <div key={log.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-800">{log.title}</h2>
              <span className="text-sm text-gray-500">
                {new Date(log.created_at).toLocaleDateString()}
              </span>
            </div>

            <p className="text-gray-600 mb-4">{log.content}</p>

            <div className="flex gap-2">
              {/* タグを表示 */}
              {log.tags?.map((tag: string) => (
                <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* データが一件もない時 */}
        {logs.length === 0 && (
          <p className="text-center text-gray-500">まだログがありません。</p>
        )}
      </div>
    </main>
  );
}