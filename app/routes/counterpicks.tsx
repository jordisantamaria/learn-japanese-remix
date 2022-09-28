import {
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Nav from "~/components/Nav";
import { getVocabLists } from "~/models/vocabLists.server";
import { useOptionalUser } from "~/utils";

type LoaderData = {
  vocabLists: Awaited<ReturnType<typeof getVocabLists>>;
};

export const loader = async () => {
  return json<LoaderData>({
    vocabLists: await getVocabLists(),
  });
};

export default function Index() {
  const user = useOptionalUser();
  const { vocabLists } = useLoaderData() as LoaderData;
  return (
    <Container>
      <Nav />
      <List>
        {vocabLists.map((list) => (
          <ListItemButton>
            <ListItemText primary={list.name} />
          </ListItemButton>
        ))}
      </List>
    </Container>
  );
}

