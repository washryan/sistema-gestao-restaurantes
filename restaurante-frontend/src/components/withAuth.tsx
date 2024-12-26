import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const AuthenticatedComponent = (props: P & React.ComponentProps<typeof WrappedComponent>) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  // Adiciona um displayName para facilitar debugging no React DevTools
  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return AuthenticatedComponent;
}
