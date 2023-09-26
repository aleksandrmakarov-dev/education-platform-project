import UserAvatar from "./UserAvatar";

const UserSignInSignUp = () => {
  const isSignedIn = true;

  if (isSignedIn) {
    return (
      <UserAvatar
        name="Alex"
        image="https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg"
        fallback="A"
      />
    );
  }

  return <div>Not signedIn</div>;
};

export default UserSignInSignUp;
