import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCurrentUser from "../../hooks/shared/useCurrentUser";
import { signOut } from "../../services/auth.service";

export default function SignOut() {
  const { signOut: contextSignOut } = useCurrentUser();
  const location = useLocation();

  useEffect(() => {
    const func = async () => {
      try {
        await signOut();
        contextSignOut();
      } catch (error: any) {
        console.log(error);
      } finally {
        window.location.href = location.state?.from?.pathname || "/";
      }
    };

    func();
  }, []);

  return (
    <div>
      <p>Signing out...</p>
    </div>
  );
}
