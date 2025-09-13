import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../integrations/supabase/client.ts';

export default function Auth() {
  return (
    <div className="min-h-screen bg-kakao-light py-10">
      <div className="max-w-sm mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-kakao-dark mb-6 text-center">소비노트</h1>
        <SupabaseAuth 
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            style: {
              button: { 
                flex: 1,
                height: '40px',
                backgroundColor: '#4285f4',
                color: 'white',
              }
            }
          }}
          providers={['google']}
          onlyThirdPartyProviders
          redirectTo={window.location.origin}
        />
      </div>
    </div>
  );
}