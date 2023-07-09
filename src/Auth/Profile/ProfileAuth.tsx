import { Auth } from "aws-amplify";

export type SignUpParameters = {
  username: string;
  password: string;
  email: string;
  phoneNumber?: string;
};

export async function signUp({ username, password, email }: SignUpParameters) {
  console.log(username, password, email);
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email, 
      },
      autoSignIn: {
        enabled: true,
      },
    });
    console.log(user);
  } catch (error) {
    console.log("error signing up:", error);
  }
}
