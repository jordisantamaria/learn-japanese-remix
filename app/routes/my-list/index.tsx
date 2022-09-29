import {
  Box,
  Button,
  Container,
  css,
  List,
  ListItemText,
} from "@mui/material";
import { ActionFunction, json } from "@remix-run/node";
import { Link, useLoaderData, useSubmit } from "@remix-run/react";
import Nav from "~/components/Nav";
import { deleteVocabList, getVocabLists } from "~/models/vocabLists.server";
import { requireUser } from "~/session.server";
import invariant from "tiny-invariant";

type LoaderData = {
  vocabLists: Awaited<ReturnType<typeof getVocabLists>>;
};

export const loader = async ({ request }: any) => {
  // redirect to login screen if not logged
  await requireUser(request);
  return json<LoaderData>({
    vocabLists: await getVocabLists(),
  });
};

export const action: ActionFunction = async ({ params, request }) => {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  invariant(id, "id is required");

  return await deleteVocabList(id);
};

export default function Index() {
  const { vocabLists } = useLoaderData<typeof loader>();
  const submit = useSubmit();


  const handleDelete = (listId: string) => {
    const formData = new FormData();
    formData.append('id', listId);
    submit(formData, {method: "delete"})
  };

  return (
    <Container>
      <Nav />
      <List
        css={css`
          display: flex;
          flex-direction: column;
          gap: 8px;
        `}
      >
        {vocabLists.map((list) => (
          <>
            <Box
              sx={{
                background: "red",
                justifyContent: "space-between",
                display: "flex",
                padding: "8px",
                alignItems: "center",
                color: "white",
              }}
            >
              <Link
                prefetch="intent"
                key={list.id}
                to={`/my-list/${list.id}/study`}
                css={css`
                  width: 100%;
                `}
              >
                <ListItemText primary={list.name} />
              </Link>
              <div
                css={css`
                  display: flex;
                  gap: 8px;
                `}
              >
                <Link to={`/my-list/${list.id}/edit`}>
                  <Button variant="contained">Edit</Button>
                </Link>
                  <Button variant="contained" onClick={() => handleDelete(list.id)}>
                    Delete
                  </Button>
              </div>
            </Box>
          </>
        ))}
      </List>
      <div
        css={css`
          display: flex;
          justify-content: center;
          margin-top: 20px;
        `}
      >
        <Link to="/my-list/new">
          <Button variant="contained">Create List</Button>
        </Link>
      </div>
    </Container>
  );
}

