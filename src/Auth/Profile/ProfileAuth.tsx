import { Auth } from "aws-amplify";

export type SignUpParameters = {
  username: string;
  password: string;
  email: string;
  phoneNumber?: string;
};

export async function signUp({ username, password, email }: SignUpParameters) {
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
  } catch (error) {
    console.log("error signing up:", error);
  }
}
