import UserForm from "../components/user/UserForm";

const AddNewUser = () => {
  return <UserForm />;
};

export default AddNewUser;

export async function action({ request }) {
  const formData = await request.formData();
  const { email, username, id_card_number, password } =
    Object.fromEntries(formData);

  try {
    const response = await fetch("http://localhost:3000/api/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        id_card_number,
        password,
      }),
    });

    if (!response.ok) throw new Error("Failed to add client");

    const responseData = await response.json();

    console.log(responseData);
  } catch (err) {
    return Response.json(err);
  }

  return null;
}
