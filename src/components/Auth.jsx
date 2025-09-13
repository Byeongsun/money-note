import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../integrations/supabase/client.ts';

const customTheme = {
  default: {
    colors: {
      brand: '#4285f4',
      brandAccent: '#3367d6',
      brandButtonText: 'white',
    },
    fontSizes: {
      baseButtonSize: '14px',
      baseInputSize: '14px',
      baseLabelSize: '14px',
    },
  },
  dark: {
    colors: {
      brand: '#4285f4',
      brandAccent: '#3367d6',
      brandButtonText: 'white',
    },
  },
};

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
              input: { display: 'none' },
              message: { display: 'none' },
              divider: { display: 'none' },
            },
            className: {
              container: 'auth-container',
              button: 'auth-button',
            },
            variables: customTheme
          }}
          providers={['google']}
          view="sign_in"
          showLinks={false}
          onlyThirdPartyProviders={true}
          redirectTo={window.location.origin}
        />
      </div>
    </div>
  );
}