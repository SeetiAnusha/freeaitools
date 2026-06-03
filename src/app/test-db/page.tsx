import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function TestDBPage() {
  const results = {
    connection: false,
    tablesExist: false,
    blogCount: 0,
    promptsCount: 0,
    errors: [] as string[],
  };

  try {
    // Test 1: Connection
    const { data: connTest, error: connError } = await supabase.from('categories').select('count', { count: 'exact', head: true });
    if (connError) {
      results.errors.push(`Connection error: ${connError.message}`);
    } else {
      results.connection = true;
    }

    // Test 2: Check if prompts table exists
    const { data: promptsData, error: promptsError } = await supabase
      .from('prompts')
      .select('id', { count: 'exact', head: true });
    
    if (promptsError) {
      results.errors.push(`Prompts table error: ${promptsError.message}`);
      if (promptsError.message.includes('does not exist')) {
        results.errors.push('❌ Prompts table does not exist. Run blog-prompts-schema.sql in Supabase SQL Editor.');
      }
    } else {
      results.tablesExist = true;
    }

    // Test 3: Count blog posts
    const { count: blogCount, error: blogError } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published');
    
    if (blogError) {
      results.errors.push(`Blog posts error: ${blogError.message}`);
    } else {
      results.blogCount = blogCount ?? 0;
    }

    // Test 4: Count prompts
    const { count: promptCount, error: promptCountError } = await supabase
      .from('prompts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published');
    
    if (promptCountError) {
      results.errors.push(`Prompts count error: ${promptCountError.message}`);
    } else {
      results.promptsCount = promptCount ?? 0;
    }

    // Test 5: Fetch one prompt to test
    const { data: samplePrompt, error: sampleError } = await supabase
      .from('prompts')
      .select('slug, title')
      .eq('status', 'published')
      .limit(1)
      .single();
    
    if (sampleError && !sampleError.message.includes('single row')) {
      results.errors.push(`Sample prompt error: ${sampleError.message}`);
    }

  } catch (err: any) {
    results.errors.push(`Unexpected error: ${err.message}`);
  }

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          🔍 Database Connection Test
        </h1>
        
        <div className="space-y-4">
          {/* Connection Status */}
          <div className={`p-6 rounded-xl border ${results.connection ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
            <h2 className="text-xl font-bold mb-2">
              {results.connection ? '✅ Supabase Connection: SUCCESS' : '❌ Supabase Connection: FAILED'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {results.connection 
                ? 'Your app can connect to Supabase successfully.' 
                : 'Cannot connect to Supabase. Check your .env.local file.'}
            </p>
          </div>

          {/* Tables Status */}
          <div className={`p-6 rounded-xl border ${results.tablesExist ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
            <h2 className="text-xl font-bold mb-2">
              {results.tablesExist ? '✅ Tables Exist: YES' : '❌ Tables Exist: NO'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {results.tablesExist 
                ? 'The prompts and blog_posts tables are created in your database.' 
                : 'Tables are missing. You need to run the SQL schema file.'}
            </p>
          </div>

          {/* Data Status */}
          <div className="p-6 rounded-xl border bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-bold mb-3">📊 Data Count</h2>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p className="flex items-center justify-between">
                <span>Blog Posts (published):</span>
                <span className={`font-bold ${results.blogCount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {results.blogCount} {results.blogCount === 6 ? '✅' : results.blogCount === 0 ? '❌' : '⚠️'}
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span>Prompts (published):</span>
                <span className={`font-bold ${results.promptsCount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {results.promptsCount} {results.promptsCount === 15 ? '✅' : results.promptsCount === 0 ? '❌' : '⚠️'}
                </span>
              </p>
            </div>
          </div>

          {/* Errors */}
          {results.errors.length > 0 && (
            <div className="p-6 rounded-xl border bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <h2 className="text-xl font-bold mb-3 text-red-700 dark:text-red-400">❌ Errors Found</h2>
              <ul className="space-y-2">
                {results.errors.map((error, idx) => (
                  <li key={idx} className="text-sm text-red-600 dark:text-red-300 font-mono">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Items */}
          <div className="p-6 rounded-xl border bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-bold mb-3">📝 Action Items</h2>
            <div className="space-y-3 text-sm">
              {!results.connection && (
                <div className="p-3 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-red-600 mb-1">1. Fix Supabase Connection</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Check your <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">.env.local</code> file. Make sure:
                  </p>
                  <ul className="list-disc ml-6 mt-2 text-gray-600 dark:text-gray-300">
                    <li><code>NEXT_PUBLIC_SUPABASE_URL</code> is correct</li>
                    <li><code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> is correct</li>
                  </ul>
                </div>
              )}

              {!results.tablesExist && results.connection && (
                <div className="p-3 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-red-600 mb-1">2. Create Database Tables</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Run this file in Supabase SQL Editor:
                  </p>
                  <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2 text-xs">
                    supabase/blog-prompts-schema.sql
                  </code>
                </div>
              )}

              {results.tablesExist && results.blogCount === 0 && (
                <div className="p-3 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-yellow-600 mb-1">3. Add Blog Posts Data</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Run this file in Supabase SQL Editor:
                  </p>
                  <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2 text-xs">
                    supabase/seed-blog-posts.sql
                  </code>
                  <p className="text-gray-500 text-xs mt-2">Expected: 6 blog posts</p>
                </div>
              )}

              {results.tablesExist && results.promptsCount === 0 && (
                <div className="p-3 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-yellow-600 mb-1">4. Add Prompts Data</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Run this file in Supabase SQL Editor:
                  </p>
                  <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2 text-xs">
                    supabase/seed-premium-prompts.sql
                  </code>
                  <p className="text-gray-500 text-xs mt-2">Expected: 15 prompts</p>
                </div>
              )}

              {results.blogCount === 6 && results.promptsCount === 15 && results.connection && results.tablesExist && (
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded border border-green-200 dark:border-green-700">
                  <p className="font-semibold text-green-700 dark:text-green-400 mb-2">✅ All Checks Passed!</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    Your prompts system is fully set up. You can now:
                  </p>
                  <ul className="list-disc ml-6 space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                    <li>Visit <a href="/prompts" className="text-blue-600 dark:text-blue-400 hover:underline">/prompts</a> to see all prompts</li>
                    <li>Visit <a href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">/blog</a> to see all blog posts</li>
                    <li>Click on any prompt/blog to view details</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Instructions Link */}
          <div className="text-center pt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need detailed setup instructions? Check: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">PROMPTS_SETUP_INSTRUCTIONS.md</code>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
