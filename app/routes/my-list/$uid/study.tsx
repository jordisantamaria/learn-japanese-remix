import {
  Container,
  css,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Nav from "~/components/Nav";
import { getVocabList } from "~/models/vocabLists.server";


export const loader = async ({ params }: any) => {
  const vocabList = await getVocabList(params.uid);
  invariant(vocabList, `Vocablist is not found for uid = ${params.uid}`);
  if (!vocabList) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({
    vocabList,
  });
};

export default function MyList() {
  const { vocabList } = useLoaderData<typeof loader>();
  return (
    <Container>
      <Nav />
      <div>{vocabList.name}</div>
      <List
        css={css`
          display: flex;
          flex-direction: column;
          gap: 8px;
        `}
      >
        {vocabList.vocabItems.map((item) => (
          <ListItemButton key={item.id} sx={{ background: "yellow" }}>
              <ListItemText primary={item.word} />
          </ListItemButton>
        ))}
      </List>
    </Container>
  );
}

