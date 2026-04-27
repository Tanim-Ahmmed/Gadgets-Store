"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";

import {
  auth,
  getFirebaseConfigError,
  googleProvider,
  isFirebaseConfigured,
} from "@/lib/firebase";

type RegisterInput = {
  email: string;
  password: string;
  name?: string;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isGoogleAvailable: boolean;
  isConfigured: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function requireAuth() {
  if (!auth) {
    throw new Error(getFirebaseConfigError());
  }

  return auth;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(Boolean(auth));

  useEffect(() => {
    if (!auth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isConfigured: isFirebaseConfigured,
      isGoogleAvailable: Boolean(googleProvider),
      async login(email, password) {
        const firebaseAuth = requireAuth();
        await signInWithEmailAndPassword(firebaseAuth, email, password);
      },
      async register({ email, password, name }) {
        const firebaseAuth = requireAuth();
        const credentials = await createUserWithEmailAndPassword(
          firebaseAuth,
          email,
          password,
        );

        if (name) {
          await updateProfile(credentials.user, {
            displayName: name,
          });
          setUser(credentials.user);
        }
      },
      async loginWithGoogle() {
        const firebaseAuth = requireAuth();

        if (!googleProvider) {
          throw new Error("Google login is not available.");
        }

        await signInWithPopup(firebaseAuth, googleProvider);
      },
      async logout() {
        const firebaseAuth = requireAuth();
        await signOut(firebaseAuth);
      },
    }),
    [loading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
