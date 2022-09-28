import {
  Button,
  Container,
  css,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Nav from "~/components/Nav";
import { getVocabLists } from "~/models/vocabLists.server";
import { requireUser } from "~/session.server";

type LoaderData = {
  vocabLists: Awaited<ReturnType<typeof getVocabLists>>;
};

export const loader = async ({ request }: any) => {
  // redirect to login screen if not logged
  // await requireUser(request)
  return json<LoaderData>({
    vocabLists: await getVocabLists(),
  });
};

export default function Index() {
  const { vocabLists } = useLoaderData() as LoaderData;

  const handleDelete = () => {

  }

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
            <Link
              prefetch="intent"
              key={list.id}
              to={`/my-list/${list.id}/study`}
            >
              <ListItemButton sx={{ background: "red" }}>
                <ListItemText primary={list.name} />
              </ListItemButton>
            </Link>
            <Link to={`/my-list/${list.id}/edit`}>
              <Button variant="contained">Edit</Button>
            </Link>
              <Button variant="contained" onClick={handleDelete}>Delete</Button>
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

