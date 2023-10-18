import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../../hooks/shared/useCurrentUser";
import { signOut } from "../../services/auth.service";

export default function SignOut() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, signOut: contextSignOut } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/dictioanries");
    }

    const func = async () => {
      try {
        setIsLoading(true);

        await signOut();
        contextSignOut();
        navigate("/dictionaries");
        window.location.reload();
      } catch (error: any) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    func();
  }, []);

  return <div>{isLoading && <p>Signing out...</p>}</div>;
}
