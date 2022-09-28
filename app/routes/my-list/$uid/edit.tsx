import { Button, Container, TextField } from "@mui/material";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import invariant from "tiny-invariant";

import Nav from "~/components/Nav";
import { getVocabList } from "~/models/vocabList.server";
import { createVocabList, updateVocabList } from "~/models/vocabLists.server";

type LoaderData = {
  vocabList: Awaited<ReturnType<typeof getVocabList>>;
};

export const loader = async ({params}: any) => {
  const vocabList = await getVocabList(params.uid)
  invariant(vocabList, `Vocablist is not found for uid = ${params.uid}` )
  return json<LoaderData>({
    vocabList,
  });
};

type ActionData =
  | {
      name: string | null;
    }
  | undefined;

export const action: ActionFunction = async ({ request, params }) => {
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
  invariant(params.uid, "Uid is required");

  await updateVocabList(params.uid, { name });

  return redirect("my-list");
};

export default function New() {
  const { vocabList } = useLoaderData() as LoaderData;
  const errors = useActionData() as ActionData;

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  return (
    <Container>
      <Nav />
      <Form method="post">
        <TextField
          defaultValue={vocabList.name}
          error={errors?.name != null}
          helperText={errors?.name}
          name={"name"}
          placeholder={"List name"}
        />
        <Button disabled={isCreating} type="submit" variant={"contained"}>
          {isCreating ? "Updating..." : "Update"}
        </Button>
      </Form>
    </Container>
  );
}


