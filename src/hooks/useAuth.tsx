
import { AuthContext } from '@/context/auth-context';
import { useContext } from 'react';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error(
      'useAuth doit être utilisé à l’intérieur de AuthProvider.'
    );
  }

  return context;
};

export default useAuth;
