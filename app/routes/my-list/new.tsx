import { Button, Container, TextField } from "@mui/material";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import invariant from "tiny-invariant";

import Nav from "~/components/Nav";
import { createVocabList } from "~/models/vocabLists.server";

export const loader = async ({request}: any) => {
  // redirect to login screen if not logged
  // await requireUser(request)
  return json({})
};

type ActionData =
  | {
      name: string | null;
    }
  | undefined;

export const action: ActionFunction = async ({ request }) => {
  // await requireUser(request)
  const formData = await request.formData();
  const name = formData.get("name");

  const errors = {
    name: name ? null : "Name is required",
  };
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json<ActionData>(errors);
  }

  invariant(typeof name === "string", "Name is required");

  await createVocabList({ name });

  return redirect("my-list");
};

export default function New() {
  const errors = useActionData() as ActionData;

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  return (
    <Container>
      <Nav />
      <Form method="post">
        <TextField
          error={errors?.name != null}
          helperText={errors?.name}
          name={"name"}
          placeholder={"List name"}
        />
        <Button disabled={isCreating} type="submit" variant={"contained"}>
          {isCreating ? "Creating..." : "Create"}
        </Button>
      </Form>
    </Container>
  );
}

