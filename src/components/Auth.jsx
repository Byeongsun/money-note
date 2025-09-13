import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../integrations/supabase/client.ts';

export default function Auth() {
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) {
        console.error('Error with Google login:', error.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-kakao-light py-10">
      <div className="max-w-sm mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-kakao-dark mb-6 text-center">소비노트</h1>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.447,1.722-1.502,3.178-2.945,4.034C13.5,19.072,11.767,19.6,10,19.6c-2.089,0-3.927-0.825-5.292-2.149c-1.364-1.324-2.149-3.162-2.149-5.251s0.785-3.927,2.149-5.292C6.073,5.545,7.911,4.8,10,4.8c1.767,0,3.5,0.528,5.045,1.506c1.443,0.856,2.498,2.312,2.945,4.034h-3.536C13.4,10.34,12.545,11.096,12.545,12.151z M23.5,12.151L23.5,12.151c0-0.821-0.675-1.496-1.496-1.496h-7.459c-0.821,0-1.496,0.675-1.496,1.496s0.675,1.496,1.496,1.496h7.459C22.825,13.647,23.5,12.972,23.5,12.151z"
            />
          </svg>
          Google로 로그인
        </button>
      </div>
    </div>
  );
}