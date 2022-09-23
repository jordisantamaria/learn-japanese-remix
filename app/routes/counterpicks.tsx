import { Container, Grid } from "@mui/material";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Nav from "~/components/Nav";
import { getChampSelect } from "~/models/champSelect.server";
import { useOptionalUser } from "~/utils";


type LoaderData = {
  champSelect: Awaited<ReturnType<typeof getChampSelect>>;
};

export const loader = async () => {
  return json<LoaderData>({
    champSelect: await getChampSelect(),
  });
};


export default function Counterpicks() {
  const user = useOptionalUser();
  const { champSelect } = useLoaderData() as LoaderData;
  return (
    <Container>
      <Nav />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {champSelect.myTeam.map((champ) => (
            <div>{champ.name}</div>
          ))}
        </Grid>
        <Grid item xs={6}>
          {champSelect.enemyTeam.map((champ) => (
            <div>{champ.name}</div>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}


