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
import { getVocabList } from "~/models/vocabList.server";
import { useOptionalUser } from "~/utils";

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

export default function MyList() {
  const { vocabList } = useLoaderData() as LoaderData;
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
            <Link to='/myList'>
            <ListItemText primary={item.word} />
            </Link>
          </ListItemButton>
        ))}
      </List>
    </Container>
  );
}


