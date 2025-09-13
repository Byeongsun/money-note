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
          view="sign_in"
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#4285f4',
                  brandAccent: '#3367d6',
                }
              }
            },
            style: {
              anchor: { display: 'none' },
              divider: { display: 'none' },
              message: { display: 'none' },
              input: { display: 'none' },
              label: { display: 'none' },
              button: {
                flex: '1',
                backgroundColor: '#4285f4',
                color: 'white',
              }
            },
          }}
          providers={['google']}
          providerScopes={{
            google: 'email profile',
          }}
          redirectTo={`${window.location.origin}/auth/callback`}
          onlyThirdPartyProviders
          theme="dark"
        />
      </div>
    </div>
  );
}