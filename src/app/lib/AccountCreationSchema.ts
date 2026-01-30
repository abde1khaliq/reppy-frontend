import z from "zod";

const account_creation_schema = z
  .object({
    first_name: z
      .string()
      .min(2, "Your First name is too short.")
      .max(30, "Your First name is too long."),
    last_name: z
      .string()
      .min(2, "Your Last name is too short.")
      .max(30, "Your Last name is too long."),
    email: z.string().email("You entered an invalid email address."),
    username: z
      .string()
      .min(3, "Your Username is too short.")
      .max(30, "Your Username is too long."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(50, "Password must be at most 50 characters.")

      .refine((val) => !/^\d+$/.test(val), {
        message: "Password cannot be entirely numeric.",
      }),
  })
  .refine(
    (data) => {
      const pw = data.password.toLowerCase();
      return (
        !pw.includes(data.username.toLowerCase()) &&
        !pw.includes(data.first_name.toLowerCase()) &&
        !pw.includes(data.last_name.toLowerCase()) &&
        !pw.includes(data.email.toLowerCase().split("@")[0])
      );
    },
    {
      message: "Password is too similar to your personal information.",
      path: ["password"],
    },
  );


export default account_creation_schema